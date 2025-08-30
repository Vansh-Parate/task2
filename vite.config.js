import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React development
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
