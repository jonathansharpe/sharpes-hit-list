import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
	root,
	plugins: [react()],
	build: {
		outDir,
		emptyOutDir: true,
		sourcemap: true,
		rollupOptions: {
			input: {
				main: resolve(root, 'index.html'),
				games: resolve(root, 'games/index.html'),
				angelStadium: resolve(root, 'parks/angel-stadium/index.html'),
				camelbackRanch: resolve(root, 'parks/camelback-ranch/index.html'),
				dodgerStadium: resolve(root, 'parks/dodger-stadium/index.html'),
				fenwayPark: resolve(root, 'parks/fenway-park/index.html'),
				globeLifeField: resolve(root, 'parks/globe-life-field/index.html'),
				goodyearBallpark: resolve(root, 'parks/goodyear-ballpark/index.html'),
				guaranteedRateField: resolve(root, 'parks/guaranteed-rate-field/index.html'),
				kauffmanStadium: resolve(root, 'parks/kauffman-stadium/index.html'),
				minuteMaidPark: resolve(root, 'parks/minute-maid-park/index.html'),
				oaklandColiseum: resolve(root, 'parks/oakland-coliseum/index.html'),
				oraclePark: resolve(root, 'parks/oracle-park/index.html'),
				peoriaStadium: resolve(root, 'parks/peoria-stadium/index.html'),
				petcoPark: resolve(root, 'parks/petco-park/index.html'),
				surpriseStadium: resolve(root, 'parks/surprise-stadium/index.html'),
				tMobilePark: resolve(root, 'parks/t-mobile-park/index.html'),
				targetField: resolve(root, 'parks/target-field/index.html'),
				wrigleyField: resolve(root, 'parks/wrigley-field/index.html'),
				yankeeStadiumIi: resolve(root, 'parks/yankee-stadium-ii/index.html')
			}
		}
	},
})
