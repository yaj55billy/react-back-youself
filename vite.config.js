import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: import.meta.env.VITE_BASE_PATH || '/', // 從環境變數中讀取 BASE_PATH
  plugins: [react()],
});
