import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'Pr0dSDK',
      fileName: (format) => `pr0d-sdk.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'axios',
        'wagmi',
        'viem',
        '@mui/material',
        '@mui/icons-material',
        '@rainbow-me/rainbowkit',
        '@tanstack/react-query',
        '@simplewebauthn/browser',
        'jwt-decode',
        'qr-code-styling',
        '@fingerprintjs/fingerprintjs'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          axios: 'axios',
          wagmi: 'wagmi',
          viem: 'viem'
        },
        inlineDynamicImports: true
      }
    },
    outDir: 'dist'
  },
  server: {
    port: 3001,
    open: true,
    allowedHosts: ['test.pr0d.io']
  }
}) 