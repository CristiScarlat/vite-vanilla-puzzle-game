import { resolve } from 'path'

export default {
  // config options
  base: "/vite-vanilla-puzzle-game/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        help: resolve(__dirname, 'help.html'),
      },
    },
  },
}