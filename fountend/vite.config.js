import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // เวลาที่ build จริง (ISO string) — Vercel จะรันคำสั่งนี้ใหม่ทุกครั้งที่ deploy
    // จึงได้ค่าล่าสุดของ build นั้น ๆ เสมอ ไม่ต้องแก้มือ
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
})
