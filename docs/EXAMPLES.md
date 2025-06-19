# Pr0d SDK Examples

This document provides comprehensive examples for integrating the Pr0d SDK into your React applications.

## Table of Contents
- [Basic Setup](#basic-setup)
- [Authentication Examples](#authentication-examples)
- [Multi-Factor Authentication](#multi-factor-authentication)
- [Social Provider Integration](#social-provider-integration)
- [Wallet Integration](#wallet-integration)
- [Passkey Authentication](#passkey-authentication)
- [Embedded Wallet](#embedded-wallet)
- [Advanced Usage](#advanced-usage)

## Basic Setup

### 1. Install Dependencies

```bash
npm install @pr0d/sdk @rainbow-me/rainbowkit @tanstack/react-query viem wagmi
```

### 2. Configure Wagmi

Create `wagmi.config.ts`:

```typescript
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: 'your-walletconnect-project-id' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

### 3. App Setup

```jsx
// App.jsx
import React from 'react';
import { Pr0d } from '@pr0d/sdk';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './wagmi.config';
import Dashboard from './Dashboard';

import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Pr0d appId="your-app-id-from-pr0d-dashboard">
            <Dashboard />
          </Pr0d>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
```

## Authentication Examples

### Simple Login/Logout

```jsx
// SimpleAuth.jsx
import React from 'react';
import { usePr0d } from '@pr0d/sdk';

function SimpleAuth() {
  const { isAuthenticated, user, login, logout } = usePr0d();

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <h1>Welcome to MyApp</h1>
        <p>Please authenticate to continue</p>
        <button onClick={login} className="login-btn">
          Login with Pr0d
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.email?.email || 'User'}!</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      <main>
        <p>You are now authenticated!</p>
      </main>
    </div>
  );
}

export default SimpleAuth;
```

### Protected Route Component

```jsx
// ProtectedRoute.jsx
import React from 'react';
import { usePr0d } from '@pr0d/sdk';

function ProtectedRoute({ children, fallback }) {
  const { isAuthenticated, login } = usePr0d();

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>You need to be logged in to access this page.</p>
          <button onClick={login}>Login</button>
        </div>
      )
    );
  }

  return children;
}

// Usage
function App() {
  return (
    <Pr0d appId="your-app-id">
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </Pr0d>
  );
}
```

## Multi-Factor Authentication

### Complete MFA Flow

```jsx
// MFAManager.jsx
import React, { useState, useEffect } from 'react';
import { usePr0d } from '@pr0d/sdk';
import QRCode from 'react-qr-code';

function MFAManager() {
  const { 
    user, 
    setupMFA, 
    verifyMFA, 
    deleteMFA,
    triggerMfaSetup 
  } = usePr0d();

  const [mfaSetup, setMfaSetup] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSetupMFA = async () => {
    try {
      setError('');
      const setup = await setupMFA();
      setMfaSetup(setup);
    } catch (err) {
      setError('Failed to setup MFA: ' + err.message);
    }
  };

  const handleVerifyMFA = async (e) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const isValid = await verifyMFA(verificationCode);
      if (isValid) {
        setSuccess('MFA verified successfully!');
        setMfaSetup(null);
        setVerificationCode('');
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Verification failed: ' + err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDeleteMFA = async () => {
    if (!confirm('Are you sure you want to remove MFA? This will make your account less secure.')) {
      return;
    }

    try {
      await deleteMFA();
      setSuccess('MFA removed successfully');
    } catch (err) {
      setError('Failed to remove MFA: ' + err.message);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(mfaSetup.secret);
    setSuccess('Secret copied to clipboard!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="mfa-manager">
      <h2>Multi-Factor Authentication</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {!user?.mfa ? (
        <div className="mfa-setup">
          <p>Secure your account with MFA</p>
          
          {!mfaSetup ? (
            <div>
              <button onClick={handleSetupMFA} className="setup-btn">
                Setup MFA
              </button>
              <button onClick={triggerMfaSetup} className="modal-btn">
                Setup MFA (Modal)
              </button>
            </div>
          ) : (
            <div className="setup-process">
              <h3>Scan QR Code</h3>
              <div className="qr-container">
                <QRCode value={mfaSetup.qrCodeUrl} size={200} />
              </div>
              
              <h4>Or enter this secret manually:</h4>
              <div className="secret-container">
                <code>{mfaSetup.secret}</code>
                <button onClick={copySecret}>Copy</button>
              </div>

              <form onSubmit={handleVerifyMFA}>
                <h4>Enter verification code:</h4>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                <button type="submit" disabled={isVerifying}>
                  {isVerifying ? 'Verifying...' : 'Verify & Enable MFA'}
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="mfa-enabled">
          <h3>✅ MFA is enabled</h3>
          <p>Your account is protected with multi-factor authentication.</p>
          
          <div className="mfa-test">
            <h4>Test MFA:</h4>
            <form onSubmit={handleVerifyMFA}>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter MFA code"
                maxLength={6}
              />
              <button type="submit" disabled={isVerifying}>
                {isVerifying ? 'Verifying...' : 'Test Code'}
              </button>
            </form>
          </div>

          <button onClick={handleDeleteMFA} className="danger-btn">
            Remove MFA
          </button>
        </div>
      )}
    </div>
  );
}

export default MFAManager;
```

## Social Provider Integration

### Social Account Linking

```jsx
// SocialLinking.jsx
import React, { useState } from 'react';
import { usePr0d } from '@pr0d/sdk';

function SocialLinking() {
  const { 
    linkProvider, 
    unlinkProvider, 
    linkGoogle, 
    linkDiscord, 
    linkX,
    triggerProviderLink,
    user 
  } = usePr0d();

  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLinkProvider = async (provider) => {
    setLoading(prev => ({ ...prev, [provider]: true }));
    setError('');
    
    try {
      await linkProvider(provider);
      setSuccess(`${provider} linked successfully!`);
    } catch (err) {
      setError(`Failed to link ${provider}: ${err.message}`);
    } finally {
      setLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  const handleUnlinkProvider = async (provider) => {
    if (!confirm(`Are you sure you want to unlink ${provider}?`)) {
      return;
    }

    setLoading(prev => ({ ...prev, [`unlink-${provider}`]: true }));
    setError('');
    
    try {
      await unlinkProvider(provider);
      setSuccess(`${provider} unlinked successfully!`);
    } catch (err) {
      setError(`Failed to unlink ${provider}: ${err.message}`);
    } finally {
      setLoading(prev => ({ ...prev, [`unlink-${provider}`]: false }));
    }
  };

  const providers = [
    { key: 'google', name: 'Google', icon: '🔍' },
    { key: 'discord', name: 'Discord', icon: '🎮' },
    { key: 'x', name: 'X (Twitter)', icon: '🐦' }
  ];

  return (
    <div className="social-linking">
      <h2>Social Account Linking</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="provider-grid">
        {providers.map(provider => {
          const isLinked = user?.[provider.key]; // Check if provider is linked
          const isLoading = loading[provider.key] || loading[`unlink-${provider.key}`];

          return (
            <div key={provider.key} className="provider-card">
              <div className="provider-info">
                <span className="provider-icon">{provider.icon}</span>
                <span className="provider-name">{provider.name}</span>
                {isLinked && <span className="linked-badge">✅ Linked</span>}
              </div>

              <div className="provider-actions">
                {!isLinked ? (
                  <button
                    onClick={() => handleLinkProvider(provider.key)}
                    disabled={isLoading}
                    className="link-btn"
                  >
                    {loading[provider.key] ? 'Linking...' : `Link ${provider.name}`}
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnlinkProvider(provider.key)}
                    disabled={isLoading}
                    className="unlink-btn"
                  >
                    {loading[`unlink-${provider.key}`] ? 'Unlinking...' : 'Unlink'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button onClick={triggerProviderLink} className="modal-btn">
          Link Provider (Modal)
        </button>
        
        <div className="direct-links">
          <button onClick={linkGoogle} disabled={loading.google}>
            Link Google Directly
          </button>
          <button onClick={linkDiscord} disabled={loading.discord}>
            Link Discord Directly
          </button>
          <button onClick={linkX} disabled={loading.x}>
            Link X Directly
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialLinking;
```

## Wallet Integration

### External Wallet Linking

```jsx
// WalletLinking.jsx
import React, { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { usePr0d } from '@pr0d/sdk';

function WalletLinking() {
  const { address, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const { 
    linkWallet, 
    unlinkWallet, 
    triggerWalletLink,
    user 
  } = usePr0d();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLinkWallet = async () => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Generate nonce (in real app, get from your backend)
      const nonce = Math.random().toString(36).substring(2, 15);
      const message = `Link wallet ${address} with nonce: ${nonce}`;

      // Sign message
      const signature = await signMessage({ message });

      // Link wallet
      const success = await linkWallet(signature, nonce);
      
      if (success) {
        setSuccess('Wallet linked successfully!');
      } else {
        setError('Failed to link wallet');
      }
    } catch (err) {
      setError('Wallet linking failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlinkWallet = async (walletAddress) => {
    if (!confirm(`Unlink wallet ${walletAddress}?`)) return;

    setLoading(true);
    setError('');

    try {
      await unlinkWallet(walletAddress);
      setSuccess('Wallet unlinked successfully!');
    } catch (err) {
      setError('Wallet unlinking failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-linking">
      <h2>Wallet Integration</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="current-wallet">
        <h3>Current Wallet</h3>
        {isConnected ? (
          <div className="wallet-info">
            <p>Address: <code>{address}</code></p>
            <button 
              onClick={handleLinkWallet} 
              disabled={loading}
              className="link-wallet-btn"
            >
              {loading ? 'Linking...' : 'Link This Wallet'}
            </button>
          </div>
        ) : (
          <p>No wallet connected. Please connect using RainbowKit.</p>
        )}
      </div>

      <div className="linked-wallets">
        <h3>Linked Wallets</h3>
        {user?.wallets?.length > 0 ? (
          <div className="wallet-list">
            {user.wallets.map((wallet, index) => (
              <div key={index} className="wallet-item">
                <code>{wallet.address}</code>
                <button 
                  onClick={() => handleUnlinkWallet(wallet.address)}
                  disabled={loading}
                  className="unlink-btn"
                >
                  Unlink
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No wallets linked yet.</p>
        )}
      </div>

      <div className="modal-action">
        <button onClick={triggerWalletLink} className="modal-btn">
          Link Wallet (Modal)
        </button>
      </div>
    </div>
  );
}

export default WalletLinking;
```

## Passkey Authentication

### Complete Passkey Management

```jsx
// PasskeyManager.jsx
import React, { useState, useEffect } from 'react';
import { usePr0d } from '@pr0d/sdk';

function PasskeyManager() {
  const { 
    initPasskey, 
    verifyPasskey, 
    listPasskeys, 
    deletePasskey,
    triggerPasskeySetup 
  } = usePr0d();

  const [passkeys, setPasskeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPasskeys();
  }, []);

  const loadPasskeys = async () => {
    try {
      const result = await listPasskeys();
      setPasskeys(result.passkeys);
    } catch (err) {
      console.error('Failed to load passkeys:', err);
    }
  };

  const handleCreatePasskey = async () => {
    setLoading(true);
    setError('');

    try {
      // Check if browser supports WebAuthn
      if (!window.PublicKeyCredential) {
        throw new Error('WebAuthn is not supported in this browser');
      }

      // Initialize passkey creation
      const { options, type } = await initPasskey();
      
      if (type === 'registration') {
        // Create new passkey
        const credential = await navigator.credentials.create({
          publicKey: options
        });

        // Verify the created passkey
        const result = await verifyPasskey(credential);
        
        if (result.type === 'registration') {
          setSuccess('Passkey created successfully!');
          loadPasskeys(); // Refresh the list
        }
      } else {
        setError('Expected registration but got authentication');
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Passkey creation was cancelled or not allowed');
      } else if (err.name === 'NotSupportedError') {
        setError('Passkeys are not supported on this device');
      } else {
        setError('Failed to create passkey: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticatePasskey = async () => {
    setLoading(true);
    setError('');

    try {
      // Initialize passkey authentication
      const { options, type } = await initPasskey();
      
      if (type === 'authentication') {
        // Authenticate with existing passkey
        const credential = await navigator.credentials.get({
          publicKey: options
        });

        // Verify the authentication
        const result = await verifyPasskey(credential);
        
        if (result.type === 'authentication') {
          setSuccess('Authenticated successfully with passkey!');
        }
      } else {
        setError('Expected authentication but got registration');
      }
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Authentication was cancelled or not allowed');
      } else {
        setError('Authentication failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePasskey = async (credentialId, deviceName) => {
    if (!confirm(`Delete passkey for ${deviceName}?`)) return;

    setLoading(true);
    setError('');

    try {
      await deletePasskey(credentialId);
      setSuccess('Passkey deleted successfully!');
      loadPasskeys(); // Refresh the list
    } catch (err) {
      setError('Failed to delete passkey: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="passkey-manager">
      <h2>Passkey Management</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="passkey-actions">
        <button 
          onClick={handleCreatePasskey} 
          disabled={loading}
          className="create-btn"
        >
          {loading ? 'Creating...' : 'Create New Passkey'}
        </button>

        <button 
          onClick={handleAuthenticatePasskey} 
          disabled={loading || passkeys.length === 0}
          className="auth-btn"
        >
          {loading ? 'Authenticating...' : 'Test Authentication'}
        </button>

        <button 
          onClick={triggerPasskeySetup}
          className="modal-btn"
        >
          Setup Passkey (Modal)
        </button>
      </div>

      <div className="passkey-list">
        <h3>Your Passkeys ({passkeys.length})</h3>
        
        {passkeys.length === 0 ? (
          <div className="empty-state">
            <p>No passkeys found. Create your first passkey to get started!</p>
            <p>Passkeys provide secure, passwordless authentication using your device's biometrics or PIN.</p>
          </div>
        ) : (
          <div className="passkey-grid">
            {passkeys.map((passkey) => (
              <div key={passkey.credentialId} className="passkey-card">
                <div className="passkey-info">
                  <h4>{passkey.deviceName || 'Unknown Device'}</h4>
                  <p className="created-date">
                    Created: {new Date(passkey.createdAt).toLocaleDateString()}
                  </p>
                  <p className="last-used">
                    Last used: {passkey.lastUsed 
                      ? new Date(passkey.lastUsed).toLocaleDateString()
                      : 'Never'
                    }
                  </p>
                </div>
                
                <div className="passkey-actions">
                  <button 
                    onClick={() => handleDeletePasskey(passkey.credentialId, passkey.deviceName)}
                    disabled={loading}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="passkey-info">
        <h3>About Passkeys</h3>
        <ul>
          <li>🔐 Secure authentication without passwords</li>
          <li>📱 Uses your device's biometrics or PIN</li>
          <li>🚫 No passwords to remember or lose</li>
          <li>⚡ Fast and convenient sign-in</li>
          <li>🛡️ Resistant to phishing attacks</li>
        </ul>
      </div>
    </div>
  );
}

export default PasskeyManager;
```

## Embedded Wallet

### Message Signing and Transactions

```jsx
// EmbeddedWallet.jsx
import React, { useState, useEffect } from 'react';
import { usePr0d } from '@pr0d/sdk';

function EmbeddedWallet() {
  const { 
    teeSignMessage, 
    createTransaction, 
    getTransaction,
    sponsorTransaction,
    getPendingTransactions 
  } = usePr0d();

  const [message, setMessage] = useState('Hello, Web3!');
  const [signature, setSignature] = useState('');
  const [pendingTxs, setPendingTxs] = useState([]);
  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadPendingTransactions();
  }, []);

  const loadPendingTransactions = async () => {
    try {
      const result = await getPendingTransactions();
      setPendingTxs(result.transactions);
    } catch (err) {
      console.error('Failed to load pending transactions:', err);
    }
  };

  const handleSignMessage = async () => {
    if (!message.trim()) {
      setError('Please enter a message to sign');
      return;
    }

    setLoading(prev => ({ ...prev, signing: true }));
    setError('');

    try {
      const result = await teeSignMessage(message);
      setSignature(result.signature);
      setSuccess(`Message signed successfully!\nAddress: ${result.address}`);
    } catch (err) {
      setError('Message signing failed: ' + err.message);
    } finally {
      setLoading(prev => ({ ...prev, signing: false }));
    }
  };

  const handleCreateTransaction = async (txData) => {
    setLoading(prev => ({ ...prev, creating: true }));
    setError('');

    try {
      const result = await createTransaction(txData);
      setSuccess(`Transaction created!\nID: ${result.transactionId}`);
      loadPendingTransactions(); // Refresh pending transactions
    } catch (err) {
      setError('Transaction creation failed: ' + err.message);
    } finally {
      setLoading(prev => ({ ...prev, creating: false }));
    }
  };

  const handleGetTransaction = async (transactionId) => {
    setLoading(prev => ({ ...prev, [`getting-${transactionId}`]: true }));

    try {
      const tx = await getTransaction(transactionId);
      alert(`Transaction Status: ${tx.status}\nCreated: ${tx.createdAt}`);
    } catch (err) {
      setError('Failed to get transaction: ' + err.message);
    } finally {
      setLoading(prev => ({ ...prev, [`getting-${transactionId}`]: false }));
    }
  };

  const presetTransactions = [
    {
      name: 'Send 0.01 ETH',
      data: {
        to: '0x742d35Cc6634C0532925a3b8D7389d7B0F8C2d6e',
        value: '0.01',
        chainId: 1
      }
    },
    {
      name: 'Send 0.001 ETH (Sepolia)',
      data: {
        to: '0x742d35Cc6634C0532925a3b8D7389d7B0F8C2d6e',
        value: '0.001',
        chainId: 11155111
      }
    },
    {
      name: 'Contract Call',
      data: {
        to: '0xA0b86a33E6441e43e6e8C8b3Ee6c4f8A6b0d8b5e',
        data: '0xa9059cbb000000000000000000000000742d35cc6634c0532925a3b8d7389d7b0f8c2d6e0000000000000000000000000000000000000000000000000de0b6b3a7640000',
        chainId: 1
      }
    }
  ];

  return (
    <div className="embedded-wallet">
      <h2>Embedded Wallet</h2>

      {error && <div className="error">{error}</div>}
      {success && <div className="success" style={{ whiteSpace: 'pre-line' }}>{success}</div>}

      {/* Message Signing Section */}
      <div className="signing-section">
        <h3>Message Signing</h3>
        <div className="message-input">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to sign"
            rows={3}
          />
          <button 
            onClick={handleSignMessage} 
            disabled={loading.signing}
            className="sign-btn"
          >
            {loading.signing ? 'Signing...' : 'Sign Message'}
          </button>
        </div>

        {signature && (
          <div className="signature-result">
            <h4>Signature:</h4>
            <code className="signature">{signature}</code>
            <button 
              onClick={() => navigator.clipboard.writeText(signature)}
              className="copy-btn"
            >
              Copy
            </button>
          </div>
        )}
      </div>

      {/* Transaction Creation Section */}
      <div className="transaction-section">
        <h3>Create Transactions</h3>
        <div className="preset-transactions">
          {presetTransactions.map((preset, index) => (
            <div key={index} className="preset-tx">
              <div className="preset-info">
                <h4>{preset.name}</h4>
                <div className="tx-details">
                  <p>To: <code>{preset.data.to}</code></p>
                  {preset.data.value && <p>Value: {preset.data.value} ETH</p>}
                  <p>Chain ID: {preset.data.chainId}</p>
                </div>
              </div>
              <button 
                onClick={() => handleCreateTransaction(preset.data)}
                disabled={loading.creating}
                className="create-tx-btn"
              >
                {loading.creating ? 'Creating...' : 'Create Transaction'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Transactions Section */}
      <div className="pending-transactions">
        <h3>Pending Transactions ({pendingTxs.length})</h3>
        {pendingTxs.length === 0 ? (
          <p>No pending transactions</p>
        ) : (
          <div className="tx-list">
            {pendingTxs.map((tx) => (
              <div key={tx.transactionId} className="tx-item">
                <div className="tx-info">
                  <p><strong>ID:</strong> {tx.transactionId}</p>
                  <p><strong>To:</strong> {tx.txData.to}</p>
                  {tx.txData.value && <p><strong>Value:</strong> {tx.txData.value} ETH</p>}
                  <p><strong>Status:</strong> {tx.status}</p>
                  <p><strong>Created:</strong> {new Date(tx.createdAt).toLocaleString()}</p>
                </div>
                <div className="tx-actions">
                  <button 
                    onClick={() => handleGetTransaction(tx.transactionId)}
                    disabled={loading[`getting-${tx.transactionId}`]}
                    className="get-tx-btn"
                  >
                    {loading[`getting-${tx.transactionId}`] ? 'Loading...' : 'Get Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <button 
          onClick={loadPendingTransactions}
          className="refresh-btn"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default EmbeddedWallet;
```

## Advanced Usage

### Complete Dashboard Example

```jsx
// CompleteDashboard.jsx
import React, { useState } from 'react';
import { usePr0d } from '@pr0d/sdk';
import MFAManager from './MFAManager';
import SocialLinking from './SocialLinking';
import WalletLinking from './WalletLinking';
import PasskeyManager from './PasskeyManager';
import EmbeddedWallet from './EmbeddedWallet';

function CompleteDashboard() {
  const { isAuthenticated, user, login, logout } = usePr0d();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <h1>Welcome to Pr0d SDK Demo</h1>
          <p>Experience the full power of Pr0d authentication</p>
          <button onClick={login} className="login-btn">
            Get Started
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'mfa', name: 'MFA', icon: '🔐' },
    { id: 'social', name: 'Social', icon: '🔗' },
    { id: 'wallets', name: 'Wallets', icon: '💳' },
    { id: 'passkeys', name: 'Passkeys', icon: '🔑' },
    { id: 'embedded', name: 'Embedded Wallet', icon: '⚡' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview">
            <h2>Account Overview</h2>
            <div className="user-info">
              <p><strong>User ID:</strong> {user._id}</p>
              <p><strong>Email:</strong> {user?.email?.email || 'Not set'}</p>
              <p><strong>MFA:</strong> {user?.mfa ? '✅ Enabled' : '❌ Disabled'}</p>
            </div>
            
            <div className="security-status">
              <h3>Security Status</h3>
              <div className="status-grid">
                <div className={`status-item ${user?.mfa ? 'enabled' : 'disabled'}`}>
                  <span className="status-icon">🔐</span>
                  <span>Multi-Factor Auth</span>
                  <span className="status">{user?.mfa ? 'Enabled' : 'Disabled'}</span>
                </div>
                
                <div className={`status-item ${user?.email ? 'enabled' : 'disabled'}`}>
                  <span className="status-icon">📧</span>
                  <span>Email Verified</span>
                  <span className="status">{user?.email ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'mfa':
        return <MFAManager />;
      case 'social':
        return <SocialLinking />;
      case 'wallets':
        return <WalletLinking />;
      case 'passkeys':
        return <PasskeyManager />;
      case 'embedded':
        return <EmbeddedWallet />;
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Pr0d SDK Dashboard</h1>
        <div className="user-menu">
          <span>Welcome, {user?.email?.email || 'User'}!</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-name">{tab.name}</span>
            </button>
          ))}
        </nav>

        <main className="dashboard-main">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}

export default CompleteDashboard;
```

### Custom Hook for Authentication State

```jsx
// useAuth.js
import { usePr0d } from '@pr0d/sdk';
import { useEffect, useState } from 'react';

export function useAuth() {
  const pr0d = usePr0d();
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    hasEmail: false,
    hasMFA: false,
    hasPasskeys: false,
    linkedProviders: []
  });

  useEffect(() => {
    // Update auth state when pr0d state changes
    setAuthState({
      isLoading: false,
      isAuthenticated: pr0d.isAuthenticated,
      user: pr0d.user,
      hasEmail: !!pr0d.user?.email,
      hasMFA: !!pr0d.user?.mfa,
      hasPasskeys: pr0d.user?.passkeys?.length > 0,
      linkedProviders: [
        pr0d.user?.google && 'google',
        pr0d.user?.discord && 'discord',
        pr0d.user?.x && 'x'
      ].filter(Boolean)
    });
  }, [pr0d.isAuthenticated, pr0d.user]);

  return {
    ...pr0d,
    ...authState
  };
}

// Usage in components
function MyComponent() {
  const { 
    isAuthenticated, 
    hasEmail, 
    hasMFA, 
    linkedProviders,
    login,
    triggerMfaSetup 
  } = useAuth();

  return (
    <div>
      {!isAuthenticated && <button onClick={login}>Login</button>}
      {isAuthenticated && !hasMFA && (
        <button onClick={triggerMfaSetup}>Setup MFA</button>
      )}
      <p>Linked providers: {linkedProviders.join(', ')}</p>
    </div>
  );
}
```

This comprehensive examples document covers all major use cases and provides practical, copy-paste ready code for integrating the Pr0d SDK into React applications. 