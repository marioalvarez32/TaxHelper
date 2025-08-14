import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin(), bytecodePlugin()],
	},
	preload: {
		plugins: [externalizeDepsPlugin(), bytecodePlugin()],
	},
	renderer: {
		resolve: {
			alias: {
				'@renderer': resolve('src/renderer/src'),
				'@': path.resolve(__dirname, './src/renderer/src/'),
				Client: path.resolve(__dirname, './src/renderer/src/Client/'),
				Views: path.resolve(__dirname, './src/renderer/src/views'),
				Components: path.resolve(__dirname, './src/renderer/src/components'),
				Assets: path.resolve(__dirname, './src/renderer/src/assets'),
				Types: path.resolve(__dirname, './src/renderer/src/types'),
				vue: 'vue/dist/vue.esm-bundler.js',
			},
		},
		plugins: [vue()],
	},
});
