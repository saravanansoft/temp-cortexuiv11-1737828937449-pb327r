import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/linkedin/api': {
        target: 'https://api.linkedin.com/v2/userinfo', // Corrected LinkedIn API base URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/linkedin\/api/, ''),
      } 
    }
  },
})
