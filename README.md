# pr0d SDK

A comprehensive React authentication SDK supporting multiple authentication methods including email, social OAuth, passkeys, and wallet connections.

## Installation

```bash
npm install pr0d-sdk
```

### Peer Dependencies

Install the required peer dependencies:

```bash
npm install @rainbow-me/rainbowkit@^2.0.0 @tanstack/react-query@^5.81.5 react@^18.0.0 react-dom@^18.0.0 viem@^2.31.7 wagmi@^2.15.6
```

## Quick Start

```tsx
import { Pr0dProvider, usePr0d } from 'pr0d-sdk';

function App() {
  return (
    <Pr0dProvider appId="your-app-id">
      <AuthComponent />
    </Pr0dProvider>
  );
}

function AuthComponent() {
  const { isAuthenticated, user, login, logout } = usePr0d();

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={login.withGoogle}>Login with Google</button>
        <button onClick={login.withPasskey}>Login with Passkey</button>
        <button onClick={() => login.withEmail('user@example.com', '123456')}>
          Login with Email
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {user?.email?.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Authentication Methods

### Email Authentication

```tsx
const { login, link } = usePr0d();

// Send email code
await login.sendEmailCode('user@example.com');

// Login with email code
await login.withEmail('user@example.com', '123456');

// Link email to existing account
await link.sendEmailCode('user@example.com');
await link.email('user@example.com', '123456');
```

### Social OAuth

```tsx
const { login, link } = usePr0d();

// Login with social providers
await login.withGoogle();
await login.withDiscord();
await login.withGithub();
await login.withX();

// Link social providers to existing account
await link.google();
await link.discord();
await link.github();
await link.x();
```

### Passkey Authentication

```tsx
const { login, link, helpers } = usePr0d();

// Check if passkeys are supported
if (helpers.isPasskeySupported) {
  // Login with passkey
  await login.withPasskey();
  
  // Link passkey to existing account
  await link.passkey();
}
```

### Wallet Authentication

```tsx
const { login, link, helpers } = usePr0d();

// Get available wallet connectors
const connectors = helpers.connectors;

// Login with wallet (auto-selects connector)
await login.withWallet();

// Login with specific wallet connector
await login.withWallet(connectors[0]);

// Link wallet to existing account
await link.wallet(connectors[0]);
```

### TOTP (Time-based One-Time Password)

```tsx
const { link, renderQRCode } = usePr0d();

// Generate TOTP QR code
const qrElement = document.getElementById('qr-code');
const { secret } = await renderQRCode(qrElement, '');

// Link TOTP with verification code
await link.totp('123456');
```

## User Management

### Check Authentication Status

```tsx
const { isAuthenticated, user, ready } = usePr0d();

if (!ready) {
  return <div>Loading...</div>;
}

if (!isAuthenticated) {
  return <LoginComponent />;
}

return <Dashboard user={user} />;
```

### Manage Authentication Methods

```tsx
const { user, helpers, unlink } = usePr0d();

// Check which methods are linked
const linkedMethods = helpers.getLinkedMethods();
const hasEmail = helpers.hasLinked('email');
const hasWallet = helpers.hasLinked('wallet');

// Unlink methods
await unlink.email();
await unlink.wallet('0x1234...');
await unlink.passkey('credential-id');
await unlink.google();
```

### Trigger Authentication Setup

```tsx
const { 
  triggerMfaSetup, 
  triggerPasskeySetup, 
  triggerEmailLink, 
  triggerWalletLink 
} = usePr0d();

// Show MFA setup popup
const handleSetupMFA = () => {
  triggerMfaSetup();
};

// Show passkey setup popup
const handleSetupPasskey = () => {
  triggerPasskeySetup();
};

// Show email linking popup
const handleLinkEmail = () => {
  triggerEmailLink();
};

// Show wallet linking popup
const handleLinkWallet = () => {
  triggerWalletLink();
};
```

## Session Management

```tsx
const { sessions, logout } = usePr0d();

// Manual session refresh
await sessions.refreshSession();

// Logout (clears all tokens)
logout();
```

## Error Handling

```tsx
const { login } = usePr0d();

try {
  await login.withEmail('user@example.com', '123456');
} catch (error) {
  if (error.response?.status === 401) {
    console.error('Invalid credentials');
  } else {
    console.error('Login failed:', error.message);
  }
}
```

## TypeScript Support

The SDK provides full TypeScript support with exported types:

```tsx
import { User, AppConfig, usePr0d } from 'pr0d-sdk';

interface CustomUser extends User {
  customField?: string;
}

const { user } = usePr0d();
const typedUser = user as CustomUser;
```

## API Reference

### usePr0d Hook

Returns an object with the following properties:

#### Authentication State
- `isAuthenticated: boolean` - Whether user is authenticated
- `user: User | null` - Current user object
- `ready: boolean` - Whether SDK is initialized
- `accessToken: string | null` - Current access token

#### Login Methods
- `login.withEmail(email: string, code: string): Promise<void>`
- `login.withGoogle(): Promise<void>`
- `login.withDiscord(): Promise<void>`
- `login.withGithub(): Promise<void>`
- `login.withX(): Promise<void>`
- `login.withPasskey(): Promise<void>`
- `login.withWallet(connector?: any): Promise<void>`
- `login.sendEmailCode(email: string): Promise<any>`

#### Link Methods
- `link.email(email: string, code: string): Promise<void>`
- `link.google(): Promise<void>`
- `link.discord(): Promise<void>`
- `link.github(): Promise<void>`
- `link.x(): Promise<void>`
- `link.passkey(): Promise<void>`
- `link.wallet(connector?: any): Promise<void>`
- `link.totp(code: string): Promise<void>`
- `link.sendEmailCode(email: string): Promise<any>`

#### Unlink Methods
- `unlink.email(): Promise<void>`
- `unlink.google(): Promise<void>`
- `unlink.discord(): Promise<void>`
- `unlink.github(): Promise<void>`
- `unlink.x(): Promise<void>`
- `unlink.passkey(credentialID: string): Promise<void>`
- `unlink.wallet(address: string): Promise<void>`
- `unlink.totp(): Promise<void>`

#### Helpers
- `helpers.isPasskeySupported: boolean`
- `helpers.isConnected: boolean`
- `helpers.address: string | undefined`
- `helpers.hasLinked(method): boolean`
- `helpers.getLinkedMethods(): string[]`
- `helpers.getAvailableLoginMethods(): string[]`
- `helpers.connectors: readonly any[]`

#### Session Management
- `sessions.refreshSession(): Promise<void>`
- `logout(): void`

#### Utilities
- `renderQRCode(element: HTMLElement, data: string): Promise<{ secret: string }>`
- `updateUser(): Promise<void>`

## Configuration

The SDK is configured at the app level through your pr0d dashboard. Available authentication methods are determined by your app configuration.

## License

MIT

