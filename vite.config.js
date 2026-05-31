import { defineConfig } from 'vite';

export default defineConfig({
  // Crucial for GitHub Pages: Ensures assets are linked relatively rather than from absolute root
  base: './', 
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Cleaned up manualChunks since we are running a streamlined 2D HTML5 Canvas engine now
  },
  
  server: {
    port: 3000,
    open: true
  }
});