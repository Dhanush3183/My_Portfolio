import { defineConfig } from 'vite';

export default defineConfig({
  // Ensures all asset paths are built relative to your GitHub Pages subfolder
  base: './', 
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      // CRUCIAL: Tells Vite to compile BOTH pages and their respective assets
      input: {
        main: 'index.html',
        game: 'game.html'
      }
    }
  },
  
  server: {
    port: 3000,
    open: true
  }
});