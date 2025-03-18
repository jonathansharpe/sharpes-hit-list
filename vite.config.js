import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
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
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		root,
		plugins: [
			react(),
			{
				name: 'markdown-loader',
				transform(code, id) {
					if (id.endsWith('.md')) {
						return {
							code: `export default ${JSON.stringify(code)}`,
							map: null
						};
					}
				}
			}
		],
		resolve: {
			alias: {
				src: "/src",
				images: "/src/images",
				gameLogs: "/src/game-logs"
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
					target: env.VITE_API_BASEURL,
					changeOrigin: true,
					secure: false,
					ws: true,
					rewrite: (path) => path,
					configure: (proxy, options) => {
						proxy.on('error', (err, req, res) => {
							console.log('proxy error', err);
						});
						proxy.on('proxyReq', (proxyReq, req, res) => {
							console.log('Sending Request to the Target:', req.method, req.url);
						});
						proxy.on('proxyRes', (proxyRes, req, res) => {
							console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
						});
					}
				}
			}
		},
		define: {
			'import.meta.env.VITE_API_BASEURL': JSON.stringify(env.VITE_API_BASEURL || 'https://localhost:3000')
		}
	};
});
