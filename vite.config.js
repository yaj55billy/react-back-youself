import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const basePath = mode === 'development' ? '/' : (import.meta.env.VITE_BASE_PATH || '/');

  return {
    base: basePath, 
    plugins: [react()],
  };
});