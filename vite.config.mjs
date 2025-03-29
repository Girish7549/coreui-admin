import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

export default defineConfig(() => {
  return {
    base: './',  // Ensure that assets are correctly linked in the relative context
    build: {
      outDir: 'build',  // The build output directory
      rollupOptions: {
        output: {
          // Improve chunk splitting
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'; // Bundle node_modules into a separate chunk
            }
          },
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/, // Specify files to transpile with esbuild
      exclude: [], // Exclude none, if needed, you can define exclusions
    },
    optimizeDeps: {
      force: true, // Force Vite to pre-optimize dependencies
      esbuildOptions: {
        loader: {
          '.js': 'jsx', // Specify .js files to use JSX loader
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/',  // Custom alias for the 'src' directory
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000,
      proxy: {
        // Proxy configurations if needed for API calls
      },
    },
    // Configure chunk size warning limit if needed (to suppress large chunk warnings)
    build: {
      chunkSizeWarningLimit: 1000, // This will suppress the warning if the chunk size exceeds 500 KB
    },
  }
})
