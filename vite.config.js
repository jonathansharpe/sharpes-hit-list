import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Define paths
const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const parksDir = resolve(__dirname, 'src/parks');
const reviewsDir = resolve(parksDir, 'reviews');
const sharedDir = resolve(parksDir, '_shared');

// Get list of all parks from review files (the source of truth)
const getAllParks = () => {
	if (!fs.existsSync(reviewsDir)) {
		console.warn('Reviews directory does not exist:', reviewsDir);
		return [];
	}
	
	return fs.readdirSync(reviewsDir, { withFileTypes: true })
		.filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
		.map(dirent => dirent.name.replace(/\.md$/, ''));
};

// Get all parks from reviews directory
const allParks = getAllParks();
console.log(`Found ${allParks.length} parks from reviews`);

// Create routes for all parks for build configuration
const parkRoutes = allParks.reduce((acc, parkName) => {
	acc[`parks/${parkName}`] = resolve(sharedDir, 'index.html');
	return acc;
}, {});

// Define shareable assets that should be handled by the shared folder
const shareableAssets = ['main.jsx', 'index.html', 'style.css'];

// https://vitejs.dev/config/
export default defineConfig({
	root,
	plugins: [
		react(),
		{
			name: 'park-page-handler',
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					// Extract park name from URL using various patterns
					const parkMatches = [
						/^\/parks\/([^\/]+)\/?$/, // /parks/park-name or /parks/park-name/
						/^\/parks\/([^\/]+)\/index\.html$/ // /parks/park-name/index.html
					];
					
					let parkName = null;
					for (const pattern of parkMatches) {
						const match = pattern.exec(req.url);
						if (match && match[1]) {
							parkName = match[1];
							break;
						}
					}
					
					// Handle valid park pages
					if (parkName && allParks.includes(parkName)) {
						// Redirect to add trailing slash
						if (req.url === `/parks/${parkName}`) {
							res.writeHead(301, { Location: `/parks/${parkName}/` });
							res.end();
							return;
						}
						
						// Serve the shared index.html
						if (req.url === `/parks/${parkName}/index.html` || req.url === `/parks/${parkName}/`) {
							req.url = '/parks/_shared/index.html';
							next();
							return;
						}
					}
					
					// Handle main.jsx requests
					const mainJsxMatch = /^\/parks\/([^\/]+)\/main\.jsx$/.exec(req.url);
					if (mainJsxMatch && allParks.includes(mainJsxMatch[1])) {
						req.url = '/parks/_shared/main.jsx';
						next();
						return;
					}
					
					// Handle other park-specific assets
					const assetMatch = /^\/parks\/([^\/]+)\/(.+)$/.exec(req.url);
					if (assetMatch && allParks.includes(assetMatch[1])) {
						const assetPath = assetMatch[2];
						
						if (shareableAssets.some(asset => assetPath.includes(asset))) {
							req.url = `/parks/_shared/${assetPath}`;
							next();
							return;
						}
					}
					
					next();
				});
			},
			
			resolveId(source, importer) {
				if (importer && importer.includes('/parks/')) {
					// Handle main.jsx imports
					if (source === './main.jsx' || source === 'main.jsx') {
						return resolve(sharedDir, 'main.jsx');
					}
					
					// Handle shared template imports
					if (source.includes('/_shared/') || source.includes('../_shared/')) {
						const filename = source.split('/').pop();
						return resolve(sharedDir, filename);
					}
				}
				return null;
			},
			
			transformIndexHtml(html, ctx) {
				if (!ctx.path.includes('/parks/')) return html;
				
				// Ensure script src points to the shared main.jsx
				return html.replace(
					/<script type="module" src="\.\/main\.jsx"><\/script>/,
					'<script type="module" src="/parks/_shared/main.jsx"></script>'
				);
			}
		}
	],
	resolve: {
		alias: {
			'@': root,
			'@parks': parksDir,
			'@components': resolve(root, 'components'),
			'@images': resolve(root, 'images'),
			'@shared': sharedDir,
			// Alias for each park to its review
			...Object.fromEntries(
				allParks.map(park => [`@${park}`, resolve(reviewsDir, `${park}.md`)])
			)
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
