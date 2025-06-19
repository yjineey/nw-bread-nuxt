// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/tailwind.css'],

  // https://nuxt.com/docs/guide/deploy/github-pages
  ssr: false,
  app: {
    baseURL: process.env.APP_BASE_URL || '/',
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.PUBLIC_API_URL,
    },
  },
})
