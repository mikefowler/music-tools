import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/making/music-tools',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
});
