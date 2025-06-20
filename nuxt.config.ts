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
    head: {
      title: 'NEWWAY CHURCH',
      link: [
        // 파비콘
        { rel: 'icon', type: 'image/png', sizes: '196x196', href: '/nw_favicon-196.png' },
      ],
      meta: [
        // 기본태그
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '뉴웨이교회' },

        // 필수태그
        { property: 'og:title', content: 'NEWWAY CHURCH' },
        { property: 'og:description', content: 'NEWWAY BIBLE' },
        { property: 'og:image', content: 'https://your-domain.com/og-image.jpg' },
        { property: 'og:url', content: 'https://yjineey.github.io/newway-frontend/' },

        // 카카오톡 전용 태그
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.PUBLIC_API_URL,
    },
  },
})
