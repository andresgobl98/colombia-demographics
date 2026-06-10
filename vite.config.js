import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Honor the PORT env var when set (e.g. assigned by tooling); default to 5173.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
