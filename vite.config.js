import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: [
      'xdial-networks-frontend.onrender.com',
      'xdialnetworks.com',
      '.onrender.com',
      'localhost'
    ]
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: [
      'xdial-networks-frontend.onrender.com',
      'xdialnetworks.com',
      '.onrender.com',
      'localhost'
    ]
  }
})