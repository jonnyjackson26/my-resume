import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true,  // Ensures the error overlay shows up in the browser on error
    },
    watch: {
      usePolling: true,  // Enable polling for file changes (can help with certain environments)
    },
  },
})
