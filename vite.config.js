import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// testing something

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

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
				"parks/angel-stadium": "./src/parks/angel-stadium/index.html",
				"parks/camelback-ranch": "./src/parks/camelback-ranch/index.html",
				"parks/dodger-stadium": "./src/parks/dodger-stadium/index.html",
				"parks/fenway-park": "./src/parks/fenway-park/index.html",
				"parks/globe-life-field": "./src/parks/globe-life-field/index.html",
				"parks/goodyear-ballpark": "./src/parks/goodyear-ballpark/index.html",
				"parks/guaranteed-rate-field": "./src/parks/guaranteed-rate-field/index.html",
				"parks/kauffman-stadium": "./src/parks/kauffman-stadium/index.html",
				"parks/minute-maid-park": "./src/parks/minute-maid-park/index.html",
				"parks/oakland-coliseum": "./src/parks/oakland-coliseum/index.html",
				"parks/oracle-park": "./src/parks/oracle-park/index.html",
				"parks/peoria-stadium": "./src/parks/peoria-stadium/index.html",
				"parks/petco-park": "./src/parks/petco-park/index.html",
				"parks/surprise-stadium": "./src/parks/surprise-stadium/index.html",
				"parks/t-mobile-park": "./src/parks/t-mobile-park/index.html",
				"parks/target-field": "./src/parks/target-field/index.html",
				"parks/wrigley-field": "./src/parks/wrigley-field/index.html",
				"parks/yankee-stadium-ii": "./src/parks/yankee-stadium-ii/index.html"
			}
		}
	},
})
