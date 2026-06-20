import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        about:    resolve(__dirname, 'about.html'),
        rooms:    resolve(__dirname, 'rooms.html'),
        contact:  resolve(__dirname, 'contact.html'),
        gallery:  resolve(__dirname, 'gallery.html'),
        services: resolve(__dirname, 'services.html'),
        booking:  resolve(__dirname, 'booking.html'),
      }
    }
  }
})