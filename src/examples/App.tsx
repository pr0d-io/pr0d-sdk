import React from 'react';
import Pr0d, { usePr0d } from '../lib/Pr0d';
import QRCode from 'react-qr-code';

import '@rainbow-me/rainbowkit/styles.css';

// Type definitions
interface Wallet {
  address: string;
  first_verified_at: string;
  last_verified_at: string;
}

// Add CSS animation for spinner
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

// The Dashboard component that's only shown to authenticated users
const Dashboard = () => {
  const { user, logout, getUser } = usePr0d();
  2
  const handleGetUser = async () => {
    try {
      await getUser();
    } catch (error: any) {
      console.log(error);
    }
  };


  return (
    <div style={styles.dashboard}>
      <div style={styles.header}>
        <h2>Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleGetUser}
            style={{
              ...styles.logoutButton,
              backgroundColor: '#4CAF50',
              marginRight: '10px'
            }}
          >
            Refresh User Data
          </button>
          <button onClick={logout} style={styles.logoutButton}>Logout</button>
        </div>
      </div>

      <div style={styles.userInfo}>
        <h3>User Information</h3>
        <p><strong>User ID:</strong> {user?._id}</p>
        <p><strong>Email:</strong> {user?.email?.email || 'Not linked'}</p>
        <p><strong>MFA Enabled:</strong> {user?.mfa ? 'Yes' : 'No'}</p>
      </div>

      {user?.embeddedWallet && <EmbeddedWalletSection />}

      <div style={styles.walletsManagement}>
        <h3>Wallet Management</h3>
        <p style={styles.walletManagementDescription}>
          Connect external wallets (like MetaMask, WalletConnect, etc.) to your account for additional security and convenience.
          These are separate from your embedded wallet above.
        </p>

        <WalletsSection />
        <CustomLinkWalletButton />
      </div>

      <MfaSection />

      <PasskeysSection />

      <div style={styles.providersSection}>
        <h3>Social Accounts</h3>
        <LinkedProvidersDisplay />
        <CustomLinkProvidersButton />
        <div style={styles.individualLinkButtons}>
                  <CustomLinkGoogleButton />
        <CustomLinkDiscordButton />
        <CustomLinkXButton />
        <CustomLinkGithubButton />
        </div>
      </div>

      <div style={styles.linkMethodsSection}>
        <h3>Direct Link Methods</h3>
        <p style={styles.linkMethodsDescription}>
          Test the new direct link methods that skip the selection step.
        </p>
        <div style={styles.directLinkButtons}>
          <CustomLinkMFAButton />
          <CustomLinkPasskeyButton />
        </div>
      </div>

      <SessionsSection />

      {!user?.email?.email && <CustomLinkEmailButton />}
    </div>
  );
};

const LinkedProvidersDisplay = () => {
  const { user, unlinkProvider } = usePr0d();
  const [unlinkingProvider, setUnlinkingProvider] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const providers = [
    { key: 'google', name: 'Google', color: '#4285F4' },
    { key: 'discord', name: 'Discord', color: '#5865F2' },
    { key: 'x', name: 'X (Twitter)', color: '#1DA1F2' },
    { key: 'github', name: 'GitHub', color: '#24292e' }
  ];

  const linkedProviders = providers.filter(provider => user?.[provider.key]);
  const hasLinkedProviders = linkedProviders.length > 0;

      const handleUnlinkProvider = async (providerKey: 'google' | 'discord' | 'x' | 'github') => {
    setUnlinkingProvider(providerKey);
    setError(null);

    try {
      await unlinkProvider(providerKey);
      // Success! The user data will be automatically updated
    } catch (err: any) {
      setError(`Failed to unlink ${providerKey}: ${err.message}`);
    } finally {
      setUnlinkingProvider(null);
    }
  };

  return (
    <div style={styles.providersDisplay}>
      {error && <div style={styles.errorMessage}>{error}</div>}
      {hasLinkedProviders ? (
        <>
          <p style={styles.providersLabel}>Linked accounts:</p>
          <div style={styles.linkedProvidersList}>
            {linkedProviders.map(provider => (
              <div key={provider.key} style={styles.linkedProvider}>
                <div
                  style={{
                    ...styles.providerIndicator,
                    backgroundColor: provider.color
                  }}
                />
                <span style={styles.providerName}>{provider.name}</span>
                <button
                  style={{
                    ...styles.unlinkButton,
                    opacity: unlinkingProvider === provider.key ? 0.7 : 1
                  }}
                                              onClick={() => handleUnlinkProvider(provider.key as 'google' | 'discord' | 'x' | 'github')}
                  disabled={unlinkingProvider === provider.key}
                  title={`Unlink ${provider.name}`}
                >
                  {unlinkingProvider === provider.key ? (
                    <div style={styles.spinner}></div>
                  ) : (
                    '×'
                  )}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p style={styles.noProvidersText}>No social accounts linked</p>
      )}
    </div>
  );
};

const CustomLinkProvidersButton = () => {
  const { triggerProviderLink, user } = usePr0d();

  // Check if there are any providers that could potentially be linked
  // This assumes the app might support these providers - the actual availability
  // will be checked in the provider linking popup based on app config
  const hasUnlinkedProviders = !user?.google || !user?.discord || !user?.x || !user?.github;

  if (!hasUnlinkedProviders) {
    return null; // Don't show button if all common providers are already linked
  }

  return (
    <button onClick={triggerProviderLink} style={styles.customLinkProvidersButton}>
      Link Social Accounts
    </button>
  );
};

const CustomLinkGoogleButton = () => {
  const { linkGoogle, user } = usePr0d();
  const [linking, setLinking] = React.useState(false);

  if (user?.google) {
    return null; // Don't show if already linked
  }

  const handleLinkGoogle = async () => {
    setLinking(true);
    try {
      await linkGoogle();
    } catch (error) {
      console.error('Failed to link Google:', error);
    } finally {
      setLinking(false);
    }
  };

  return (
    <button
      onClick={handleLinkGoogle}
      disabled={linking}
      style={{
        ...styles.customLinkGoogleButton,
        opacity: linking ? 0.7 : 1
      }}
    >
      {linking ? (
        <>
          <div style={styles.spinner}></div>
          <span style={{ marginLeft: 8 }}>Linking...</span>
        </>
      ) : (
        'Link Google'
      )}
    </button>
  );
};

const CustomLinkDiscordButton = () => {
  const { linkDiscord, user } = usePr0d();
  const [linking, setLinking] = React.useState(false);

  if (user?.discord) {
    return null; // Don't show if already linked
  }

  const handleLinkDiscord = async () => {
    setLinking(true);
    try {
      await linkDiscord();
    } catch (error) {
      console.error('Failed to link Discord:', error);
    } finally {
      setLinking(false);
    }
  };

  return (
    <button
      onClick={handleLinkDiscord}
      disabled={linking}
      style={{
        ...styles.customLinkDiscordButton,
        opacity: linking ? 0.7 : 1
      }}
    >
      {linking ? (
        <>
          <div style={styles.spinner}></div>
          <span style={{ marginLeft: 8 }}>Linking...</span>
        </>
      ) : (
        'Link Discord'
      )}
    </button>
  );
};

const CustomLinkXButton = () => {
  const { linkX, user } = usePr0d();
  const [linking, setLinking] = React.useState(false);

  if (user?.x) {
    return null; // Don't show if already linked
  }

  const handleLinkX = async () => {
    setLinking(true);
    try {
      await linkX();
    } catch (error) {
      console.error('Failed to link X:', error);
    } finally {
      setLinking(false);
    }
  };

  return (
    <button
      onClick={handleLinkX}
      disabled={linking}
      style={{
        ...styles.customLinkXButton,
        opacity: linking ? 0.7 : 1
      }}
    >
      {linking ? (
        <>
          <div style={styles.spinner}></div>
          <span style={{ marginLeft: 8 }}>Linking...</span>
        </>
      ) : (
        'Link X (Twitter)'
      )}
    </button>
  );
};

const CustomLinkGithubButton = () => {
  const { linkGithub, user } = usePr0d();
  const [linking, setLinking] = React.useState(false);

  if (user?.github) {
    return null; // Don't show if already linked
  }

  const handleLinkGithub = async () => {
    setLinking(true);
    try {
      await linkGithub();
    } catch (error) {
      console.error('Failed to link GitHub:', error);
    } finally {
      setLinking(false);
    }
  };

  return (
    <button
      onClick={handleLinkGithub}
      disabled={linking}
      style={{
        ...styles.customLinkGithubButton,
        opacity: linking ? 0.7 : 1
      }}
    >
      {linking ? (
        <>
          <div style={styles.spinner}></div>
          <span style={{ marginLeft: 8 }}>Linking...</span>
        </>
      ) : (
        'Link GitHub'
      )}
    </button>
  );
};

const CustomLoginButton = () => {
  const { login } = usePr0d();
  return (
    <button onClick={login} style={styles.customLoginButton}>
      Login or Signup
    </button>
  );
};

const DirectLoginButtons = () => {
  const { loginWithProvider, login, loginWithPasskey } = usePr0d();
  const [loading, setLoading] = React.useState<string | null>(null);
  const [passkeyResult, setPasskeyResult] = React.useState<any>(null);
  const [passkeyError, setPasskeyError] = React.useState<string | null>(null);

  const handleDirectProviderLogin = async (provider: string) => {
    setLoading(provider);
    try {
      await loginWithProvider(provider);
    } catch (error) {
      console.error(`Failed to login with ${provider}:`, error);
    } finally {
      setLoading(null);
    }
  };

  const handleDirectPasskeyLogin = async () => {
    setLoading('passkey');
    setPasskeyResult(null);
    setPasskeyError(null);
    try {
      const result = await loginWithPasskey();
      setPasskeyResult(result);
    } catch (error: any) {
      setPasskeyError(error.message || 'Failed to login with passkey');
      console.error('Failed to login with passkey:', error);
    } finally {
      setLoading(null);
    }
  };

  // For wallet login, we'll use the regular login popup since wallet auth is complex
  const handleDirectWalletLogin = async () => {
    login(); // This will open the popup, but user can immediately click wallet
  };

  return (
    <div style={styles.directLoginContainer}>
      <h3 style={styles.directLoginTitle}>Or login directly with:</h3>
      
      <div style={styles.directLoginButtons}>
        <button
          onClick={() => handleDirectProviderLogin('google')}
          disabled={loading === 'google'}
          style={{
            ...styles.directLoginButton,
            ...styles.googleButton,
            opacity: loading === 'google' ? 0.7 : 1
          }}
        >
          {loading === 'google' ? (
            <>
              <div style={styles.spinner}></div>
              <span style={{ marginLeft: 8 }}>Connecting...</span>
            </>
          ) : (
            'Google'
          )}
        </button>

        <button
          onClick={() => handleDirectProviderLogin('discord')}
          disabled={loading === 'discord'}
          style={{
            ...styles.directLoginButton,
            ...styles.discordButton,
            opacity: loading === 'discord' ? 0.7 : 1
          }}
        >
          {loading === 'discord' ? (
            <>
              <div style={styles.spinner}></div>
              <span style={{ marginLeft: 8 }}>Connecting...</span>
            </>
          ) : (
            'Discord'
          )}
        </button>

        <button
          onClick={() => handleDirectProviderLogin('x')}
          disabled={loading === 'x'}
          style={{
            ...styles.directLoginButton,
            ...styles.xButton,
            opacity: loading === 'x' ? 0.7 : 1
          }}
        >
          {loading === 'x' ? (
            <>
              <div style={styles.spinner}></div>
              <span style={{ marginLeft: 8 }}>Connecting...</span>
            </>
          ) : (
            'X (Twitter)'
          )}
        </button>

        <button
          onClick={() => handleDirectProviderLogin('github')}
          disabled={loading === 'github'}
          style={{
            ...styles.directLoginButton,
            ...styles.githubButton,
            opacity: loading === 'github' ? 0.7 : 1
          }}
        >
          {loading === 'github' ? (
            <>
              <div style={styles.spinner}></div>
              <span style={{ marginLeft: 8 }}>Connecting...</span>
            </>
          ) : (
            'GitHub'
          )}
        </button>

        <button
          onClick={handleDirectPasskeyLogin}
          disabled={loading === 'passkey'}
          style={{
            ...styles.directLoginButton,
            ...styles.passkeyButton,
            opacity: loading === 'passkey' ? 0.7 : 1
          }}
        >
          {loading === 'passkey' ? (
            <>
              <div style={styles.spinner}></div>
              <span style={{ marginLeft: 8 }}>Authenticating...</span>
            </>
          ) : (
            'Passkey'
          )}
        </button>
      </div>
    </div>
  );
};

const CustomMfaSetupButton = () => {
  const { triggerMfaSetup } = usePr0d();
  return (
    <button onClick={triggerMfaSetup} style={styles.customMfaButton}>
      Set up MFA
    </button>
  );
};

const CustomLinkEmailButton = () => {
  const { triggerEmailLink } = usePr0d();
  return (
    <button onClick={triggerEmailLink} style={styles.customLinkEmailButton}>
      Link Email
    </button>
  );
};

const CustomLinkWalletButton = () => {
  const { triggerWalletLink } = usePr0d();
  return (
    <button onClick={triggerWalletLink} style={styles.customLinkWalletButton}>
      Link Wallet
    </button>
  );
};

const CustomLinkMFAButton = () => {
  const { linkMFA } = usePr0d();
  return (
    <button onClick={linkMFA} style={styles.customLinkMFAButton}>
      Link MFA (Direct)
    </button>
  );
};

const CustomLinkPasskeyButton = () => {
  const { linkPasskey } = usePr0d();
  return (
    <button onClick={linkPasskey} style={styles.customLinkPasskeyButton}>
      Link Passkey (Direct)
    </button>
  );
};

const EmbeddedWalletSection = () => {
  const { user } = usePr0d();
  const [showPrivateKey, setShowPrivateKey] = React.useState(false);
  const [copied, setCopied] = React.useState<'address' | 'privateKey' | null>(null);
  const [showAddressQR, setShowAddressQR] = React.useState(false);
  const [showPrivateKeyQR, setShowPrivateKeyQR] = React.useState(false);

  const copyToClipboard = async (text: string, type: 'address' | 'privateKey') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const handleSignMessage = async () => {
    const message = prompt('Enter a message to sign:');
    if (!message) return;

    alert('Transaction sponsorship features have been removed.');
  };



  if (!user?.embeddedWallet) return null;

  return (
    <div style={styles.walletSection}>
      <h3>Embedded Wallet</h3>
      <div style={styles.walletInfo}>
        <div style={styles.walletField}>
          <label style={styles.walletLabel}>Address:</label>
          <div style={styles.walletValueContainer}>
            <code style={styles.walletValue}>{user.embeddedWallet.address}</code>
            <button
              style={styles.copyButton}
              onClick={() => copyToClipboard(user.embeddedWallet.address, 'address')}
              title="Copy address"
            >
              {copied === 'address' ? (
                <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#4CAF50">
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                </svg>
              ) : (
                <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                  <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                </svg>
              )}
            </button>
            <button
              style={styles.qrButton}
              onClick={() => setShowAddressQR(!showAddressQR)}
              title={showAddressQR ? "Hide QR code" : "Show QR code"}
            >
              <svg style={styles.qrIcon} viewBox="0 0 24 24" fill="#666">
                <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,5H21V9H19V5M5,5H9V9H5V5M3,3H11V11H3V3M5,5V9H9V5H5M3,13H11V21H3V13M5,15V19H9V15H5M13,3H21V11H13V3M15,5V9H19V5H15M13,13H15V15H13V13M15,15H17V17H15V15M17,13H19V15H17V13M15,17H17V19H15V17M17,17H19V19H17V17M19,13H21V21H19V13M19,15V19H21V15H19Z" />
              </svg>
            </button>
          </div>
          {showAddressQR && (
            <div style={styles.qrContainer}>
              <QRCode
                value={user.embeddedWallet.address}
                size={200}
                style={styles.qrCode}
              />
              <p style={styles.qrLabel}>Scan to add wallet address</p>
            </div>
          )}
        </div>

        <div style={styles.walletField}>
          <label style={styles.walletLabel}>Private Key:</label>
          <div style={styles.walletValueContainer}>
            <code style={styles.walletValue}>
              {showPrivateKey ? user.embeddedWallet.privateKey : '••••••••••••••••••••••••••••••••'}
            </code>
            <button
              style={styles.toggleButton}
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              title={showPrivateKey ? "Hide private key" : "Show private key"}
            >
              {showPrivateKey ? (
                <svg style={styles.eyeIcon} viewBox="0 0 24 24" fill="#666">
                  <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.37,7 12,7Z" />
                </svg>
              ) : (
                <svg style={styles.eyeIcon} viewBox="0 0 24 24" fill="#666">
                  <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                </svg>
              )}
            </button>
            {showPrivateKey && (
              <>
                <button
                  style={styles.copyButton}
                  onClick={() => copyToClipboard(user.embeddedWallet.privateKey, 'privateKey')}
                  title="Copy private key"
                >
                  {copied === 'privateKey' ? (
                    <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#4CAF50">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                    </svg>
                  ) : (
                    <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                      <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                    </svg>
                  )}
                </button>
                <button
                  style={styles.qrButton}
                  onClick={() => setShowPrivateKeyQR(!showPrivateKeyQR)}
                  title={showPrivateKeyQR ? "Hide private key QR code" : "Show private key QR code"}
                >
                  <svg style={styles.qrIcon} viewBox="0 0 24 24" fill="#666">
                    <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,5H21V9H19V5M5,5H9V9H5V5M3,3H11V11H3V3M5,5V9H9V5H5M3,13H11V21H3V13M5,15V19H9V15H5M13,3H21V11H13V3M15,5V9H19V5H15M13,13H15V15H13V13M15,15H17V17H15V15M17,13H19V15H17V13M15,17H17V19H15V17M17,17H19V19H17V17M19,13H21V21H19V13M19,15V19H21V15H19Z" />
                  </svg>
                </button>
              </>
            )}
          </div>
          {showPrivateKeyQR && showPrivateKey && (
            <div style={styles.qrContainer}>
              <QRCode
                value={user.embeddedWallet.privateKey}
                size={200}
                style={styles.qrCode}
              />
              <p style={styles.qrLabel}>Scan to import private key</p>
              <div style={styles.privateKeyWarning}>
                <svg style={styles.warningIcon} viewBox="0 0 24 24" fill="#dc3545">
                  <path d="M1,21H23L12,2M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
                </svg>
                <span>DANGER: This QR contains your private key. Only scan with trusted devices.</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={styles.walletWarning}>
        <svg style={styles.warningIcon} viewBox="0 0 24 24" fill="#ff9800">
          <path d="M1,21H23L12,2M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
        </svg>
        <span>Keep your private key secure. Never share it with anyone.</span>
      </div>

      <div style={styles.walletActions}>
        <button
          onClick={handleSignMessage}
          style={styles.signMessageButton}
        >
          Sign Message
        </button>
      </div>


    </div>
  );
};

const WalletsSection = () => {
  const { user, unlinkWallet } = usePr0d();
  const [copiedAddress, setCopiedAddress] = React.useState<string | null>(null);
  const [showQRCodes, setShowQRCodes] = React.useState<Set<string>>(new Set());
  const [unlinkingWallet, setUnlinkingWallet] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, address: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    }
  };

  const toggleQRCode = (address: string) => {
    const newShowQRCodes = new Set(showQRCodes);
    if (newShowQRCodes.has(address)) {
      newShowQRCodes.delete(address);
    } else {
      newShowQRCodes.add(address);
    }
    setShowQRCodes(newShowQRCodes);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleUnlinkWallet = async (address: string) => {
    setUnlinkingWallet(address);
    setError(null);

    try {
      await unlinkWallet(address);
      // Success! The user data will be automatically updated
    } catch (err: any) {
      setError(`Failed to unlink wallet: ${err.message}`);
    } finally {
      setUnlinkingWallet(null);
    }
  };

  if (!user?.wallets || user.wallets.length === 0) {
    return (
      <div style={styles.walletsSection}>
        {error && <div style={styles.errorMessage}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={styles.walletsSection}>
      <h4>Connected Wallets ({user.wallets.length})</h4>
      {error && <div style={styles.errorMessage}>{error}</div>}
      <div style={styles.walletsList}>
        {user.wallets.map((wallet: Wallet, index: number) => (
          <div key={wallet.address} style={styles.walletCard}>
            <div style={styles.walletHeader}>
              <h4 style={styles.walletTitle}>Wallet #{index + 1}</h4>
            </div>

            <div style={styles.walletField}>
              <label style={styles.walletLabel}>Address:</label>
              <div style={styles.walletValueContainer}>
                <code style={styles.walletValue}>{wallet.address}</code>
                <button
                  style={styles.copyButton}
                  onClick={() => copyToClipboard(wallet.address, wallet.address)}
                  title="Copy address"
                >
                  {copiedAddress === wallet.address ? (
                    <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#4CAF50">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                    </svg>
                  ) : (
                    <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                      <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                    </svg>
                  )}
                </button>
                <button
                  style={styles.qrButton}
                  onClick={() => toggleQRCode(wallet.address)}
                  title={showQRCodes.has(wallet.address) ? "Hide QR code" : "Show QR code"}
                >
                  <svg style={styles.qrIcon} viewBox="0 0 24 24" fill="#666">
                    <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,5H21V9H19V5M5,5H9V9H5V5M3,3H11V11H3V3M5,5V9H9V5H5M3,13H11V21H3V13M5,15V19H9V15H5M13,3H21V11H13V3M15,5V9H19V5H15M13,13H15V15H13V13M15,15H17V17H15V15M17,13H19V15H17V13M15,17H17V19H15V17M17,17H19V19H17V17M19,13H21V21H19V13M19,15V19H21V15H19Z" />
                  </svg>
                </button>
              </div>
              {showQRCodes.has(wallet.address) && (
                <div style={styles.qrContainer}>
                  <QRCode
                    value={wallet.address}
                    size={200}
                    style={styles.qrCode}
                  />
                  <p style={styles.qrLabel}>Scan to add wallet address</p>
                </div>
              )}
            </div>

            <div style={styles.walletDates}>
              <div style={styles.dateField}>
                <label style={styles.dateLabel}>First Verified:</label>
                <span style={styles.dateValue}>{formatDate(wallet.first_verified_at)}</span>
              </div>
              <div style={styles.dateField}>
                <label style={styles.dateLabel}>Last Verified:</label>
                <span style={styles.dateValue}>{formatDate(wallet.last_verified_at)}</span>
              </div>
            </div>

            {/* Unlink wallet button */}
            <div style={styles.walletActions}>
              <button
                style={{
                  ...styles.unlinkWalletButton,
                  opacity: unlinkingWallet === wallet.address ? 0.7 : 1
                }}
                onClick={() => handleUnlinkWallet(wallet.address)}
                disabled={unlinkingWallet === wallet.address}
              >
                {unlinkingWallet === wallet.address ? (
                  <>
                    <div style={styles.spinner}></div>
                    <span style={{ marginLeft: 8 }}>Unlinking...</span>
                  </>
                ) : (
                  'Unlink Wallet'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MfaSection = () => {
  const { user, triggerMfaSetup, deleteMFA } = usePr0d();
  const [deletingMfa, setDeletingMfa] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDeleteMfa = async () => {
    setDeletingMfa(true);
    setError(null);

    try {
      await deleteMFA();
      // Success! The user data will be automatically updated
    } catch (err: any) {
      setError(`Failed to delete MFA: ${err.message}`);
    } finally {
      setDeletingMfa(false);
    }
  };

  return (
    <div style={styles.mfaSection}>
      <h3>Multi-Factor Authentication</h3>
      {error && <div style={styles.errorMessage}>{error}</div>}

      {user?.mfa ? (
        <div style={styles.mfaEnabled}>
          <div style={styles.mfaStatus}>
            <svg style={styles.checkIcon} viewBox="0 0 24 24" fill="#4CAF50">
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
            </svg>
            <span>MFA is enabled on your account</span>
          </div>
          <button
            style={{
              ...styles.deleteMfaButton,
              opacity: deletingMfa ? 0.7 : 1
            }}
            onClick={handleDeleteMfa}
            disabled={deletingMfa}
          >
            {deletingMfa ? (
              <>
                <div style={styles.spinner}></div>
                <span style={{ marginLeft: 8 }}>Disabling...</span>
              </>
            ) : (
              'Disable MFA'
            )}
          </button>
        </div>
      ) : (
        <div style={styles.mfaDisabled}>
          <p style={styles.mfaDescription}>
            Multi-factor authentication adds an extra layer of security to your account.
          </p>
          <button onClick={triggerMfaSetup} style={styles.customMfaButton}>
            Enable MFA
          </button>
        </div>
      )}
    </div>
  );
};

// Utility function to parse user agent into user-friendly device names
const parseUserAgent = (userAgent: string) => {
  if (!userAgent) return { device: 'Unknown Device', browser: 'Unknown Browser' };

  // Device-first detection for user-friendly names
  let device = 'Unknown Device';
  let browser = 'Unknown Browser';

  // iPhone detection
  if (userAgent.includes('iPhone')) {
    // Try to detect iPhone model
    if (userAgent.includes('iPhone OS')) {
      const version = userAgent.match(/iPhone OS ([\d_]+)/)?.[1]?.replace(/_/g, '.');
      device = version ? `iPhone (iOS ${version})` : 'iPhone';
    } else {
      device = 'iPhone';
    }
  }
  // iPad detection
  else if (userAgent.includes('iPad')) {
    const version = userAgent.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, '.');
    device = version ? `iPad (iOS ${version})` : 'iPad';
  }
  // Mac detection
  else if (userAgent.includes('Mac OS X') || userAgent.includes('Macintosh')) {
    const version = userAgent.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.');
    // Can't reliably distinguish between MacBook, iMac, Mac Pro, etc. from user agent
    // So we'll just use "Mac" for all Mac computers
    device = version ? `Mac (macOS ${version})` : 'Mac';
  }
  // Windows detection
  else if (userAgent.includes('Windows NT')) {
    const version = userAgent.match(/Windows NT ([\d.]+)/)?.[1];
    let windowsName = 'Windows PC';
    switch (version) {
      case '10.0':
        windowsName = 'Windows 11 PC';
        break;
      case '6.3':
        windowsName = 'Windows 8.1 PC';
        break;
      case '6.2':
        windowsName = 'Windows 8 PC';
        break;
      case '6.1':
        windowsName = 'Windows 7 PC';
        break;
      default:
        windowsName = 'Windows PC';
    }
    device = windowsName;
  }
  // Android detection
  else if (userAgent.includes('Android')) {
    const version = userAgent.match(/Android ([\d.]+)/)?.[1];

    // Try to detect specific Android devices
    if (userAgent.includes('SM-')) {
      const model = userAgent.match(/SM-([A-Z0-9]+)/)?.[1];
      device = model ? `Samsung Galaxy ${model}` : 'Samsung Galaxy';
    } else if (userAgent.includes('Pixel')) {
      const model = userAgent.match(/Pixel ([^;)]+)/)?.[1];
      device = model ? `Google Pixel ${model}` : 'Google Pixel';
    } else if (userAgent.includes('OnePlus')) {
      const model = userAgent.match(/OnePlus ([^;)]+)/)?.[1];
      device = model ? `OnePlus ${model}` : 'OnePlus';
    } else {
      device = version ? `Android Phone (${version})` : 'Android Phone';
    }
  }
  // Linux detection
  else if (userAgent.includes('Linux')) {
    if (userAgent.includes('Ubuntu')) {
      device = 'Ubuntu PC';
    } else {
      device = 'Linux PC';
    }
  }
  // Generic fallback
  else if (userAgent.includes('Mobile')) {
    device = 'Mobile Device';
  } else {
    device = 'Desktop Computer';
  }

  // Browser detection
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browser = 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari';
  } else if (userAgent.includes('Edg')) {
    browser = 'Microsoft Edge';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    browser = 'Opera';
  } else {
    browser = 'Web Browser';
  }

  return { device, browser };
};

const PasskeysSection = () => {
  const { user, deletePasskey } = usePr0d();
  const [deletingPasskey, setDeletingPasskey] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Get passkeys from user data instead of making API call
  const passkeys = user?.passkeys || [];

  const handleDeletePasskey = async (credentialId: string) => {
    setDeletingPasskey(credentialId);
    setError(null);

    try {
      await deletePasskey(credentialId);
      // No need to reload passkeys - user data will be automatically updated
    } catch (err: any) {
      setError(`Failed to delete passkey: ${err.message}`);
    } finally {
      setDeletingPasskey(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getDeviceTypeIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'multiDevice':
        return (
          <svg style={styles.deviceIcon} viewBox="0 0 24 24" fill="#4CAF50">
            <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" />
          </svg>
        );
      default:
        return (
          <svg style={styles.deviceIcon} viewBox="0 0 24 24" fill="#2196F3">
            <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
          </svg>
        );
    }
  };

  return (
    <div style={styles.passkeysSection}>
      <h3>Passkeys</h3>
      {error && <div style={styles.errorMessage}>{error}</div>}

      {passkeys && passkeys.length > 0 ? (
        <>
          <p style={styles.passkeysDescription}>
            You have {passkeys.length} passkey{passkeys.length !== 1 ? 's' : ''} registered to your account.
          </p>
          <div style={styles.passkeysList}>
            {passkeys.map((passkey: any, index: number) => (
              <div key={passkey.credentialID} style={styles.passkeyCard}>
                <div style={styles.passkeyHeader}>
                  <div style={styles.passkeyTitle}>
                    {getDeviceTypeIcon(passkey.deviceType)}
                    <span>Passkey #{index + 1}</span>
                  </div>
                  <div style={styles.passkeyBadges}>
                    {passkey.backedUp && (
                      <span style={styles.backedUpBadge}>Synced</span>
                    )}
                    <span style={styles.deviceTypeBadge}>
                      {passkey.deviceType === 'multiDevice' ? 'Cross-platform' : 'Platform'}
                    </span>
                  </div>
                </div>

                <div style={styles.passkeyDetails}>
                  <div style={styles.passkeyField}>
                    <label style={styles.passkeyLabel}>Credential ID:</label>
                    <code style={styles.passkeyValue}>
                      {passkey.credentialID || 'N/A'}
                    </code>
                  </div>

                  {passkey.deviceName && (
                    <div style={styles.passkeyField}>
                      <label style={styles.passkeyLabel}>Device:</label>
                      <div style={styles.deviceSimpleDisplay}>
                        <span style={styles.deviceSimpleValue}>
                          {parseUserAgent(passkey.deviceName).device}
                        </span>
                        <details style={styles.rawUserAgentDetails}>
                          <summary style={styles.rawUserAgentSummary}>View technical details</summary>
                          <code style={styles.rawUserAgentCode}>{passkey.deviceName}</code>
                        </details>
                      </div>
                    </div>
                  )}

                  {passkey.transports && passkey.transports.length > 0 && (
                    <div style={styles.passkeyField}>
                      <label style={styles.passkeyLabel}>Transports:</label>
                      <div style={styles.transportsList}>
                        {passkey.transports.map((transport: string) => (
                          <span key={transport} style={styles.transportBadge}>
                            {transport}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={styles.passkeyDates}>
                    <div style={styles.dateField}>
                      <label style={styles.dateLabel}>First Used:</label>
                      <span style={styles.dateValue}>{formatDate(passkey.first_verified_at)}</span>
                    </div>
                    <div style={styles.dateField}>
                      <label style={styles.dateLabel}>Last Used:</label>
                      <span style={styles.dateValue}>{formatDate(passkey.last_verified_at)}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.passkeyActions}>
                  <button
                    style={{
                      ...styles.deletePasskeyButton,
                      opacity: deletingPasskey === passkey.credentialID ? 0.7 : 1
                    }}
                    onClick={() => handleDeletePasskey(passkey.credentialID)}
                    disabled={deletingPasskey === passkey.credentialID}
                  >
                    {deletingPasskey === passkey.credentialID ? (
                      <>
                        <div style={styles.spinner}></div>
                        <span style={{ marginLeft: 8 }}>Deleting...</span>
                      </>
                    ) : (
                      'Delete Passkey'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={styles.noPasskeys}>
          <p style={styles.noPasskeysText}>No passkeys registered to your account.</p>
          <p style={styles.passkeyHint}>
            You can register a passkey by logging out and using the "Passkey" option during login.
          </p>
        </div>
      )}
    </div>
  );
};

const SessionsSection = () => {
  const { getAllSessions, revokeAllSessions, revokeSession, user, visitorId } = usePr0d();
  const [sessions, setSessions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [locationCache, setLocationCache] = React.useState<{ [key: string]: string }>({});
  const [currentRefreshToken, setCurrentRefreshToken] = React.useState<string | null>(null);

  const getLocationFromIP = async (ipAddress: string): Promise<string> => {
    // Check cache first
    if (locationCache[ipAddress]) {
      return locationCache[ipAddress];
    }

    try {
      // Using ipapi.co free service (1000 requests/day limit)
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      const data = await response.json();

      let location = 'Unknown Location';
      if (data.city && data.country_name) {
        location = `${data.city}, ${data.country_name}`;
      } else if (data.country_name) {
        location = data.country_name;
      } else if (data.error) {
        location = 'Private/Local IP';
      }

      // Cache the result
      setLocationCache(prev => ({ ...prev, [ipAddress]: location }));
      return location;
    } catch (error) {
      console.error('Error getting location for IP:', ipAddress, error);
      const fallbackLocation = 'Unknown Location';
      setLocationCache(prev => ({ ...prev, [ipAddress]: fallbackLocation }));
      return fallbackLocation;
    }
  };

  const getCurrentRefreshToken = () => {
    // Try to get the refresh token from localStorage or sessionStorage
    const refreshToken = localStorage.getItem('pr0d:refresh_token');
    return refreshToken;
  };

  const isCurrentSession = (session: any) => {
    // First check if backend already marked it as current
    if (session.isCurrentSession) return true;

    const currentToken = getCurrentRefreshToken();

    console.log(currentToken, session.id, session.refreshToken);

    // If we have both refresh token and session ID, compare them
    if (currentToken && session.id) {
      // Check if the refresh token starts with the truncated session ID (first 5 chars)
      const truncatedSessionId = session.id.substring(0, 5);
      if (currentToken.startsWith(truncatedSessionId)) {
        return true;
      }
    }

    // If we have full refresh tokens, do exact comparison
    if (currentToken && session.refreshToken) {
      return session.refreshToken === currentToken;
    }

    // Fallback to original field
    return false;
  };

  const handleGetSessions = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await getAllSessions();
      setSessions(result.sessions);
      setMessage(`Found ${result.totalCount} active sessions`);

      // Get current refresh token for comparison
      const currentToken = getCurrentRefreshToken();
      setCurrentRefreshToken(currentToken);

      // Fetch locations for all IPs in the background
      result.sessions.forEach((session: any) => {
        if (session.ipAddress && !locationCache[session.ipAddress]) {
          getLocationFromIP(session.ipAddress);
        }
      });
    } catch (error: any) {
      console.error('Error getting sessions:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAllSessions = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await revokeAllSessions();
      setMessage(result.message);
      setSessions([]); // Clear the sessions list
    } catch (error: any) {
      console.error('Error revoking all sessions:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await revokeSession(sessionId);
      setMessage(result.message);
      // Remove the revoked session from the list
      setSessions(sessions.filter(session => session.id !== sessionId));
    } catch (error: any) {
      console.error('Error revoking session:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div style={styles.sessionsSection}>
      <h3>Session Management</h3>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button
          onClick={handleGetSessions}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Get All Sessions'}
        </button>
        <button
          onClick={handleRevokeAllSessions}
          disabled={loading || sessions.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (loading || sessions.length === 0) ? 'not-allowed' : 'pointer',
            opacity: (loading || sessions.length === 0) ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Revoke All Sessions'}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '10px',
          backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`,
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      {sessions.length > 0 && (
        <div>
          <h4>Active Sessions ({sessions.length})</h4>
          <div style={{ display: 'grid', gap: '10px' }}>
            {sessions.map((session) => (
              <div key={session.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      Session ID: {session.id}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                      <strong>Device:</strong> {parseUserAgent(session.userAgent).device}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                      <strong>Location:</strong> {locationCache[session.ipAddress] || 'Loading...'}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                      <strong>IP Address:</strong> {session.ipAddress}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                      <strong>Created:</strong> {formatDate(session.createdAt)}
                    </div>
                    {session.expiresAt && (
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                        <strong>Expires:</strong> {formatDate(session.expiresAt)}
                      </div>
                    )}
                    {isCurrentSession(session) && (
                      <div style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        Current Session
                      </div>
                    )}
                    {session.refreshToken && (
                      <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                        <strong>Token:</strong> {session.refreshToken.substring(0, 20)}...
                        {currentRefreshToken === session.refreshToken && (
                          <span style={{ color: '#28a745', fontWeight: 'bold', marginLeft: '5px' }}>
                            ✓ Current
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleRevokeSession(session.id)}
                    disabled={loading}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      opacity: loading ? 0.6 : 1,
                      fontSize: '12px'
                    }}
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// The main App component
const App = () => {
  const appId = "684dea5189269732f9817561";

  return (

    <Pr0d appId={appId}>
      <AppContent />
    </Pr0d>

  );
};

// Footer component that displays visitor ID for all states
const Footer = () => {
  const { visitorId } = usePr0d();

  return (
    <footer style={styles.footer}>
      {visitorId && (
        <div style={styles.visitorId}>
          <p>Visitor ID: {visitorId}</p>
        </div>
      )}
    </footer>
  );
};

// The AppContent component that renders different content based on auth state
const AppContent = () => {
  const { isAuthenticated } = usePr0d();

  return (
    <div style={styles.content}>
      <header style={styles.appHeader}>
        <h1> pr0d.io </h1>
      </header>

      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <div style={styles.welcome}>
          <h2>Authentication Demo</h2>
          <CustomLoginButton />
          <DirectLoginButtons />
        </div>
      )}

      <Footer />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '80%',
    margin: '0 auto',
    padding: 20
  },
  content: {
    paddingTop: 20,
    maxWidth: '80%',
    margin: '0 auto',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  appHeader: {
    borderBottom: '1px solid #eee',
    paddingBottom: 20,
    marginBottom: 30
  },
  welcome: {
    textAlign: 'center',
    padding: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 40,
    flex: 1
  },
  dashboard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    flex: 1
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#f2f2f2',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer'
  },
  userInfo: {
    marginBottom: 30
  },
  providersSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  mfaSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  mfaEnabled: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16
  },
  mfaStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  mfaDisabled: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  mfaDescription: {
    color: '#666',
    fontSize: 14,
    margin: 0,
    lineHeight: 1.4
  },
  deleteMfaButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  },
  providersDisplay: {
    marginBottom: 15
  },
  providersLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontWeight: 500
  },
  linkedProvidersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  linkedProvider: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    fontSize: 14
  },
  providerIndicator: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    flexShrink: 0
  },
  providerName: {
    flex: 1
  },
  unlinkButton: {
    marginLeft: 'auto',
    background: 'transparent',
    border: 'none',
    color: '#dc3545',
    cursor: 'pointer',
    fontSize: 18,
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: 4,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 28,
    minHeight: 28
  },
  spinner: {
    width: 12,
    height: 12,
    border: '2px solid #dc3545',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  errorMessage: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: 4,
    padding: '8px 12px',
    marginBottom: 10,
    fontSize: 14
  },
  checkIcon: {
    width: 16,
    height: 16,
    marginLeft: 'auto',
    flexShrink: 0
  },
  noProvidersText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    margin: 0
  },
  customLoginButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 20
  },
  customMfaButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 10
  },
  customLinkEmailButton: {
    padding: '10px 20px',
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 10,
    marginRight: 10
  },
  customLinkProvidersButton: {
    padding: '10px 20px',
    backgroundColor: '#6f42c1',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 10
  },
  customLinkWalletButton: {
    padding: '10px 20px',
    backgroundColor: '#fd7e14',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    marginTop: 10
  },
  walletSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  walletInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  walletField: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  walletLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333'
  },
  walletValueContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    border: '1px solid #e9ecef'
  },
  walletValue: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    color: '#333',
    backgroundColor: 'transparent',
    wordBreak: 'break-all',
    lineHeight: 1.4
  },
  copyButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease'
  },
  toggleButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease'
  },
  copyIcon: {
    width: 16,
    height: 16
  },
  eyeIcon: {
    width: 16,
    height: 16
  },
  walletWarning: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: 6,
    fontSize: 14,
    color: '#856404'
  },
  signMessageButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s ease'
  },
  warningIcon: {
    width: 16,
    height: 16,
    flexShrink: 0
  },
  qrButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease'
  },
  qrIcon: {
    width: 16,
    height: 16
  },
  qrContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 12,
    padding: 16,
    backgroundColor: '#fff',
    border: '1px solid #e9ecef',
    borderRadius: 8
  },
  qrCode: {
    border: '1px solid #e9ecef',
    borderRadius: 8
  },
  qrLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    margin: '8px 0 0 0'
  },
  sessionsSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  privateKeyWarning: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: 6,
    fontSize: 12,
    color: '#721c24',
    fontWeight: 600
  },
  walletsSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  walletsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  walletCard: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: 8,
    padding: 16
  },
  walletHeader: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: '1px solid #dee2e6'
  },
  walletTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
    color: '#333'
  },
  walletDates: {
    display: 'flex',
    gap: 20,
    marginTop: 12,
    paddingTop: 12,
    borderTop: '1px solid #dee2e6'
  },
  dateField: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#666',
    textTransform: 'uppercase'
  },
  dateValue: {
    fontSize: 13,
    color: '#333'
  },
  walletsManagement: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  walletManagementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 1.4
  },
  walletActions: {
    marginTop: 16,
    paddingTop: 12,
    borderTop: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  unlinkWalletButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  },
  individualLinkButtons: {
    display: 'flex',
    gap: 10,
    marginTop: 15,
    flexWrap: 'wrap'
  },
  customLinkGoogleButton: {
    padding: '8px 16px',
    backgroundColor: '#4285F4',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  },
  customLinkDiscordButton: {
    padding: '8px 16px',
    backgroundColor: '#5865F2',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  },
  customLinkXButton: {
    padding: '8px 16px',
    backgroundColor: '#1DA1F2',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'

  },
  customLinkGithubButton: {
    padding: '8px 16px',
    backgroundColor: '#24292e',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  },
  linkMethodsSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  linkMethodsDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 1.4
  },
  directLinkButtons: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap'
  },
  customLinkMFAButton: {
    padding: '10px 20px',
    backgroundColor: '#ff6b35',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s ease'
  },
  customLinkPasskeyButton: {
    padding: '10px 20px',
    backgroundColor: '#9b59b6',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    transition: 'all 0.2s ease'
  },
  directLoginContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    border: '1px solid #e9ecef'
  },
  directLoginTitle: {
    margin: '0 0 20px 0',
    fontSize: 18,
    color: '#333',
    textAlign: 'center'
  },
  directLoginButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 12,
    justifyContent: 'center'
  },
  directLoginButton: {
    padding: '12px 16px',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    minHeight: 44
  },
  googleButton: {
    backgroundColor: '#4285F4',
    color: '#fff'
  },
  discordButton: {
    backgroundColor: '#5865F2',
    color: '#fff'
  },
  xButton: {
    backgroundColor: '#1DA1F2',
    color: '#fff'
  },
  githubButton: {
    backgroundColor: '#24292e',
    color: '#fff'
  },
  passkeyButton: {
    backgroundColor: '#9b59b6',
    color: '#fff'
  },
  walletButton: {
    backgroundColor: '#fd7e14',
    color: '#fff'
  },
  passkeysSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #eee'
  },
  passkeysDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 1.4
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    color: '#666'
  },
  passkeysList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  passkeyCard: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: 8,
    padding: 16
  },
  passkeyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: '1px solid #dee2e6'
  },
  passkeyTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 16,
    fontWeight: 600,
    color: '#333'
  },
  deviceIcon: {
    width: 20,
    height: 20
  },
  passkeyBadges: {
    display: 'flex',
    gap: 8
  },
  backedUpBadge: {
    padding: '2px 8px',
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 500
  },
  deviceTypeBadge: {
    padding: '2px 8px',
    backgroundColor: '#e2e3e5',
    color: '#495057',
    border: '1px solid #d6d8db',
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 500
  },
  passkeyDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  passkeyField: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  passkeyLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#666',
    textTransform: 'uppercase'
  },
  passkeyValue: {
    fontSize: 13,
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    color: '#333',
    backgroundColor: '#fff',
    padding: '4px 8px',
    borderRadius: 4,
    border: '1px solid #e9ecef',
    wordBreak: 'break-all'
  },
  deviceNameValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 500,
    padding: '4px 8px',
    backgroundColor: '#e7f3ff',
    border: '1px solid #b3d9ff',
    borderRadius: 4
  },
  deviceSimpleDisplay: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  deviceSimpleValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 500,
    padding: '8px 12px',
    backgroundColor: '#e7f3ff',
    border: '1px solid #b3d9ff',
    borderRadius: 4
  },
  rawUserAgentDetails: {
    marginTop: 8
  },
  rawUserAgentSummary: {
    fontSize: 12,
    color: '#666',
    cursor: 'pointer',
    padding: '4px 0',
    userSelect: 'none'
  },
  rawUserAgentCode: {
    display: 'block',
    fontSize: 11,
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    color: '#666',
    backgroundColor: '#f8f9fa',
    padding: '8px',
    borderRadius: 4,
    border: '1px solid #e9ecef',
    marginTop: 4,
    wordBreak: 'break-all',
    lineHeight: 1.4
  },
  transportsList: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap'
  },
  transportBadge: {
    padding: '2px 6px',
    backgroundColor: '#e7f3ff',
    color: '#0066cc',
    border: '1px solid #b3d9ff',
    borderRadius: 8,
    fontSize: 11,
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  passkeyDates: {
    display: 'flex',
    gap: 20,
    marginTop: 8
  },
  passkeyActions: {
    marginTop: 16,
    paddingTop: 12,
    borderTop: '1px solid #dee2e6',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  deletePasskeyButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  },
  noPasskeys: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    border: '1px solid #e9ecef'
  },
  noPasskeysText: {
    fontSize: 16,
    color: '#666',
    margin: '0 0 8px 0'
  },
  passkeyHint: {
    fontSize: 14,
    color: '#999',
    margin: 0,
    fontStyle: 'italic'
  },
  transactionSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: '1px solid #eee'
  },
  transactionGroup: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    border: '1px solid #e9ecef'
  },
  transactionDetails: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    border: '1px solid #b3d9ff'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    marginBottom: 10,
    border: '1px solid #ddd',
    borderRadius: 4,
    fontSize: 14,
    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
  },
  actionButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500
  },
  pendingTxs: {
    marginTop: 15
  },
  pendingTx: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    border: '1px solid #ddd',
    marginBottom: 10,
    fontSize: 12
  },
  footer: {
    marginTop: 'auto',
    padding: '20px 0',
    borderTop: '1px solid #eee',
    backgroundColor: '#f8f9fa'
  },
  visitorId: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    fontFamily: 'Monaco, Consolas, "Courier New", monospace'
  }
};

export default App;
