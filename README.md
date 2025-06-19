# Pr0d SDK

A comprehensive authentication SDK for React applications, providing wallet connectivity, OAuth integrations, MFA, passkeys, and embedded wallet functionality.

## Features

- **Multi-Factor Authentication** - TOTP-based MFA setup and verification
- **Social Authentication** - Google, Discord, X (Twitter) OAuth integrations  
- **Wallet Integration** - Connect external wallets (MetaMask, WalletConnect, etc.)
- **Passkey Support** - WebAuthn-based passwordless authentication
- **Email Authentication** - Email verification and linking
- **Customizable UI** - Themed authentication flows matching your app
- **Embedded Wallet** - Built-in wallet functionality with transaction signing
- **Real-time Updates** - Live authentication state management

## Installation

```bash
npm install pr0d-sdk
```



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

## Configuration

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

## API Reference

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


The SDK automatically detects the environment and uses appropriate endpoints:

- **Development**: Uses development API endpoints
- **Production**: Uses production API endpoints based on your app configuration

## Documentation

- **[Getting Started](docs/GETTING_STARTED.md)** - Quick setup guide for new users
- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation
- **[Examples](docs/EXAMPLES.md)** - Comprehensive code examples
- **[Changelog](CHANGELOG.md)** - Version history and changes
- **[Contributing](CONTRIBUTING.md)** - Guide for contributors

## Support

- **Documentation**: [https://docs.pr0d.io](https://docs.pr0d.io)
- **GitHub Issues**: [https://github.com/pr0d-io/pr0d-sdk/issues](hhttps://github.com/pr0d-io/pr0d-sdk/issues)
- **Discord**: [https://discord.gg/pr0d](https://discord.gg/pr0d)
- **Email**: support@pr0d.io

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

Built with ❤️ by the Pr0d Team 