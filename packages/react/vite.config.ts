import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'RetellPlayer',
      formats: ['es'],
		  fileName: () => `retell-player.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  },
})
