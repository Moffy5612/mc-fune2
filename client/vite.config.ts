import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import {viteStaticCopy} from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  plugins: [
    react(),
    viteStaticCopy({
      targets:[{
        src: "assets/*",
        dest: "assets"
      }]
    })
  ],
  build: {
    // distフォルダに出力
    outDir: resolve(__dirname, '../dist'),
    // 存在しないときはフォルダを作成する
    emptyOutDir: true,
    rollupOptions: {
      // entry pointがあるindex.htmlのパス
      input: {
        '': resolve(__dirname, 'src/index.html'),
      },
      // bundle.jsを差し替えする
      output: {
        entryFileNames: `bundle.js`,
        assetFileNames: `bundle.css`
      },
    },
  },
});