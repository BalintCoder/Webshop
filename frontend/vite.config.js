import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5195', // Backend szerver URL-je
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // API prefix eltávolítása
      },
    },
  },
});
