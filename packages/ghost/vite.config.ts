import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [
  ],
	build: {
		lib: {
		  entry: path.resolve(__dirname, 'src/index.ts'),
		  name: 'Ghost',
      formats: ['umd'],
		  fileName: () => 'ghost-helper.js'
		},
	}
})
