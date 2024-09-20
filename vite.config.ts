import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/making/music',
  build: {
    outDir: 'dist/making/music-tools',
  },
  plugins: [react()],
});
