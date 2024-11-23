import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let base = '/';

  if (command === 'build') {
    base = '/making/music-tools';
  }

  return {
    plugins: [react()],
    base,
  };
});
