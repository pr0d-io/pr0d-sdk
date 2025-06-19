# Pr0d SDK Development Guide

## Project Structure

```
pr0d-sdk/
├── src/
│   ├── lib/                    # SDK Source Code
│   │   ├── index.ts           # Main SDK exports
│   │   └── Pr0d.tsx           # Core SDK component
│   ├── examples/              # Example Applications
│   │   ├── App.tsx           # Demo app using the SDK
│   │   └── App.css           # Demo app styles
│   ├── index.tsx             # Development entry point
│   ├── index.css             # Global styles
│   ├── wagmi.ts              # Wagmi configuration
│   └── reportWebVitals.ts    # Performance monitoring
├── dist/                      # Built SDK (generated)
├── package.json              # Package configuration
├── vite.config.ts            # Development build config
├── vite.lib.config.ts        # SDK library build config
├── tsconfig.json             # TypeScript configuration
└── README.md                 # SDK documentation
```

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

This starts the Vite development server with the example app (`src/examples/App.tsx`) which demonstrates SDK usage.

### Building the SDK

#### Library Build (for npm publishing)
```bash
npm run build:lib
```

This creates the publishable SDK in the `dist/` directory using `vite.lib.config.ts`.

#### Example App Build
```bash
npm run build:example
```

This builds the demo application using `vite.config.ts`.

#### Build Everything
```bash
npm run build
```

Runs both library and example builds.

### Adding New SDK Features

1. **Core SDK Logic**: Add to `src/lib/Pr0d.tsx`
2. **New Exports**: Update `src/lib/index.ts`
3. **Test Changes**: Use the example app in `src/examples/App.tsx`
4. **Documentation**: Update `README.md`

### Testing SDK Changes

The example app in `src/examples/App.tsx` serves as both a demo and a test environment. It imports the SDK from `../lib` and demonstrates all major features:

- Authentication flows
- Wallet connections
- MFA setup
- Social account linking
- Passkey management
- Transaction handling

### Adding New Examples

Create additional example applications in the `src/examples/` directory:

```
src/examples/
├── App.tsx              # Main demo app
├── SimpleAuth.tsx       # Simple auth example
├── WalletOnly.tsx       # Wallet-focused example
└── EnterpiseApp.tsx     # Complex use case
```

Update `src/index.tsx` to switch between examples during development.

## SDK Architecture

### Core Component: `Pr0d.tsx`

The main SDK component provides:
- Authentication context
- Popup management
- API integration
- State management
- UI components

### Hook: `usePr0d()`

Exported from the context to provide:
- Authentication state
- API methods
- Event handlers

### Export Structure: `lib/index.ts`

```typescript
// Named exports for tree-shaking
export const Pr0d = Pr0dComponent;
export const usePr0d = usePr0dHook;

// Default export for convenience
export { default } from './Pr0d';
```

## Build Configuration

### Library Build (`vite.lib.config.ts`)

- **Entry**: `src/lib/index.ts`
- **Formats**: ES modules and CommonJS
- **Externals**: React, wagmi, and other peer dependencies
- **Output**: `dist/` directory ready for npm publishing

### Development Build (`vite.config.ts`)

- **Entry**: `src/index.tsx` (loads example app)
- **Dev Server**: Port 3000
- **Hot Reload**: Full React development experience

## Publishing Workflow

1. **Build the SDK**: `npm run build:lib`
2. **Test**: Verify `dist/` contains correct files
3. **Version**: Update version in `package.json`
4. **Publish**: `npm publish` (runs `build:lib` automatically)

## Common Development Tasks

### Adding New Authentication Method

1. Add method to `AuthContextType` interface
2. Implement in main `Pr0d` component
3. Export from `usePr0d()` hook
4. Update `lib/index.ts` exports
5. Add example usage to demo app
6. Document in README.md

### Debugging Issues

- **Build Issues**: Check TypeScript errors and imports
- **Runtime Issues**: Use browser dev tools with source maps
- **Integration Issues**: Test with the example app
- **Bundle Issues**: Check `vite.lib.config.ts` externals

### Code Organization

- **Keep SDK logic in `lib/`**: Don't mix example code with SDK code
- **Use TypeScript**: Strong typing helps with API design
- **Export consistently**: Follow the established export pattern
- **Document changes**: Update README and examples 