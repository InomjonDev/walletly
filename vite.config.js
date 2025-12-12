import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '/src'),
			'@components': path.resolve(__dirname, '/src/components'),
			'@context': path.resolve(__dirname, '/src/context'),
			'@hooks': path.resolve(__dirname, '/src/hooks'),
			'@pages': path.resolve(__dirname, '/src/pages'),
			'@routes': path.resolve(__dirname, '/src/routes'),
			'@shared': path.resolve(__dirname, '/src/shared'),
			'@store': path.resolve(__dirname, '/src/store'),
			'@utils': path.resolve(__dirname, '/src/utils'),
			'@ui': path.resolve(__dirname, '/src/components/ui'),
			'@layout': path.resolve(__dirname, '/src/components/layout'),
		},
	},
})
