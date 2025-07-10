import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cgpa/', // 👈 This is very important
  plugins: [react()],
})
