import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    },
    extensions: ['.ts', '.vue', '.js']
  },
  server: {
    proxy: {
      target: 'http://localhost:3003',
      rewrite: (path: string) => path.replace(/^\/api/, '')
    }
  }
})
