# Getting Started with Pr0d SDK

This guide will help you integrate the Pr0d SDK into your React application in just a few minutes.

## Prerequisites

- React 16.8+ (hooks support)
- Node.js 14+
- A Pr0d account and app ID (sign up at [pr0d.com](https://pr0d.com))

## Step 1: Installation

Install the Pr0d SDK and required peer dependencies:

```bash
npm install @pr0d/sdk @rainbow-me/rainbowkit @tanstack/react-query viem wagmi
```

Or with yarn:

```bash
yarn add @pr0d/sdk @rainbow-me/rainbowkit @tanstack/react-query viem wagmi
```

## Step 2: Setup Wagmi Configuration

Create a `wagmi.config.js` file in your project root:

```javascript
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

> **Note**: Get your WalletConnect project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)

## Step 3: Wrap Your App

Update your main App component:

```jsx
// App.jsx
import React from 'react';
import { Pr0d } from '@pr0d/sdk';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './wagmi.config';
import Dashboard from './Dashboard';

// Import RainbowKit styles
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

## Step 4: Create Your First Component

Create a `Dashboard.jsx` component:

```jsx
// Dashboard.jsx
import React from 'react';
import { usePr0d } from '@pr0d/sdk';

function Dashboard() {
  const { isAuthenticated, user, login, logout } = usePr0d();

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome to My App</h1>
        <p>Please authenticate to continue</p>
        <button 
          onClick={login}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Login with Pr0d
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <div>
          <span style={{ marginRight: '12px' }}>
            Welcome, {user?.email?.email || 'User'}!
          </span>
          <button 
            onClick={logout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>
      
      <main style={{ marginTop: '20px' }}>
        <p>🎉 You are now authenticated!</p>
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <h3>User Information:</h3>
          <pre style={{ background: '#e9ecef', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
```

## Step 5: Get Your App ID

1. Sign up at [pr0d.com](https://pr0d.com)
2. Create a new application in your dashboard
3. Copy your App ID
4. Replace `"your-app-id-from-pr0d-dashboard"` in your App.jsx with your actual App ID

## Step 6: Run Your App

Start your development server:

```bash
npm start
# or
yarn start
```

Visit `http://localhost:3000` and click the "Login with Pr0d" button to test the authentication flow!

## What's Next?

Now that you have basic authentication working, you can explore more features:

### 🔐 Add Multi-Factor Authentication

```jsx
import { usePr0d } from '@pr0d/sdk';

function MFASection() {
  const { user, triggerMfaSetup, setupMFA, verifyMFA } = usePr0d();

  const handleSetupMFA = async () => {
    try {
      const { secret, qrCodeUrl } = await setupMFA();
      console.log('MFA Secret:', secret);
      console.log('QR Code URL:', qrCodeUrl);
    } catch (error) {
      console.error('MFA setup failed:', error);
    }
  };

  return (
    <div>
      {!user?.mfa ? (
        <button onClick={triggerMfaSetup}>Setup MFA</button>
      ) : (
        <p>✅ MFA is enabled</p>
      )}
    </div>
  );
}
```

### 🔗 Add Social Provider Linking

```jsx
import { usePr0d } from '@pr0d/sdk';

function SocialSection() {
  const { linkProvider, triggerProviderLink } = usePr0d();

  return (
    <div>
      <h3>Link Social Accounts</h3>
      <button onClick={() => linkProvider('google')}>Link Google</button>
      <button onClick={() => linkProvider('discord')}>Link Discord</button>
      <button onClick={() => linkProvider('x')}>Link X (Twitter)</button>
      
      {/* Or use the modal */}
      <button onClick={triggerProviderLink}>Link Provider (Modal)</button>
    </div>
  );
}
```

### 🔑 Add Passkey Support

```jsx
import { usePr0d } from '@pr0d/sdk';

function PasskeySection() {
  const { triggerPasskeySetup, initPasskey, verifyPasskey } = usePr0d();

  const createPasskey = async () => {
    try {
      const { options, type } = await initPasskey();
      
      if (type === 'registration') {
        const credential = await navigator.credentials.create({
          publicKey: options
        });
        
        const result = await verifyPasskey(credential);
        console.log('Passkey created:', result);
      }
    } catch (error) {
      console.error('Passkey creation failed:', error);
    }
  };

  return (
    <div>
      <h3>Passkey Authentication</h3>
      <button onClick={createPasskey}>Create Passkey</button>
      <button onClick={triggerPasskeySetup}>Setup Passkey (Modal)</button>
    </div>
  );
}
```

### ⚡ Use Embedded Wallet

```jsx
import { usePr0d } from '@pr0d/sdk';

function WalletSection() {
  const { teeSignMessage, createTransaction } = usePr0d();

  const signMessage = async () => {
    try {
      const result = await teeSignMessage('Hello, Web3!');
      console.log('Signature:', result.signature);
      console.log('Address:', result.address);
    } catch (error) {
      console.error('Signing failed:', error);
    }
  };

  const sendTransaction = async () => {
    try {
      const result = await createTransaction({
        to: '0x742d35Cc6634C0532925a3b8D7389d7B0F8C2d6e',
        value: '0.01',
        chainId: 1
      });
      console.log('Transaction created:', result.transactionId);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <h3>Embedded Wallet</h3>
      <button onClick={signMessage}>Sign Message</button>
      <button onClick={sendTransaction}>Send Transaction</button>
    </div>
  );
}
```

## Common Issues & Solutions

### Issue: "Module not found" errors

**Solution**: Make sure all peer dependencies are installed:
```bash
npm install @rainbow-me/rainbowkit @tanstack/react-query viem wagmi
```

### Issue: Authentication modal doesn't appear

**Solution**: Check that:
1. Your App ID is correct
2. Your domain is added to allowed origins in the Pr0d dashboard
3. You're not blocking popups in your browser

### Issue: Wallet connection fails

**Solution**: 
1. Make sure you have a WalletConnect project ID
2. Check that your wagmi configuration is correct
3. Ensure RainbowKit styles are imported

### Issue: TypeScript errors

**Solution**: Install type definitions:
```bash
npm install --save-dev @types/react @types/react-dom
```

## Environment Configuration

For production deployments, make sure to:

1. **Add your domain** to allowed origins in the Pr0d dashboard
2. **Use environment variables** for sensitive configuration:

```javascript
// wagmi.config.js
export const config = createConfig({
  // ... other config
  connectors: [
    walletConnect({ 
      projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID 
    }),
  ],
})
```

```jsx
// App.jsx
<Pr0d appId={process.env.REACT_APP_PR0D_APP_ID}>
```

3. **Set up your `.env` file**:
```env
REACT_APP_PR0D_APP_ID=your-app-id
REACT_APP_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```

## Next Steps

- 📖 Read the [API Reference](./API_REFERENCE.md) for detailed method documentation
- 🎯 Check out [Examples](./EXAMPLES.md) for more complex use cases
- 🎨 Customize the UI to match your brand
- 🔧 Configure additional authentication methods in your Pr0d dashboard

## Need Help?

- 📚 [Documentation](https://docs.pr0d.com)
- 💬 [Discord Community](https://discord.gg/pr0d)
- 📧 [Email Support](mailto:support@pr0d.com)
- 🐛 [GitHub Issues](https://github.com/pr0d/sdk/issues)

---

Congratulations! You now have a fully functional authentication system with Pr0d. The SDK provides everything you need for modern web3 authentication, from simple login/logout to advanced features like MFA, passkeys, and embedded wallets. 