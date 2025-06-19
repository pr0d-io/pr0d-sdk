import React from 'react';
import Pr0d, { usePr0d } from '../lib/Pr0d';
import QRCode from 'react-qr-code';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';

import '@rainbow-me/rainbowkit/styles.css';

// Type definitions
interface Wallet {
  address: string;
  first_verified_at: string;
  last_verified_at: string;
}

const queryClient = new QueryClient();

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
  const { user, logout, getUser, teeSignMessage } = usePr0d();

  const handleGetUser = async () => {
    try {
      await getUser();
    } catch (error: any) {
      alert(`Failed to get user: ${error.message}`);
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
        </div>
      </div>
      
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
    { key: 'x', name: 'X (Twitter)', color: '#1DA1F2' }
  ];

  const linkedProviders = providers.filter(provider => user?.[provider.key]);
  const hasLinkedProviders = linkedProviders.length > 0;

  const handleUnlinkProvider = async (providerKey: 'google' | 'discord' | 'x') => {
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
                  onClick={() => handleUnlinkProvider(provider.key as 'google' | 'discord' | 'x')}
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
  const hasUnlinkedProviders = !user?.google || !user?.discord || !user?.x;
  
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

const CustomLoginButton = () => {
  const { login } = usePr0d();
  return (
    <button onClick={login} style={styles.customLoginButton}>
      Login or Signup
    </button>
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

const EmbeddedWalletSection = () => {
  const { user, teeSignMessage, createTransaction, getTransaction, sponsorTransaction, getPendingTransactions } = usePr0d();
  const [showPrivateKey, setShowPrivateKey] = React.useState(false);
  const [copied, setCopied] = React.useState<'address' | 'privateKey' | null>(null);
  const [showAddressQR, setShowAddressQR] = React.useState(false);
  const [showPrivateKeyQR, setShowPrivateKeyQR] = React.useState(false);
  
  // Transaction sponsorship states
  const [transactionData, setTransactionData] = React.useState<any>(null);
  const [transactionId, setTransactionId] = React.useState('');
  const [pendingTxs, setPendingTxs] = React.useState<any[]>([]);
  const [sponsorPrivateKey, setSponsorPrivateKey] = React.useState('');
  const [rpcUrl, setRpcUrl] = React.useState('https://rpc.therpc.io/bsc-testnet');
  const [txTo, setTxTo] = React.useState('0x3ae99FdBB2d7A003E32ebE430Cb2C75fC48a3a95');
  const [txValue, setTxValue] = React.useState('0');
  const [chainId, setChainId] = React.useState(97); // bsc testnet

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
    
    try {
      const result = await teeSignMessage(message);
      alert(`Message signed successfully!\n\nMessage: ${result.message}\nSignature: ${result.signature}\nAddress: ${result.address}`);
    } catch (error: any) {
      alert(`Failed to sign message: ${error.message}`);
    }
  };

  const handleCreateTransaction = async () => {
    try {
      const result = await createTransaction({
        to: txTo,
        value: (parseFloat(txValue) * 1e18).toString(), // Convert to wei
        chainId: chainId
      });
      setTransactionData(result);
      alert(`Transaction created successfully!\n\nTransaction ID: ${result.transactionId}\nUser Address: ${result.userAddress}\nExpires At: ${result.expiresAt}`);
    } catch (error: any) {
      alert(`Failed to create transaction: ${error.message}`);
    }
  };

  const handleGetTransaction = async () => {
    if (!transactionId) {
      alert('Please enter a transaction ID');
      return;
    }

    try {
      const result = await getTransaction(transactionId);
      setTransactionData(result);
      alert(`Transaction Status: ${result.status}\n\nTransaction ID: ${result.transactionId}\nUser Address: ${result.userAddress}\nCreated At: ${result.createdAt}${result.sponsorTxHash ? `\nSponsor Tx Hash: ${result.sponsorTxHash}` : ''}`);
    } catch (error: any) {
      alert(`Failed to get transaction: ${error.message}`);
    }
  };

  const handleSponsorTransaction = async () => {
    if (!transactionId) {
      alert('Please enter a transaction ID');
      return;
    }
    if (!sponsorPrivateKey) {
      alert('Please enter sponsor private key');
      return;
    }
    if (!rpcUrl) {
      alert('Please enter RPC URL');
      return;
    }

    try {
      const result = await sponsorTransaction(transactionId, sponsorPrivateKey, rpcUrl);
      alert(`Transaction sponsored successfully!\n\nTransaction Hash: ${result.txHash}\nSponsor Address: ${result.sponsorAddress}\nStatus: ${result.status}`);
    } catch (error: any) {
      alert(`Failed to sponsor transaction: ${error.message}`);
    }
  };

  const handleGetPendingTransactions = async () => {
    try {
      const result = await getPendingTransactions();
      setPendingTxs(result.transactions);
      alert(`Found ${result.count} pending transactions. Check the console for details.`);
      console.log('Pending transactions:', result.transactions);
    } catch (error: any) {
      alert(`Failed to get pending transactions: ${error.message}`);
    }
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
                   <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                 </svg>
               ) : (
                 <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                   <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                 </svg>
               )}
             </button>
             <button
               style={styles.qrButton}
               onClick={() => setShowAddressQR(!showAddressQR)}
               title={showAddressQR ? "Hide QR code" : "Show QR code"}
             >
               <svg style={styles.qrIcon} viewBox="0 0 24 24" fill="#666">
                 <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,5H21V9H19V5M5,5H9V9H5V5M3,3H11V11H3V3M5,5V9H9V5H5M3,13H11V21H3V13M5,15V19H9V15H5M13,3H21V11H13V3M15,5V9H19V5H15M13,13H15V15H13V13M15,15H17V17H15V15M17,13H19V15H17V13M15,17H17V19H15V17M17,17H19V19H17V17M19,13H21V21H19V13M19,15V19H21V15H19Z"/>
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
                  <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.09L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.76,7.13 11.37,7 12,7Z"/>
                </svg>
              ) : (
                <svg style={styles.eyeIcon} viewBox="0 0 24 24" fill="#666">
                  <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
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
                       <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                     </svg>
                   ) : (
                     <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                       <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                     </svg>
                   )}
                 </button>
                 <button
                   style={styles.qrButton}
                   onClick={() => setShowPrivateKeyQR(!showPrivateKeyQR)}
                   title={showPrivateKeyQR ? "Hide private key QR code" : "Show private key QR code"}
                 >
                   <svg style={styles.qrIcon} viewBox="0 0 24 24" fill="#666">
                     <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,5H21V9H19V5M5,5H9V9H5V5M3,3H11V11H3V3M5,5V9H9V5H5M3,13H11V21H3V13M5,15V19H9V15H5M13,3H21V11H13V3M15,5V9H19V5H15M13,13H15V15H13V13M15,15H17V17H15V15M17,13H19V15H17V13M15,17H17V19H15V17M17,17H19V19H17V17M19,13H21V21H19V13M19,15V19H21V15H19Z"/>
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
                   <path d="M1,21H23L12,2M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"/>
                 </svg>
                 <span>DANGER: This QR contains your private key. Only scan with trusted devices.</span>
               </div>
             </div>
           )}
         </div>
       </div>
      <div style={styles.walletWarning}>
        <svg style={styles.warningIcon} viewBox="0 0 24 24" fill="#ff9800">
          <path d="M1,21H23L12,2M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16"/>
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

      {/* Transaction Sponsorship Section */}
      <div style={styles.transactionSection}>
        <h4>🚀 Transaction Sponsorship</h4>
        
        {/* Create Transaction */}
        <div style={styles.transactionGroup}>
          <h5>Create Transaction</h5>
          <input
            type="text"
            placeholder="To Address"
            value={txTo}
            onChange={(e) => setTxTo(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Value (ETH)"
            value={txValue}
            onChange={(e) => setTxValue(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Chain ID"
            value={chainId}
            onChange={(e) => setChainId(parseInt(e.target.value))}
            style={styles.input}
          />
          <button onClick={handleCreateTransaction} style={styles.actionButton}>
            Create Transaction
          </button>
        </div>

        {/* Transaction Details */}
        {transactionData && (
          <div style={styles.transactionDetails}>
            <h5>Transaction Details</h5>
            <p><strong>ID:</strong> {transactionData.transactionId}</p>
            <p><strong>Status:</strong> {transactionData.status}</p>
            <p><strong>User Address:</strong> {transactionData.userAddress}</p>
            {transactionData.sponsorTxHash && (
              <p><strong>Sponsor Tx Hash:</strong> {transactionData.sponsorTxHash}</p>
            )}
          </div>
        )}

        {/* Get Transaction */}
        <div style={styles.transactionGroup}>
          <h5>Get Transaction</h5>
          <input
            type="text"
            placeholder="Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleGetTransaction} style={styles.actionButton}>
            Get Transaction
          </button>
        </div>

        {/* Sponsor Transaction */}
        <div style={styles.transactionGroup}>
          <h5>Sponsor Transaction</h5>
          <input
            type="text"
            placeholder="Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Sponsor Private Key"
            value={sponsorPrivateKey}
            onChange={(e) => setSponsorPrivateKey(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="RPC URL"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSponsorTransaction} style={styles.actionButton}>
            Sponsor Transaction
          </button>
        </div>

        {/* Get Pending Transactions */}
        <div style={styles.transactionGroup}>
          <h5>Pending Transactions</h5>
          <button onClick={handleGetPendingTransactions} style={styles.actionButton}>
            Get Pending Transactions
          </button>
          {pendingTxs.length > 0 && (
            <div style={styles.pendingTxs}>
              <p><strong>Found {pendingTxs.length} pending transactions:</strong></p>
              {pendingTxs.map((tx, index) => (
                <div key={index} style={styles.pendingTx}>
                  <p><strong>ID:</strong> {tx.transactionId}</p>
                  <p><strong>To:</strong> {tx.txData.to}</p>
                  <p><strong>Value:</strong> {tx.txData.value}</p>
                  <p><strong>Created:</strong> {new Date(tx.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
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
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                  ) : (
                    <svg style={styles.copyIcon} viewBox="0 0 24 24" fill="#666">
                      <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                    </svg>
                  )}
                </button>
                <button
                  style={styles.qrButton}
                  onClick={() => toggleQRCode(wallet.address)}
                  title={showQRCodes.has(wallet.address) ? "Hide QR code" : "Show QR code"}
                >
                  <svg style={styles.qrIcon} viewBox="0 0 24 24" fill="#666">
                    <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,5H21V9H19V5M5,5H9V9H5V5M3,3H11V11H3V3M5,5V9H9V5H5M3,13H11V21H3V13M5,15V19H9V15H5M13,3H21V11H13V3M15,5V9H19V5H15M13,13H15V15H13V13M15,15H17V17H15V15M17,13H19V15H17V13M15,17H17V19H15V17M17,17H19V19H17V17M19,13H21V21H19V13M19,15V19H21V15H19Z"/>
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
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
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
            <path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z"/>
          </svg>
        );
      default:
        return (
          <svg style={styles.deviceIcon} viewBox="0 0 24 24" fill="#2196F3">
            <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z"/>
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
                      <label style={styles.passkeyLabel}>Device Name:</label>
                      <span style={styles.deviceNameValue}>
                        {passkey.deviceName}
                      </span>
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

// The main App component
const App = () => {
  const appId = "684dea5189269732f9817561";
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div style={styles.app}>
            <Pr0d appId={appId}>
              <AppContent />
            </Pr0d>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
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
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: 1200,
    margin: '0 auto',
    padding: 20
  },
  content: {
    paddingTop: 20
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
    marginTop: 40
  },
  dashboard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
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
  }
};

export default App;