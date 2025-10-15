import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.recaptcha.net blob:",
        "script-src-elem 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com blob:",
        "worker-src 'self' blob: https://www.google.com",
        "frame-src 'self' https://www.google.com https://www.recaptcha.net https://recaptcha.google.com",
        "style-src 'self' 'unsafe-inline' https://www.gstatic.com",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        "connect-src 'self' https://www.google.com https://www.gstatic.com https://api.emailjs.com"
      ].join('; ')
    }
  }
})
