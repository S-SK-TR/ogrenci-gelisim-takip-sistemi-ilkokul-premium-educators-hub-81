import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

interface ManifestOptions {
  name: string;
  short_name: string;
  description: string;
  theme_color: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
  }>;
}

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Öğrenci Gelişim Takip Sistemi (İlkokul) - Premium Educators Hub',
        short_name: 'Öğrenci Gelişim Takip Sistemi (İlkokul)',
        description: 'Premium PWA Experience',
        theme_color: '#000000',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      } as ManifestOptions
    })
  ],
});
