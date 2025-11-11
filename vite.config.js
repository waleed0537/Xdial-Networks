import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Enable gzip compression for assets
    viteCompression({ algorithm: 'gzip' }),
    // Optionally add Brotli compression
    viteCompression({ algorithm: 'brotliCompress' })
  ],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: [
      'xdial-networks-frontend.onrender.com',
      'xdialnetworks.com',
      '.onrender.com',
      'localhost',
      'www.xdialnetworks.com'
    ]
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: [
      'xdial-networks-frontend.onrender.com',
      'xdialnetworks.com',
      '.onrender.com',
      'localhost',
      'www.xdialnetworks.com'
    ]
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false, // Remove sourcemaps for production
    minify: 'esbuild', // Faster minification
    cssCodeSplit: true, // Split CSS for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
