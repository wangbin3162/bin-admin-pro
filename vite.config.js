import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import copy from 'rollup-plugin-copy'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig(({ mode }) => {
  const dirRoot = process.cwd()
  const env = loadEnv(mode, dirRoot)
  const isProd = process.env.NODE_ENV === 'production'

  return {
    base: env.VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      copy({
        targets: [
          {
            src: './node_modules/libpag/lib/libpag.wasm',
            dest: isProd ? 'docs/' : 'public/',
          },
        ],
        hook: isProd ? 'writeBundle' : 'buildStart',
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 9085,
      open: true,
      // proxy: {
      //   // 代理配置只开发时生效。
      //   [env.VITE_APP_BASE_API]: {
      //     changeOrigin: true,
      //     target: env.VITE_APP_API_URL,
      //     rewrite: path => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
      //   },
      // },
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
        'bin-ui-design',
        'js-cookie',
        'brace',
      ],
      exclude: ['@vue/repl'],
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
              const expansions = ['bin-ui-design', 'brace']
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
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // enable hydration mismatch details in production build
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
  }
})
