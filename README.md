# Pr0d SDK

A comprehensive authentication SDK for React applications, providing wallet connectivity, OAuth integrations, MFA, passkeys, and embedded wallet functionality.

## Installation

```bash
npm install pr0d-sdk
```

## Peer Dependencies

The SDK requires the following peer dependencies to be installed in your project:

```bash
npm install @mui/icons-material @mui/material @rainbow-me/rainbowkit @tanstack/react-query react react-dom viem wagmi
```

## APP ID 

Your app ID is the unique identifier for your app. It is used to fetch your app configuration and to authenticate users under your administration.

You can find your app ID in the Pr0d dashboard.

## Quick Start

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
import React, { useState } from 'react';
import { usePr0d } from 'pr0d-sdk';

function Dashboard() {
  const { 
    isAuthenticated, 
    user, 
    logout,
    ready,
    sendEmailCode,
    loginWithEmailCode,
  } = usePr0d();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Wait for SDK to be ready
  if (!ready) {
    return <div>Loading...</div>;
  }

  const handleSendCode = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      await sendEmailCode(email);
      setCodeSent(true);
    } catch (error) {
      console.error('Failed to send email code:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !code) return;
    
    setLoading(true);
    try {
      await loginWithEmailCode(email, code);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Welcome to MyApp</h1>
        {!codeSent ? (
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendCode} disabled={loading || !email}>
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </div>
        ) : (
          <div>
            <p>Code sent to {email}</p>
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleLogin} disabled={loading || !code}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button onClick={() => setCodeSent(false)}>
              Use different email
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user?.email?.email || 'User'}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Configuration

### App Configuration

The SDK automatically fetches your app configuration using the `appId`. Configure your app at [https://dashboard.pr0d.io/](https://dashboard.pr0d.io/).

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
  walletConnect: string;
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

## API Reference

### `usePr0d()` Hook

The main hook that provides all authentication functionality:

```typescript
interface AuthContextType {
  // State
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  ready: boolean;

  // Core Authentication
  login: () => void;
  logout: () => void;

  // UI Triggers (Modal-based)
  triggerMfaSetup: () => void;
  triggerEmailLink: () => void;
  triggerProviderLink: () => void;
  triggerWalletLink: () => void;
  triggerPasskeySetup: () => void;

  // MFA Methods
  setupMFA: () => Promise<{ secret: string; qrCodeUrl: string }>;
  verifyMFA: (code: string) => Promise<boolean>;
  deleteMFA: () => Promise<void>;
  linkMFA: () => Promise<void>;

  // Email Methods
  sendEmailCode: (email: string) => Promise<any>;
  loginWithEmailCode: (email: string, code: string) => Promise<any>;
  loginWithEmailCodeHeadless: (email: string, code: string) => Promise<any>;
  initEmailLink: (email: string) => Promise<void>;
  linkEmail: (email: string, code: string) => Promise<boolean>;

  // Social Provider Methods
  loginWithProvider: (provider: string) => Promise<any>;
  linkProvider: (provider: 'google' | 'discord' | 'x') => Promise<void>;
  unlinkProvider: (provider: 'google' | 'discord' | 'x') => Promise<void>;
  linkGoogle: () => Promise<void>;
  linkDiscord: () => Promise<void>;
  linkX: () => Promise<void>;

  // Wallet Methods
  linkWallet: (signature: string, nonce: string) => Promise<boolean>;
  unlinkWallet: (address: string) => Promise<void>;

  // Passkey Methods
  initPasskey: (userHandle?: string) => Promise<{ options: any; type: 'registration' | 'authentication' }>;
  verifyPasskey: (credential: any) => Promise<{ type: 'registration' | 'authentication'; user?: User; accessToken?: string; refreshToken?: string; message: string }>;
  listPasskeys: () => Promise<{ passkeys: any[]; count: number }>;
  deletePasskey: (credentialId: string) => Promise<void>;
  linkPasskey: () => void;

  // User Management
  getUser: (token?: string) => Promise<User>;

  // Session Management
  getAllSessions: () => Promise<{ sessions: Session[]; totalCount: number }>;
  revokeAllSessions: () => Promise<{ message: string; revokedCount: number }>;
  revokeSession: (sessionId: string) => Promise<{ message: string }>;

  // Embedded Wallet
  teeSignMessage: (message: string) => Promise<{ signature: string; address: string; message: string }>;
}
```

### Types

```typescript
interface User {
  _id: string;
  email?: { email: string };
  mfa?: { secret: string };
  [key: string]: any;
}

interface Session {
  id: string;
  createdAt: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: string | null;
  isCurrentSession: boolean;
}
```

## Common Usage Patterns

### Email Code Login Flow

```jsx
const handleEmailCodeLogin = async (email, code) => {
  try {
    // Step 1: Send verification code to email
    await sendEmailCode(email);
    
    // Step 2: User enters code from email and logs in
    const result = await loginWithEmailCode(email, code);
    console.log('Login successful:', result);
  } catch (error) {
    console.error('Email code login failed:', error.message);
  }
};
```

### Error Handling

Always wrap async operations in try-catch blocks:

```jsx
const handleMfaSetup = async () => {
  try {
    const { secret, qrCodeUrl } = await setupMFA();
    // Handle success
  } catch (error) {
    console.error('MFA setup failed:', error.message);
    // Show error to user
  }
};
```

### Email Linking Flow

```jsx
const handleEmailLink = async (email, code) => {
  try {
    // Step 1: Initialize email linking
    await initEmailLink(email);
    
    // Step 2: User enters code from email
    const success = await linkEmail(email, code);
    if (success) {
      console.log('Email linked successfully');
    }
  } catch (error) {
    console.error('Email linking failed:', error.message);
  }
};
```

### Passkey Authentication

```jsx
const handlePasskeyAuth = async () => {
  try {
    const { options, type } = await initPasskey();
    
    let credential;
    if (type === 'registration') {
      credential = await navigator.credentials.create({ publicKey: options });
    } else {
      credential = await navigator.credentials.get({ publicKey: options });
    }
    
    const result = await verifyPasskey(credential);
    console.log('Passkey auth result:', result);
  } catch (error) {
    console.error('Passkey authentication failed:', error.message);
  }
};
```

### Social Provider Management

```jsx
const handleProviderLink = async (provider) => {
  try {
    await linkProvider(provider); // 'google', 'discord', or 'x'
    console.log(`${provider} linked successfully`);
  } catch (error) {
    console.error(`Failed to link ${provider}:`, error.message);
  }
};
```

### Session Management

```jsx
const handleSessionManagement = async () => {
  try {
    // Get all user sessions
    const { sessions, totalCount } = await getAllSessions();
    console.log(`Found ${totalCount} sessions:`, sessions);
    
    // Revoke a specific session
    await revokeSession(sessionId);
    
    // Revoke all other sessions (keep current)
    const { revokedCount } = await revokeAllSessions();
    console.log(`Revoked ${revokedCount} sessions`);
  } catch (error) {
    console.error('Session management failed:', error.message);
  }
};
```

## Environment Variables

No environment variables required - just your `appId` which you get from the Pr0d dashboard.

## Troubleshooting

### Common Issues

1. **Passkeys not working**: Ensure you're using HTTPS and a supported browser
2. **OAuth redirects failing**: Check your `allowedOrigins` in the dashboard
3. **"User not authenticated" errors**: Always check `isAuthenticated` before calling authenticated methods
4. **"App not found" errors**: Verify your `appId` is correct
5. **Peer dependency errors**: Make sure all required peer dependencies are installed

### Browser Support

- **Passkeys**: Chrome 67+, Firefox 60+, Safari 14+
- **Wallet Connect**: All modern browsers
- **OAuth**: All modern browsers

## Support

- **Documentation**: [https://docs.pr0d.io](https://docs.pr0d.io)
- **GitHub Issues**: [https://github.com/pr0d-io/pr0d-sdk/issues](https://github.com/pr0d-io/pr0d-sdk/issues)
- **Discord**: [https://discord.gg/pr0d](https://discord.gg/pr0d)

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

Built with ❤️ by the Pr0d Team 