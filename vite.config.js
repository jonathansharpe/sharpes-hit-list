import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		sourcemap: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				parks: resolve(__dirname, 'parks/index.html'),
			}
		}
	},
})
