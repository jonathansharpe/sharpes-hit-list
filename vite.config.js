import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// testing something

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const parksDir = resolve(__dirname, 'src/parks');

// Dynamically find all park directories
const parkRoutes = fs.readdirSync(parksDir, { withFileTypes: true })
	.filter(dirent => dirent.isDirectory())
	.reduce((acc, dirent) => {
		const parkName = dirent.name;
		acc[`parks/${parkName}`] = `./src/parks/${parkName}/index.html`;
		return acc;
	}, {});

// https://vitejs.dev/config/
export default defineConfig({
	root,
	plugins: [react()],
	resolve: {
		alias: {
			src: "/src",
		}
	},
	build: {
		outDir,
		emptyOutDir: true,
		sourcemap: true,
		rollupOptions: {
			input: {
				"games": "./src/games/index.html",
				"index.html": "./src/index.html",
				...parkRoutes
			}
		}
	},
})
