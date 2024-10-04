export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' || import.meta.env.MODE === 'production' ? { cssnano: {} } : {})
  },
}
