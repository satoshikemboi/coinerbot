import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Ensure this is set for absolute paths
  plugins: [
    tailwindcss(),
  ],
})