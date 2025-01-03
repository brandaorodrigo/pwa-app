import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
    base: '/',
    build: {
        assetsDir: './',
        chunkSizeWarningLimit: 5000,
        outDir: './dist',
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
            },
        },
    },
    plugins: [
        react(),
        checker({
            biome: {
                command: 'check',
            },
            typescript: true,
        }),
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: '/src',
            },
        ],
    },
    server: {
        port: 3000,
    },
});
