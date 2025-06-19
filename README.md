# Pr0d SDK

A comprehensive authentication SDK for React applications, providing wallet connectivity, OAuth integrations, MFA, passkeys, and embedded wallet functionality.

## 🚀 Features

- 🔐 **Multi-Factor Authentication** - TOTP-based MFA setup and verification
- 🔗 **Social Authentication** - Google, Discord, X (Twitter) OAuth integrations  
- 💳 **Wallet Integration** - Connect external wallets (MetaMask, WalletConnect, etc.)
- 🔑 **Passkey Support** - WebAuthn-based passwordless authentication
- 📧 **Email Authentication** - Email verification and linking
- 🎨 **Customizable UI** - Themed authentication flows matching your app
- ⚡ **Embedded Wallet** - Built-in wallet functionality with transaction signing
- 🔄 **Real-time Updates** - Live authentication state management

## 📦 Installation

```bash
npm install pr0d-sdk
```



## 🏗️ Quick Start

### 1. Wrap your app with providers

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Pr0d from 'pr0d-sdk';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pr0d appId='684dea5189269732f9817561'>
      <App />
    </Pr0d>
  </StrictMode>,
)

```

### 2. Use the authentication hook

```jsx
import React from 'react';
import { usePr0d } from 'pr0d-sdk';

function Dashboard() {
  const { 
    isAuthenticated, 
    user, 
    login, 
    logout
  } = usePr0d();

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Welcome to MyApp</h1>
        <button onClick={login}>Login with Pr0d</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user?.email?.email || 'User'}!</h1>
      <button onClick={logout}>Logout</button>
      {!user?.mfa && (
        <button onClick={triggerMfaSetup}>Setup MFA</button>
      )}
    </div>
  );
}
```

## 🔧 Configuration

### App Configuration

The SDK automatically fetches your app configuration using the `appId`. Your app config includes:

```typescript
interface AppConfig {
  id: string;
  name: string;
  image: string;
  background: string;
  accent: string;
  allowedOrigins: string[];
  x: boolean;
  google: boolean;
  discord: boolean;
  telegram: boolean;
  apple: boolean;
  options: {
    allowEmail: boolean;
    allowEmailPlus: boolean;
    allowX: boolean;
    allowGoogle: boolean;
    allowDiscord: boolean;
    allowTelegram: boolean;
    allowExternalWallets: boolean;
    allowPasskeys: boolean;
  }
}
```

## 📚 API Reference

### `usePr0d()` Hook

The main hook that provides all authentication functionality:

#### Authentication State
```typescript
const {
  accessToken,      // string | null - Current access token
  isAuthenticated,  // boolean - Whether user is logged in
  user,            // User | null - Current user object
  logout,          // () => void - Logout function
  login            // () => void - Trigger login modal
} = usePr0d();
```

#### Multi-Factor Authentication
```typescript
const {
  triggerMfaSetup,  // () => void - Open MFA setup modal
  setupMFA,         // () => Promise<{secret: string, qrCodeUrl: string}>
  verifyMFA,        // (code: string) => Promise<boolean>
  deleteMFA         // () => Promise<void>
} = usePr0d();
```

#### Email Linking
```typescript
const {
  triggerEmailLink, // () => void - Open email linking modal
  initEmailLink,    // (email: string) => Promise<void>
  linkEmail         // (email: string, code: string) => Promise<boolean>
} = usePr0d();
```

#### Social Provider Linking
```typescript
const {
  triggerProviderLink, // () => void - Open provider linking modal
  linkProvider,        // (provider: 'google'|'discord'|'x') => Promise<void>
  unlinkProvider,      // (provider: 'google'|'discord'|'x') => Promise<void>
  linkGoogle,          // () => Promise<void>
  linkDiscord,         // () => Promise<void>
  linkX                // () => Promise<void>
} = usePr0d();
```

#### Wallet Integration
```typescript
const {
  triggerWalletLink, // () => void - Open wallet linking modal
  linkWallet,        // (signature: string, nonce: string) => Promise<boolean>
  unlinkWallet       // (address: string) => Promise<void>
} = usePr0d();
```

#### Passkey Authentication
```typescript
const {
  triggerPasskeySetup, // () => void - Open passkey setup modal
  initPasskey,         // (userHandle?: string) => Promise<{options: any, type: 'registration'|'authentication'}>
  verifyPasskey,       // (credential: any) => Promise<{type: string, user?: User, accessToken?: string, message: string}>
  listPasskeys,        // () => Promise<{passkeys: any[], count: number}>
  deletePasskey        // (credentialId: string) => Promise<void>
} = usePr0d();
```

#### Embedded Wallet
```typescript
const {
  teeSignMessage,      // (message: string) => Promise<{signature: string, address: string, message: string}>
  createTransaction,   // (txData) => Promise<{transactionId: string, userAddress: string, txData: any, expiresAt: string}>
  getTransaction,      // (transactionId: string) => Promise<Transaction>
  sponsorTransaction,  // (transactionId: string, sponsorPrivateKey: string, rpcUrl: string, nonce?: number) => Promise<SponsorResult>
  getPendingTransactions // () => Promise<{transactions: any[], count: number}>
} = usePr0d();
```

#### User Management
```typescript
const {
  getUser // (token?: string) => Promise<User>
} = usePr0d();
```

### User Object

```typescript
interface User {
  _id: string;
  email?: { email: string };
  mfa?: { secret: string };
  [key: string]: any;
}
```

## 🎨 Styling & Theming

The SDK automatically applies your app's branding based on your app configuration:

- **Background Color**: Applied to modal backgrounds
- **Accent Color**: Used for buttons, links, and highlights
- **App Name & Logo**: Displayed in authentication flows

The UI automatically adapts to light/dark themes based on your accent color.

## 📱 Usage Examples

### Complete Authentication Flow

```jsx
import React, { useState } from 'react';
import { usePr0d } from '@pr0d/sdk';

function AuthExample() {
  const { 
    isAuthenticated, 
    user, 
    login, 
    logout,
    setupMFA,
    verifyMFA,
    linkEmail,
    linkProvider
  } = usePr0d();

  const [mfaCode, setMfaCode] = useState('');

  const handleMfaSetup = async () => {
    try {
      const { secret, qrCodeUrl } = await setupMFA();
      console.log('MFA Secret:', secret);
      console.log('QR Code URL:', qrCodeUrl);
    } catch (error) {
      console.error('MFA setup failed:', error);
    }
  };

  const handleMfaVerify = async () => {
    try {
      const success = await verifyMFA(mfaCode);
      if (success) {
        console.log('MFA verified successfully');
      }
    } catch (error) {
      console.error('MFA verification failed:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Please Login</h2>
        <button onClick={login}>Login with Pr0d</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user?.email?.email || 'User'}!</h2>
      
      {/* MFA Section */}
      {!user?.mfa ? (
        <div>
          <h3>Setup Multi-Factor Authentication</h3>
          <button onClick={handleMfaSetup}>Setup MFA</button>
        </div>
      ) : (
        <div>
          <h3>MFA Enabled ✅</h3>
          <input 
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            placeholder="Enter MFA code"
          />
          <button onClick={handleMfaVerify}>Verify MFA</button>
        </div>
      )}

      {/* Social Linking */}
      <div>
        <h3>Link Social Accounts</h3>
        <button onClick={() => linkProvider('google')}>Link Google</button>
        <button onClick={() => linkProvider('discord')}>Link Discord</button>
        <button onClick={() => linkProvider('x')}>Link X (Twitter)</button>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Embedded Wallet Usage

```jsx
import React, { useState } from 'react';
import { usePr0d } from '@pr0d/sdk';

function WalletExample() {
  const { 
    teeSignMessage, 
    createTransaction, 
    getTransaction,
    getPendingTransactions 
  } = usePr0d();

  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');

  const handleSignMessage = async () => {
    try {
      const result = await teeSignMessage(message);
      setSignature(result.signature);
      console.log('Signed message:', result);
    } catch (error) {
      console.error('Message signing failed:', error);
    }
  };

  const handleCreateTransaction = async () => {
    try {
      const txData = {
        to: '0x742d35Cc6634C0532925a3b8D7389d7B0F8C2d6e',
        value: '0.01', // ETH
        chainId: 1
      };
      
      const result = await createTransaction(txData);
      console.log('Transaction created:', result);
    } catch (error) {
      console.error('Transaction creation failed:', error);
    }
  };

  return (
    <div>
      <h3>Embedded Wallet</h3>
      
      {/* Message Signing */}
      <div>
        <h4>Sign Message</h4>
        <input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to sign"
        />
        <button onClick={handleSignMessage}>Sign Message</button>
        {signature && (
          <div>
            <p>Signature: {signature}</p>
          </div>
        )}
      </div>

      {/* Transaction Creation */}
      <div>
        <h4>Create Transaction</h4>
        <button onClick={handleCreateTransaction}>
          Send 0.01 ETH to Test Address
        </button>
      </div>
    </div>
  );
}
```

### Passkey Authentication

```jsx
import React, { useState, useEffect } from 'react';
import { usePr0d } from '@pr0d/sdk';

function PasskeyExample() {
  const { 
    initPasskey, 
    verifyPasskey, 
    listPasskeys, 
    deletePasskey 
  } = usePr0d();

  const [passkeys, setPasskeys] = useState([]);

  useEffect(() => {
    loadPasskeys();
  }, []);

  const loadPasskeys = async () => {
    try {
      const result = await listPasskeys();
      setPasskeys(result.passkeys);
    } catch (error) {
      console.error('Failed to load passkeys:', error);
    }
  };

  const handleCreatePasskey = async () => {
    try {
      const { options, type } = await initPasskey();
      
      if (type === 'registration') {
        // Create new passkey
        const credential = await navigator.credentials.create({
          publicKey: options
        });
        
        const result = await verifyPasskey(credential);
        console.log('Passkey created:', result);
        loadPasskeys(); // Refresh list
      }
    } catch (error) {
      console.error('Passkey creation failed:', error);
    }
  };

  const handleDeletePasskey = async (credentialId) => {
    try {
      await deletePasskey(credentialId);
      loadPasskeys(); // Refresh list
    } catch (error) {
      console.error('Passkey deletion failed:', error);
    }
  };

  return (
    <div>
      <h3>Passkey Management</h3>
      
      <button onClick={handleCreatePasskey}>
        Create New Passkey
      </button>

      <div>
        <h4>Your Passkeys</h4>
        {passkeys.length === 0 ? (
          <p>No passkeys found</p>
        ) : (
          <ul>
            {passkeys.map((passkey) => (
              <li key={passkey.credentialId}>
                <span>{passkey.deviceName || 'Unknown Device'}</span>
                <button 
                  onClick={() => handleDeletePasskey(passkey.credentialId)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

## 🔒 Security

- All authentication flows use secure OAuth 2.0 and OpenID Connect standards
- MFA uses industry-standard TOTP (Time-based One-Time Password)
- Passkeys implement WebAuthn for passwordless authentication
- Embedded wallet uses secure enclaves for key management
- All API communications are encrypted and authenticated

## 🌐 Browser Support

- Chrome 88+
- Firefox 90+
- Safari 14+
- Edge 88+

For passkey support:
- Chrome 67+
- Firefox 60+
- Safari 14+
- Edge 18+

## 🚀 Environment Setup

The SDK automatically detects the environment and uses appropriate endpoints:

- **Development**: Uses development API endpoints
- **Production**: Uses production API endpoints based on your app configuration

## 📚 Documentation

- **[Getting Started](docs/GETTING_STARTED.md)** - Quick setup guide for new users
- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation
- **[Examples](docs/EXAMPLES.md)** - Comprehensive code examples
- **[Changelog](CHANGELOG.md)** - Version history and changes
- **[Contributing](CONTRIBUTING.md)** - Guide for contributors

## 📞 Support

- **Documentation**: [https://docs.pr0d.com](https://docs.pr0d.com)
- **GitHub Issues**: [https://github.com/pr0d/sdk/issues](https://github.com/pr0d/sdk/issues)
- **Discord**: [https://discord.gg/pr0d](https://discord.gg/pr0d)
- **Email**: support@pr0d.com

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

Built with ❤️ by the Pr0d Team 