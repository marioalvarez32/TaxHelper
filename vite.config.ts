import { rmSync } from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import pkg from './package.json';
import path from 'path';
import { fileURLToPath, URL } from 'url';
import { dirname } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	// Clean dist on fresh builds
	if (command === 'build') {
		rmSync('out', { recursive: true, force: true });
	}

	const isServe = command === 'serve';
	const isBuild = command === 'build';
	const isDev = mode === 'development';
	const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

	return {
		root: path.resolve(__dirname, 'src/renderer'), // Set the root for the renderer process
		plugins: [
			vue(),
			electron([
				{
					// Main-Process entry file of the Electron App.
					entry: path.resolve(__dirname, 'src/main/index.ts'),
					onstart(options) {
						if (process.env.VSCODE_DEBUG) {
							console.log('[startup] Electron App');
						} else {
							options.startup();
						}
					},
					vite: {
						build: {
							sourcemap,
							minify: isBuild,
							outDir: path.resolve(__dirname, 'out/main'),
							rollupOptions: {
								external: Object.keys(pkg.dependencies ?? {}),
							},
						},
						optimizeDeps: {
							exclude: ['electron', 'xmllint-wasm'],
						},
					},
				},
				{
					entry: path.resolve(__dirname, 'src/preload/index.ts'),
					onstart(options) {
						// Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
						// instead of restarting the entire Electron App.
						options.reload();
					},
					vite: {
						build: {
							sourcemap: sourcemap ? 'inline' : undefined,
							minify: isBuild,
							outDir: 'out/preload',
							rollupOptions: {
								external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
							},
						},
						optimizeDeps: {
							exclude: ['electron', 'xmllint-wasm'],
						},
					},
				},
			]),
			// Use Node.js API in the Renderer-process
			renderer({
				nodeIntegration: true,
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src/renderer/'),
				Client: path.resolve(__dirname, './src/renderer/Client/'),
				Views: fileURLToPath(new URL('./src/renderer/views', import.meta.url)),
				Components: fileURLToPath(new URL('./src/renderer/components', import.meta.url)),
				Assets: fileURLToPath(new URL('./src/renderer/assets', import.meta.url)),
				Types: fileURLToPath(new URL('./src/renderer/types', import.meta.url)),
				vue: 'vue/dist/vue.esm-bundler.js',
			},
		},
		server: process.env.VSCODE_DEBUG
			? (() => {
					const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
					return {
						host: url.hostname,
						port: +url.port,
					};
				})()
			: {
					host: '127.0.0.1',
					port: 3000,
				},
		build: {
			target: 'esnext',
			minify: 'esbuild',
			sourcemap: sourcemap,
			chunkSizeWarningLimit: 1000,
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['vue'],
					},
				},
			},
		},
		esbuild: {
			pure: isDev ? [] : ['console.log', 'console.debug', 'console.info'],
		},
	};
});
