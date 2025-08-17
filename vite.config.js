import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/fresh-cart/',  // أضف هذا السطر
  plugins: [react()],
})
