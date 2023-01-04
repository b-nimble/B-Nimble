import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      transformAssetUrls: {
        includeAbsolute: false
      }
    }
  }), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: 'dist/wp-content/themes/wachusett/dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // login: resolve(__dirname, 'login.html'),
        // register: resolve(__dirname, 'register.html'),
        // forgotPassword: resolve(__dirname, 'forgot-password.html'),
        // resetPassword: resolve(__dirname, 'reset-password.html'),
        // guestRegister: resolve(__dirname, 'guest-register.html'),
        // checkoutAuthorization: resolve(__dirname, 'checkout-authorization.html'),
        // checkout: resolve(__dirname, 'checkout.html'),
        // orderReceipt: resolve(__dirname, 'order-receipt.html'),
        // cart: resolve(__dirname, 'cart.html'),
        // nightLeagueGroup: resolve(__dirname, 'nightleaguegroup.html'),
        // schoolGroup: resolve(__dirname, 'schoolgroup.html'),
        // skiSaleSwapStatusCheck: resolve(__dirname, 'ski-sale-swap-status-check.html'),
        // skiSaleSwapInput: resolve(__dirname, 'ski-sale-swap-input.html'),
        // startGpsGroup: resolve(__dirname, 'start-gps-group.html'),
      },
    }
  },
})
