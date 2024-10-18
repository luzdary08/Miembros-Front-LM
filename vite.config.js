import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins:
    [react()],
  build: {
    minify:
      'esbuild', // Use esbuild for minification
    sourcemap: false, // Disable sourcemaps in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lodash'], // Group common dependencies
        },
      },
    },
  },
});
