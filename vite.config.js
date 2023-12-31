import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 或者使用 unplugin-element-plus
// import ElementPlus from 'unplugin-element-plus/vite'


export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 配置elementPlus采用sass样式配色系统
      resolvers: [ElementPlusResolver({importStyle: "sass"})],
    }),
    // ElementPlus({
    //   useSource: true,
    // }),
  ],
   css: {
    preprocessorOptions: {
      scss: {
        // 2.自动导入定制化样式文件进行样式覆盖
        additionalData: `
        @use "@/styles/element/index.scss" as *;
        @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
  resolve: {
    // 实际的路径转换配置
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
