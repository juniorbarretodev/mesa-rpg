import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lobby: resolve(__dirname, 'lobby.html'),
        master: resolve(__dirname, 'master.html'),
        player: resolve(__dirname, 'player.html')
      }
    }
  }
})
