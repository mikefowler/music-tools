import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
  },
  base: '/making/music-tools',
  publicDir: 'public',
  plugins: [react()],
});
