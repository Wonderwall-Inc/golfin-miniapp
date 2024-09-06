import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  svgr(
    {
      svgrOptions: { exportType: "default", icon: 30, ref: true, svgo: false, titleProp: true },
      include: "**/*.svg",
    },
  ),
  basicSsl()
  ],
  define: {
    'process.env': process.env
    // If you want to exposes all env variables, which is not recommended
    // 'process.env': env
  },
  server: {
    host: 'localhost',
    port: 5173
  }
})
