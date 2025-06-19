# Changelog

All notable changes to the Pr0d SDK will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-06-19

### Added
- 🎉 Initial release of Pr0d SDK
- 🔐 Multi-Factor Authentication (MFA) support with TOTP
- 🔗 Social provider authentication (Google, Discord, X/Twitter)
- 💳 External wallet integration with WalletConnect and injected wallets
- 🔑 Passkey authentication using WebAuthn
- 📧 Email verification and linking
- ⚡ Embedded wallet functionality with message signing and transaction creation
- 🎨 Customizable UI that adapts to your app's branding
- 🔄 Real-time authentication state management
- 📱 Mobile-responsive authentication flows
- 🌐 Cross-browser compatibility
- 🛡️ Secure session management with automatic token refresh

### Features
- **Core Authentication**
  - Login/logout functionality
  - Persistent sessions with automatic refresh
  - Protected route components
  - Authentication state hooks

- **Multi-Factor Authentication**
  - TOTP-based MFA setup with QR codes
  - MFA verification and management
  - Secret key backup and recovery

- **Social Provider Integration**
  - Google OAuth integration
  - Discord OAuth integration  
  - X (Twitter) OAuth integration
  - Provider linking and unlinking
  - Multiple provider support per user

- **Wallet Integration**
  - MetaMask and injected wallet support
  - WalletConnect v2 integration
  - Custom wallet connectors (Binance, Trust, etc.)
  - Wallet signature verification
  - Multiple wallet linking per user

- **Passkey Support**
  - WebAuthn-based passwordless authentication
  - Cross-device passkey synchronization
  - Biometric authentication support
  - Passkey management (create, list, delete)

- **Email Features**
  - Email verification with codes
  - Email linking to existing accounts
  - Multiple email support per user

- **Embedded Wallet**
  - Message signing with TEE (Trusted Execution Environment)
  - Transaction creation and management
  - Gas sponsorship capabilities
  - Pending transaction tracking
  - Multi-chain support

- **Developer Experience**
  - TypeScript support with full type definitions
  - Comprehensive React hooks API
  - Detailed error handling and messaging
  - Extensive documentation and examples
  - Source-based SDK distribution for easy debugging

### Technical Details
- Built with React 19+ and modern hooks
- TypeScript support with comprehensive type definitions
- Wagmi v2 integration for wallet functionality
- RainbowKit integration for wallet UI
- TanStack Query for efficient data fetching
- Viem for Ethereum interactions
- WebAuthn API for passkey support
- Responsive design with mobile-first approach

### Browser Support
- Chrome 88+
- Firefox 90+
- Safari 14+
- Edge 88+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 88+)

### Dependencies
- React 16.8+
- @rainbow-me/rainbowkit ^2.2.7
- @tanstack/react-query ^5.80.7
- viem ^2.31.1
- wagmi ^2.15.6

### Known Issues
- TypeScript strict mode may show warnings for read-only property assignments (will be fixed in v0.1.1)
- Some wallet connectors may require additional configuration for optimal UX

### Migration Guide
This is the initial release, so no migration is necessary.

---

## Upcoming Features (Roadmap)

### [0.2.0] - Planned
- 🔄 Automatic wallet connection restoration
- 📊 Analytics and usage tracking
- 🎨 Additional UI themes and customization options
- 🔐 Hardware wallet support (Ledger, Trezor)
- 🌍 Internationalization (i18n) support
- 📱 React Native compatibility

### [0.3.0] - Planned  
- 🏢 Enterprise features (SSO, SAML)
- 🔗 Additional social providers (GitHub, LinkedIn, Apple)
- 💼 Team and organization management
- 🔄 Advanced session management
- 📈 Advanced analytics dashboard

### [1.0.0] - Planned
- 🚀 Production-ready stable API
- 📚 Complete documentation portal
- 🧪 Comprehensive testing suite
- 🔧 Advanced configuration options
- 🎯 Performance optimizations

---

## Support

- 📚 [Documentation](https://docs.pr0d.com)
- 💬 [Discord Community](https://discord.gg/pr0d)
- 📧 [Email Support](mailto:support@pr0d.com)
- 🐛 [GitHub Issues](https://github.com/pr0d/sdk/issues)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 