import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': '/src', // This helps Vite resolve the @ alias to the src directory
    },
  },
  build: {
    sourcemap: true, // Enable sourcemaps for better debugging
  }
  
});
