import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  },
  plugins: [react(),
  nodePolyfills({
    include: ['path', 'stream', 'util'],
    exclude: ['http'],
    globals: {
      Buffer: true,
      global: true,
      process: true
    },
    overrides: {
      fs: 'memfs',
    },
    protocolImports: true
  }),
  svgr(
    {
      svgrOptions: { exportType: "default", icon: 30, ref: true, svgo: false, titleProp: true },
      include: "**/*.svg",
    },
  ),
    // basicSsl()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: 'buffer/'
    },
  },
  define: {
    'process.env': process.env
    // If you want to exposes all env variables, which is not recommended
    // 'process.env': env
  }
})
