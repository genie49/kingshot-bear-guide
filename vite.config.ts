/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    // Railway 등 어떤 도메인에서도 정적 빌드를 서빙할 수 있게 허용
    allowedHosts: true,
  },
  test: {
    environment: 'jsdom',
  },
})
