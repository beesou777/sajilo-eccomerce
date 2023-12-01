import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
        sass: {
            additionalData: `
              @import "${path.resolve(__dirname,'./src/styles/base/_variable.scss')}";
              @import "${path.resolve(__dirname,'./src/styles/base/_mixins.scss')}";
              @import "${path.resolve(__dirname,'./src/styles/base/_typography.scss')}";
              @import "${path.resolve(__dirname,'./src/styles/base/_base.scss')}";
            `
        }
    }
},
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
      '@store':path.resolve(__dirname,'./src/store'),
      '@router':path.resolve(__dirname,'./src/router'),
      '@style':path.resolve(__dirname,'./src/styles'),
      '@utility_style':path.resolve(__dirname,'./src/styles/base/_utility.scss'),
      '@component':path.resolve(__dirname,'./src/components'),
      '@dashboard':path.resolve(__dirname,'./src/components/dashboard'),
      '@utility':path.resolve(__dirname,'./src/utility'),
      '@views':path.resolve(__dirname,'./src/views'),
    },
  },
  server:{
    base:'/'
  }
})
