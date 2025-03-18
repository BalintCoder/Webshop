import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    strictPort: true, 
    port: 5173, 
    proxy: {
      '/api': {
        target: 'http://webshop-backend:8080', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});