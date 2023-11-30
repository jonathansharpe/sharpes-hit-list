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
				main: './src/index.html',
				games: "./src/games/index.html",
				angelStadium: "./src/parks/angel-stadium/index.html",
				camelbackRanch: "./src/parks/camelback-ranch/index.html",
				dodgerStadium: "./src/parks/dodger-stadium/index.html",
				fenwayPark: "./src/parks/fenway-park/index.html",
				globeLifeField: "./src/parks/globe-life-field/index.html",
				goodyearBallpark: "./src/parks/goodyear-ballpark/index.html",
				guaranteedRateField: "./src/parks/guaranteed-rate-field/index.html",
				kauffmanStadium: "./src/parks/kauffman-stadium/index.html",
				minuteMaidPark: "./src/parks/minute-maid-park/index.html",
				oaklandColiseum: "./src/parks/oakland-coliseum/index.html",
				oraclePark: "./src/parks/oracle-park/index.html",
				peoriaStadium: "./src/parks/peoria-stadium/index.html",
				petcoPark: "./src/parks/petco-park/index.html",
				surpriseStadium: "./src/parks/surprise-stadium/index.html",
				tMobilePark: "./src/parks/t-mobile-park/index.html",
				targetField: "./src/parks/target-field/index.html",
				wrigleyField: "./src/parks/wrigley-field/index.html",
				yankeeStadiumIi: "./src/parks/yankee-stadium-ii/index.html"
			}
		}
	},
})
