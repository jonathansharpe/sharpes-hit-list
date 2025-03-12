import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// testing something

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// Function to get all park directories
function getParkRoutes() {
	const parksDir = path.join(__dirname, 'src/parks');
	const parkFolders = fs.readdirSync(parksDir, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);

	const routes = {};
	parkFolders.forEach(folder => {
		routes[`parks/${folder}`] = `./src/parks/${folder}/index.html`;
	});
	return routes;
}

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
				...getParkRoutes()
			}
		}
	},
})
