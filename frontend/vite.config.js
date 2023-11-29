import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src'),
      '@store':path.resolve(__dirname,'./src/store'),
      '@router':path.resolve(__dirname,'./src/router'),
      '@style':path.resolve(__dirname,'./src/styles'),
      '@component':path.resolve(__dirname,'./src/components'),
      '@dashboard':path.resolve(__dirname,'./src/components/dashboard'),
      '@utility':path.resolve(__dirname,'./src/utility'),
    },
  },
  server:{
    base:'/'
  }
})
