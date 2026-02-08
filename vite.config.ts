import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      features: path.resolve(__dirname, './src/features'),
      hooks: path.resolve(__dirname, './src/hooks'),
      lib: path.resolve(__dirname, './src/lib'),
      utils: path.resolve(__dirname, './src/utils'),
      locales: path.resolve(__dirname, './src/locales'),
    },
  },
});
