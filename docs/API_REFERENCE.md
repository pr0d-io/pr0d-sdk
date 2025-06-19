# Pr0d SDK API Reference

## Table of Contents
- [Core Components](#core-components)
- [Hooks](#hooks)
- [Interfaces](#interfaces)
- [Methods](#methods)
- [Error Handling](#error-handling)

## Core Components

### `<Pr0d>`

The main provider component that wraps your application.

```jsx
<Pr0d appId="your-app-id">
  {children}
</Pr0d>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `appId` | `string` | ✅ | Your unique application ID from Pr0d dashboard |
| `children` | `React.ReactNode` | ✅ | Your application components |

## Hooks

### `usePr0d()`

The primary hook for accessing all Pr0d functionality.

```typescript
const pr0d = usePr0d();
```

Returns an object with all authentication methods and state.

## Interfaces

### `User`

```typescript
interface User {
  _id: string;
  email?: { email: string };
  mfa?: { secret: string };
  [key: string]: any;
}
```

### `AppConfig`

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

### `AuthContextType`

```typescript
interface AuthContextType {
  // State
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  
  // Core Authentication
  logout: () => void;
  login: () => void;
  
  // MFA
  triggerMfaSetup: () => void;
  setupMFA: () => Promise<{ secret: string; qrCodeUrl: string }>;
  verifyMFA: (code: string) => Promise<boolean>;
  deleteMFA: () => Promise<void>;
  
  // Email Linking
  triggerEmailLink: () => void;
  initEmailLink: (email: string) => Promise<void>;
  linkEmail: (email: string, code: string) => Promise<boolean>;
  
  // Social Provider Linking
  triggerProviderLink: () => void;
  linkProvider: (provider: 'google' | 'discord' | 'x') => Promise<void>;
  unlinkProvider: (provider: 'google' | 'discord' | 'x') => Promise<void>;
  linkGoogle: () => Promise<void>;
  linkDiscord: () => Promise<void>;
  linkX: () => Promise<void>;
  
  // Wallet Integration
  triggerWalletLink: () => void;
  linkWallet: (signature: string, nonce: string) => Promise<boolean>;
  unlinkWallet: (address: string) => Promise<void>;
  
  // Passkeys
  triggerPasskeySetup: () => void;
  initPasskey: (userHandle?: string) => Promise<{ options: any; type: 'registration' | 'authentication' }>;
  verifyPasskey: (credential: any) => Promise<{ type: 'registration' | 'authentication'; user?: User; accessToken?: string; refreshToken?: string; message: string }>;
  listPasskeys: () => Promise<{ passkeys: any[]; count: number }>;
  deletePasskey: (credentialId: string) => Promise<void>;
  
  // User Management
  getUser: (token?: string) => Promise<User>;
  
  // Embedded Wallet
  teeSignMessage: (message: string) => Promise<{ signature: string; address: string; message: string }>;
  createTransaction: (txData: TransactionData) => Promise<{ transactionId: string; userAddress: string; txData: any; expiresAt: string }>;
  getTransaction: (transactionId: string) => Promise<{ transactionId: string; userAddress: string; txData: any; status: string; createdAt: string; sponsorTxHash?: string }>;
  sponsorTransaction: (transactionId: string, sponsorPrivateKey: string, rpcUrl: string, nonce?: number) => Promise<{ txHash: string; sponsorAddress: string; status: string; transactionId: string }>;
  getPendingTransactions: () => Promise<{ transactions: any[]; count: number }>;
}
```

### `TransactionData`

```typescript
interface TransactionData {
  to: string;
  value?: string;
  data?: string;
  gasLimit?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  chainId: number;
}
```

## Methods

### Authentication Methods

#### `login()`

Triggers the authentication modal.

```typescript
const { login } = usePr0d();

// Usage
login();
```

#### `logout()`

Logs out the current user and clears all session data.

```typescript
const { logout } = usePr0d();

// Usage
logout();
```

### Multi-Factor Authentication

#### `triggerMfaSetup()`

Opens the MFA setup modal.

```typescript
const { triggerMfaSetup } = usePr0d();

// Usage
triggerMfaSetup();
```

#### `setupMFA()`

Programmatically sets up MFA for the current user.

```typescript
const { setupMFA } = usePr0d();

// Usage
const setupMfa = async () => {
  try {
    const { secret, qrCodeUrl } = await setupMFA();
    console.log('MFA Secret:', secret);
    console.log('QR Code URL:', qrCodeUrl);
  } catch (error) {
    console.error('MFA setup failed:', error);
  }
};
```

**Returns:**
- `secret` (string): The TOTP secret key
- `qrCodeUrl` (string): QR code URL for authenticator apps

#### `verifyMFA(code)`

Verifies an MFA code.

```typescript
const { verifyMFA } = usePr0d();

// Usage
const verify = async (code: string) => {
  try {
    const isValid = await verifyMFA(code);
    if (isValid) {
      console.log('MFA verified successfully');
    }
  } catch (error) {
    console.error('MFA verification failed:', error);
  }
};
```

**Parameters:**
- `code` (string): 6-digit TOTP code

**Returns:**
- `boolean`: Whether the code is valid

#### `deleteMFA()`

Removes MFA from the current user's account.

```typescript
const { deleteMFA } = usePr0d();

// Usage
const removeMfa = async () => {
  try {
    await deleteMFA();
    console.log('MFA removed successfully');
  } catch (error) {
    console.error('MFA removal failed:', error);
  }
};
```

### Email Linking

#### `triggerEmailLink()`

Opens the email linking modal.

```typescript
const { triggerEmailLink } = usePr0d();

// Usage
triggerEmailLink();
```

#### `initEmailLink(email)`

Initiates email linking process by sending a verification code.

```typescript
const { initEmailLink } = usePr0d();

// Usage
const initEmail = async (email: string) => {
  try {
    await initEmailLink(email);
    console.log('Verification code sent');
  } catch (error) {
    console.error('Email init failed:', error);
  }
};
```

**Parameters:**
- `email` (string): Email address to link

#### `linkEmail(email, code)`

Links an email address using the verification code.

```typescript
const { linkEmail } = usePr0d();

// Usage
const linkUserEmail = async (email: string, code: string) => {
  try {
    const success = await linkEmail(email, code);
    if (success) {
      console.log('Email linked successfully');
    }
  } catch (error) {
    console.error('Email linking failed:', error);
  }
};
```

**Parameters:**
- `email` (string): Email address to link
- `code` (string): 6-digit verification code

**Returns:**
- `boolean`: Whether linking was successful

### Social Provider Linking

#### `triggerProviderLink()`

Opens the social provider linking modal.

```typescript
const { triggerProviderLink } = usePr0d();

// Usage
triggerProviderLink();
```

#### `linkProvider(provider)`

Links a social media account.

```typescript
const { linkProvider } = usePr0d();

// Usage
const linkSocial = async (provider: 'google' | 'discord' | 'x') => {
  try {
    await linkProvider(provider);
    console.log(`${provider} linked successfully`);
  } catch (error) {
    console.error(`${provider} linking failed:`, error);
  }
};
```

**Parameters:**
- `provider` ('google' | 'discord' | 'x'): Social provider to link

#### `unlinkProvider(provider)`

Unlinks a social media account.

```typescript
const { unlinkProvider } = usePr0d();

// Usage
const unlinkSocial = async (provider: 'google' | 'discord' | 'x') => {
  try {
    await unlinkProvider(provider);
    console.log(`${provider} unlinked successfully`);
  } catch (error) {
    console.error(`${provider} unlinking failed:`, error);
  }
};
```

**Parameters:**
- `provider` ('google' | 'discord' | 'x'): Social provider to unlink

#### `linkGoogle()`, `linkDiscord()`, `linkX()`

Convenience methods for linking specific providers.

```typescript
const { linkGoogle, linkDiscord, linkX } = usePr0d();

// Usage
await linkGoogle();
await linkDiscord();
await linkX();
```

### Wallet Integration

#### `triggerWalletLink()`

Opens the wallet linking modal.

```typescript
const { triggerWalletLink } = usePr0d();

// Usage
triggerWalletLink();
```

#### `linkWallet(signature, nonce)`

Links an external wallet using a signature.

```typescript
const { linkWallet } = usePr0d();

// Usage
const linkExternalWallet = async (signature: string, nonce: string) => {
  try {
    const success = await linkWallet(signature, nonce);
    if (success) {
      console.log('Wallet linked successfully');
    }
  } catch (error) {
    console.error('Wallet linking failed:', error);
  }
};
```

**Parameters:**
- `signature` (string): Wallet signature
- `nonce` (string): Authentication nonce

**Returns:**
- `boolean`: Whether linking was successful

#### `unlinkWallet(address)`

Unlinks a wallet address.

```typescript
const { unlinkWallet } = usePr0d();

// Usage
const unlinkExternalWallet = async (address: string) => {
  try {
    await unlinkWallet(address);
    console.log('Wallet unlinked successfully');
  } catch (error) {
    console.error('Wallet unlinking failed:', error);
  }
};
```

**Parameters:**
- `address` (string): Wallet address to unlink

### Passkey Authentication

#### `triggerPasskeySetup()`

Opens the passkey setup modal.

```typescript
const { triggerPasskeySetup } = usePr0d();

// Usage
triggerPasskeySetup();
```

#### `initPasskey(userHandle?)`

Initiates passkey creation or authentication.

```typescript
const { initPasskey } = usePr0d();

// Usage
const createPasskey = async (userHandle?: string) => {
  try {
    const { options, type } = await initPasskey(userHandle);
    
    if (type === 'registration') {
      // Create new passkey
      const credential = await navigator.credentials.create({
        publicKey: options
      });
      // Continue with verifyPasskey...
    } else {
      // Authenticate with existing passkey
      const credential = await navigator.credentials.get({
        publicKey: options
      });
      // Continue with verifyPasskey...
    }
  } catch (error) {
    console.error('Passkey init failed:', error);
  }
};
```

**Parameters:**
- `userHandle` (string, optional): User handle for passkey

**Returns:**
- `options` (any): WebAuthn options
- `type` ('registration' | 'authentication'): Operation type

#### `verifyPasskey(credential)`

Verifies a passkey credential.

```typescript
const { verifyPasskey } = usePr0d();

// Usage
const verifyCredential = async (credential: any) => {
  try {
    const result = await verifyPasskey(credential);
    console.log('Passkey result:', result);
  } catch (error) {
    console.error('Passkey verification failed:', error);
  }
};
```

**Parameters:**
- `credential` (any): WebAuthn credential

**Returns:**
- `type` ('registration' | 'authentication'): Operation type
- `user` (User, optional): User object if authentication
- `accessToken` (string, optional): Access token if authentication
- `refreshToken` (string, optional): Refresh token if authentication
- `message` (string): Result message

#### `listPasskeys()`

Lists all passkeys for the current user.

```typescript
const { listPasskeys } = usePr0d();

// Usage
const getPasskeys = async () => {
  try {
    const { passkeys, count } = await listPasskeys();
    console.log(`Found ${count} passkeys:`, passkeys);
  } catch (error) {
    console.error('Failed to list passkeys:', error);
  }
};
```

**Returns:**
- `passkeys` (any[]): Array of passkey objects
- `count` (number): Total number of passkeys

#### `deletePasskey(credentialId)`

Deletes a specific passkey.

```typescript
const { deletePasskey } = usePr0d();

// Usage
const removePasskey = async (credentialId: string) => {
  try {
    await deletePasskey(credentialId);
    console.log('Passkey deleted successfully');
  } catch (error) {
    console.error('Passkey deletion failed:', error);
  }
};
```

**Parameters:**
- `credentialId` (string): Passkey credential ID

### User Management

#### `getUser(token?)`

Retrieves user information.

```typescript
const { getUser } = usePr0d();

// Usage
const fetchUser = async (token?: string) => {
  try {
    const user = await getUser(token);
    console.log('User:', user);
  } catch (error) {
    console.error('Failed to get user:', error);
  }
};
```

**Parameters:**
- `token` (string, optional): Access token (uses current if not provided)

**Returns:**
- `User`: User object

### Embedded Wallet

#### `teeSignMessage(message)`

Signs a message using the embedded wallet.

```typescript
const { teeSignMessage } = usePr0d();

// Usage
const signMessage = async (message: string) => {
  try {
    const result = await teeSignMessage(message);
    console.log('Signature:', result.signature);
    console.log('Address:', result.address);
  } catch (error) {
    console.error('Message signing failed:', error);
  }
};
```

**Parameters:**
- `message` (string): Message to sign

**Returns:**
- `signature` (string): Message signature
- `address` (string): Wallet address
- `message` (string): Original message

#### `createTransaction(txData)`

Creates a transaction for signing.

```typescript
const { createTransaction } = usePr0d();

// Usage
const createTx = async () => {
  try {
    const txData = {
      to: '0x742d35Cc6634C0532925a3b8D7389d7B0F8C2d6e',
      value: '0.01',
      chainId: 1
    };
    
    const result = await createTransaction(txData);
    console.log('Transaction ID:', result.transactionId);
  } catch (error) {
    console.error('Transaction creation failed:', error);
  }
};
```

**Parameters:**
- `txData` (TransactionData): Transaction data

**Returns:**
- `transactionId` (string): Unique transaction ID
- `userAddress` (string): User's wallet address
- `txData` (any): Transaction data
- `expiresAt` (string): Expiration timestamp

#### `getTransaction(transactionId)`

Retrieves transaction details.

```typescript
const { getTransaction } = usePr0d();

// Usage
const fetchTransaction = async (transactionId: string) => {
  try {
    const tx = await getTransaction(transactionId);
    console.log('Transaction status:', tx.status);
  } catch (error) {
    console.error('Failed to get transaction:', error);
  }
};
```

**Parameters:**
- `transactionId` (string): Transaction ID

**Returns:**
- `transactionId` (string): Transaction ID
- `userAddress` (string): User's wallet address
- `txData` (any): Transaction data
- `status` (string): Transaction status
- `createdAt` (string): Creation timestamp
- `sponsorTxHash` (string, optional): Sponsor transaction hash

#### `sponsorTransaction(transactionId, sponsorPrivateKey, rpcUrl, nonce?)`

Sponsors a transaction (pays gas fees).

```typescript
const { sponsorTransaction } = usePr0d();

// Usage
const sponsorTx = async (
  transactionId: string,
  sponsorPrivateKey: string,
  rpcUrl: string,
  nonce?: number
) => {
  try {
    const result = await sponsorTransaction(
      transactionId,
      sponsorPrivateKey,
      rpcUrl,
      nonce
    );
    console.log('Transaction hash:', result.txHash);
  } catch (error) {
    console.error('Transaction sponsoring failed:', error);
  }
};
```

**Parameters:**
- `transactionId` (string): Transaction ID to sponsor
- `sponsorPrivateKey` (string): Sponsor's private key
- `rpcUrl` (string): RPC URL for the network
- `nonce` (number, optional): Transaction nonce

**Returns:**
- `txHash` (string): Transaction hash
- `sponsorAddress` (string): Sponsor's address
- `status` (string): Transaction status
- `transactionId` (string): Original transaction ID

#### `getPendingTransactions()`

Lists all pending transactions for the user.

```typescript
const { getPendingTransactions } = usePr0d();

// Usage
const fetchPendingTxs = async () => {
  try {
    const { transactions, count } = await getPendingTransactions();
    console.log(`${count} pending transactions:`, transactions);
  } catch (error) {
    console.error('Failed to get pending transactions:', error);
  }
};
```

**Returns:**
- `transactions` (any[]): Array of pending transactions
- `count` (number): Total number of pending transactions

## Error Handling

All async methods can throw errors. It's recommended to wrap them in try-catch blocks:

```typescript
const { setupMFA } = usePr0d();

const handleSetupMFA = async () => {
  try {
    const result = await setupMFA();
    // Handle success
  } catch (error) {
    // Handle error
    console.error('MFA setup failed:', error);
    
    if (error.response?.status === 401) {
      // Handle unauthorized
    } else if (error.response?.status === 400) {
      // Handle bad request
    } else {
      // Handle other errors
    }
  }
};
```

Common error types:
- **401 Unauthorized**: User not authenticated
- **400 Bad Request**: Invalid parameters
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

For network errors, check `error.message` for details. 