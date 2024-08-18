// vite.config.js
import { defineConfig } from'vite';
import react from'@vitejs/plugin-react';
import path from'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'client/api'),
      '@components': path.resolve(__dirname, 'client/components'),
      '@': path.resolve(__dirname, 'client'), // O alias más general
    },
  },
});
