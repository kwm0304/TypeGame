import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import mkcert from "vite-plugin-mkcert"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    proxy: {
      "^/api": {
        target: "http://localhost:5214",
        changeOrigin: true,
        secure: false,
      },
      "^/versus": {
        target: "http://localhost:5214",
        changeOrigin: true,
        ws: true, // Enable websocket proxying
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})