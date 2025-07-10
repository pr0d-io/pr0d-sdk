import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()] as any,
    root: __dirname,
    resolve: {
        alias: {
            'pr0d-sdk': path.resolve(__dirname, '../src'),
        },
    },
});