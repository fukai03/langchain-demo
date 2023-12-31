import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      'constants': '/src/constants',
    }
  },
  server: {
    port: 5001,
    proxy: {
      '/ai': {
        target: 'https://aip.baidubce.com/',
        rewrite: (path) => path.replace(/^\/ai/, ''),
        changeOrigin: true,
      },
      '/express': {
        target: 'http://localhost:5003/',
        rewrite: (path) => path.replace(/^\/express/, ''),
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
      }
    }
  }
})
