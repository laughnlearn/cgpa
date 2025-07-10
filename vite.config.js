import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cgpa/', // 👈 matches your repo name exactly
  plugins: [react()],
})
