import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 使用 proxy 实例
      '/admin': {
        target: 'http://baidu.com/api',
        changeOrigin: true
      },
    },
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false // 禁用缓存
    }),
    vueJsx({})
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  envDir: 'src/env',
})
