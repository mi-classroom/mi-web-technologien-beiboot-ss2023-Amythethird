import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  base: '/dwebtech',
  plugins: [react(), mkcert()],
  server: {
    host: "0.0.0.0",
    https: true,
  }

})