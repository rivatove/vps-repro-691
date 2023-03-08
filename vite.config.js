import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import {splitVendorChunkPlugin} from "vite";

export default {
  plugins: [vue(), ssr(), splitVendorChunkPlugin()]
}
