# Wallet Signing with Wallet Name Tracking

This example shows how to sign messages and transactions while tracking which wallet is being used.

## Basic Message Signing

```jsx
import React, { useState } from 'react';
import { usePr0d } from '@pr0d/sdk';

function WalletSigningExample() {
  const { signMessageWithWallet, isAuthenticated } = usePr0d();
  const [message, setMessage] = useState('Hello, Web3!');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignMessage = async () => {
    if (!isAuthenticated) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const signatureData = await signMessageWithWallet(message);
      setResult(signatureData);
      console.log('Signed with wallet:', signatureData.type);
      console.log('Signature:', signatureData.signature);
      console.log('Address:', signatureData.address);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Message with Wallet</h2>
      
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to sign"
          rows={3}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        
        <button 
          onClick={handleSignMessage} 
          disabled={loading || !isAuthenticated}
        >
          {loading ? 'Signing...' : 'Sign Message'}
        </button>
      </div>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      
      {result && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Signature Result:</h3>
          <p><strong>Wallet:</strong> {result.type}</p>
          <p><strong>Address:</strong> {result.address}</p>
          <p><strong>Signature:</strong> {result.signature}</p>
        </div>
      )}
    </div>
  );
}

export default WalletSigningExample;
```

## Custom Transaction Signing

```jsx
import React, { useState } from 'react';
import { usePr0d } from '@pr0d/sdk';

function TransactionSigningExample() {
  const { signMessageWithWallet, isAuthenticated } = usePr0d();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignTransaction = async () => {
    if (!isAuthenticated) {
      setError('Please connect your wallet first');
      return;
    }

    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create a transaction message
      const transactionMessage = `Transfer ${amount} ETH to ${recipient} at ${new Date().toISOString()}`;
      
      const signatureData = await signMessageWithWallet(transactionMessage);
      
      // You can now send this signature to your backend along with the wallet info
      const transactionData = {
        signature: signatureData.signature,
        type: signatureData.type,
        address: signatureData.address,
        message: signatureData.message,
        recipient,
        amount,
        timestamp: new Date().toISOString()
      };

      // Send to your backend
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData)
      });

      if (response.ok) {
        setResult(transactionData);
        console.log('Transaction signed with wallet:', signatureData.type);
      } else {
        throw new Error('Failed to submit transaction');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign Transaction with Wallet</h2>
      
      <div>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient address"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (ETH)"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        
        <button 
          onClick={handleSignTransaction} 
          disabled={loading || !isAuthenticated}
        >
          {loading ? 'Signing Transaction...' : 'Sign Transaction'}
        </button>
      </div>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      
      {result && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Transaction Signed:</h3>
          <p><strong>Wallet:</strong> {result.type}</p>
          <p><strong>From:</strong> {result.address}</p>
          <p><strong>To:</strong> {result.recipient}</p>
          <p><strong>Amount:</strong> {result.amount} ETH</p>
          <p><strong>Signature:</strong> {result.signature}</p>
        </div>
      )}
    </div>
  );
}

export default TransactionSigningExample;
```

## Backend Integration

When you receive the signature on your backend, you'll have access to the wallet name:

```javascript
// Example backend endpoint
app.post('/api/transactions', async (req, res) => {
  const { 
    signature, 
    type, 
    address, 
    message, 
    recipient, 
    amount, 
    timestamp 
  } = req.body;

  // Verify the signature
  const recoveredAddress = ethers.verifyMessage(message, signature);
  
  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Store transaction with wallet information
  const transaction = {
    signature,
    type, // "MetaMask", "WalletConnect", "Binance Wallet", etc.
    address,
    message,
    recipient,
    amount,
    timestamp,
    status: 'pending'
  };

  // Save to database
  await db.transactions.create(transaction);

  res.json({ 
    success: true, 
    transactionId: transaction.id,
    walletUsed: type 
  });
});
```

## Available Wallet Types

The SDK will automatically detect and provide wallet types like:

- **MetaMask** - For MetaMask browser extension
- **WalletConnect** - For WalletConnect protocol wallets
- **Binance Wallet** - For Binance Wallet
- **Trust Wallet** - For Trust Wallet
- **Coinbase Wallet** - For Coinbase Wallet
- **external** - For wallets that don't provide a specific name

## Benefits

1. **Analytics**: Track which wallets your users prefer
2. **Support**: Better customer support with wallet-specific troubleshooting
3. **Security**: Log which wallet was used for each transaction
4. **UX**: Provide wallet-specific instructions or features
5. **Compliance**: Maintain audit trails with wallet information 