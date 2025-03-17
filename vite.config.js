import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// testing something

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// Function to get base routes (index.html and direct subdirectories of src)
function getBaseRoutes() {
	const srcDir = path.join(__dirname, 'src');
	const routes = {
		"index.html": "./src/index.html" // Always include the main index.html
	};

	// Add routes for direct subdirectories that contain index.html
	fs.readdirSync(srcDir, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.forEach(dirent => {
			const indexPath = path.join(srcDir, dirent.name, 'index.html');
			if (fs.existsSync(indexPath)) {
				routes[dirent.name] = `./src/${dirent.name}/index.html`;
			}
		});

	return routes;
}

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
				...getBaseRoutes(),
				...getParkRoutes()
			}
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://localhost:3000',
				changeOrigin: true,
				secure: false,
				ws: true
			}
		}
	}
})
