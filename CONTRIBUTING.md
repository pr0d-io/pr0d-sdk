# Contributing to Pr0d SDK

Thank you for your interest in contributing to the Pr0d SDK! This guide will help you get started with contributing to our project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat everyone with respect and kindness
- **Be inclusive**: Welcome newcomers and help them feel included
- **Be collaborative**: Work together towards common goals
- **Be constructive**: Provide helpful feedback and suggestions
- **Be professional**: Maintain a professional tone in all interactions

## Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- Git
- A GitHub account
- Basic knowledge of React, TypeScript, and Web3 concepts

### Finding Issues to Work On

1. **Good First Issues**: Look for issues labeled `good first issue` for beginner-friendly tasks
2. **Help Wanted**: Issues labeled `help wanted` are ready for community contributions
3. **Bug Reports**: Check issues labeled `bug` for problems that need fixing
4. **Feature Requests**: Look for `enhancement` labeled issues for new features

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/pr0d-sdk.git
cd pr0d-sdk

# Add the original repository as upstream
git remote add upstream https://github.com/pr0d/sdk.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

Create a `.env.local` file:

```env
REACT_APP_PR0D_APP_ID=your-test-app-id
REACT_APP_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```

### 4. Start Development Server

```bash
npm run dev
```

The example app will be available at `http://localhost:3000`.

### 5. Project Structure

```
pr0d-sdk/
├── src/
│   ├── lib/                 # SDK source code
│   │   ├── Pr0d.tsx        # Main SDK component
│   │   └── index.ts        # SDK exports
│   ├── examples/           # Example applications
│   │   └── App.tsx         # Demo app
│   └── ...
├── docs/                   # Documentation
├── package.json
└── README.md
```

## Making Changes

### 1. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/issue-description
```

### 2. Make Your Changes

- Follow the existing code style and patterns
- Write clear, descriptive commit messages
- Keep changes focused and atomic
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run the development server
npm run dev

# Test the example app thoroughly
# Verify all authentication flows work
# Test on different browsers if possible
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new authentication method

- Add support for new OAuth provider
- Update documentation with usage examples
- Add error handling for edge cases

Closes #123"
```

#### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add passkey authentication support
fix(wallet): resolve connection timeout issues
docs: update API reference for MFA methods
style: format code according to prettier rules
```

## Submitting Changes

### 1. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 2. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template with:
   - **Description**: What changes you made and why
   - **Testing**: How you tested the changes
   - **Screenshots**: If applicable, add screenshots
   - **Breaking Changes**: Note any breaking changes
   - **Related Issues**: Reference any related issues

### 3. PR Review Process

1. **Automated Checks**: Ensure all CI checks pass
2. **Code Review**: Address feedback from maintainers
3. **Testing**: Verify changes work as expected
4. **Documentation**: Update docs if needed
5. **Merge**: Once approved, your PR will be merged

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use strict mode settings

```typescript
// Good
interface UserData {
  id: string;
  email?: string;
  mfa?: boolean;
}

// Avoid
const userData: any = { ... };
```

### React Guidelines

- Use functional components with hooks
- Follow React best practices
- Use proper error boundaries
- Implement proper cleanup in useEffect

```typescript
// Good
const MyComponent: React.FC<Props> = ({ appId }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, []);

  return <div>...</div>;
};
```

### Code Style

- Use Prettier for code formatting
- Follow ESLint rules
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

```typescript
/**
 * Initializes MFA setup for the current user
 * @returns Promise containing the MFA secret and QR code URL
 * @throws {Error} When user is not authenticated or MFA is already enabled
 */
export const setupMFA = async (): Promise<MFASetupResult> => {
  // Implementation
};
```

## Testing

### Manual Testing

1. **Authentication Flows**: Test all login/logout scenarios
2. **MFA**: Verify setup, verification, and removal
3. **Social Providers**: Test linking/unlinking
4. **Wallets**: Test connection and signing
5. **Passkeys**: Test creation and authentication
6. **Cross-browser**: Test on Chrome, Firefox, Safari, Edge
7. **Mobile**: Test responsive design and mobile browsers

### Test Checklist

Before submitting a PR, verify:

- [ ] All authentication methods work
- [ ] Error handling works properly
- [ ] UI is responsive on mobile
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] Code follows style guidelines
- [ ] Documentation is updated

## Documentation

### When to Update Documentation

- Adding new features or methods
- Changing existing APIs
- Fixing bugs that affect usage
- Adding new examples or use cases

### Documentation Types

1. **README.md**: Overview and quick start
2. **API_REFERENCE.md**: Detailed method documentation
3. **EXAMPLES.md**: Code examples and use cases
4. **GETTING_STARTED.md**: Step-by-step setup guide
5. **CHANGELOG.md**: Version history and changes

### Documentation Style

- Use clear, concise language
- Provide code examples
- Include error handling examples
- Use proper markdown formatting
- Test all code examples

## Release Process

Releases are handled by maintainers, but contributors can help by:

1. **Testing Release Candidates**: Help test pre-release versions
2. **Documentation Updates**: Ensure docs are up to date
3. **Changelog Entries**: Help maintain the changelog
4. **Migration Guides**: Assist with migration documentation

## Getting Help

### Communication Channels

- **GitHub Issues**: For bugs, feature requests, and discussions
- **GitHub Discussions**: For questions and community discussions
- **Discord**: For real-time chat and support
- **Email**: For private or sensitive matters

### Questions?

If you have any questions about contributing:

1. Check existing issues and discussions
2. Ask in our Discord community
3. Create a new GitHub discussion
4. Email us at dev@pr0d.com

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes for significant contributions
- Special mentions in our Discord community
- Potential invitation to our contributors program

## License

By contributing to Pr0d SDK, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for contributing to Pr0d SDK! Your contributions help make Web3 authentication better for everyone. 🚀 