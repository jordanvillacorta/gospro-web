import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          map: ['mapbox-gl', 'react-map-gl']
        }
      },
      external: [
        '@capacitor/status-bar',
        '@capacitor/splash-screen',
        '@capacitor/camera',
        '@capacitor/geolocation',
        '@capacitor/push-notifications'
      ]
    }
  }
});