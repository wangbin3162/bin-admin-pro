import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// const proxyAddress = 'http://192.168.0.121:8850/'
// https://vitejs.dev/config/
export default ({ mode }) => {
  const dirRoot = process.cwd()

  const env = loadEnv(mode, dirRoot)

  return defineConfig({
    base: process.env.NODE_ENV === 'production' ? env.VITE_PUBLIC_PATH : '',
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => ['css-doodle'].includes(tag),
          },
        },
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 8085,
      open: true,
      proxy: {
        // '/auth': { target: proxyAddress },
      },
    },
    resolve: {
      alias: {
        '@': pathResolve('./src'),
      },
    },
    optimizeDeps: {
      include: [
        'axios',
        'vue',
        'vue-router',
        'pinia',
        'dayjs',
        'echarts',
        'bin-ui-next',
        'js-cookie',
        'mockjs',
        'brace',
      ],
      exclude: [],
    },
    build: {
      sourcemap: false,
      outDir: 'docs',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('/node_modules/')) {
              // 设置需要独立打包的npm包
              const expansions = ['bin-ui-next', 'brace']
              const c = expansions.find(exp => id.includes(`/node_modules/${exp}`))
              if (c) {
                return `chunk-${c}`
              } else {
                return 'vendor'
              }
            }
          },
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  })
}
