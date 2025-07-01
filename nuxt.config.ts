// https://nuxt.com/docs/api/configuration/nuxt-config

const base = process.env.APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/index.css'],

  // https://nuxt.com/docs/guide/deploy/github-pages
  ssr: false,
  app: {
    baseURL: base,
    head: {
      title: 'NEWWAY CHURCH',
      link: [
        // 파비콘
        { rel: 'icon', type: 'image/png', sizes: '196x196', href: `${base}nw_favicon-196.png` },
      ],
      meta: [
        // 기본태그
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '뉴웨이교회' },

        // 필수태그
        { property: 'og:title', content: 'NEWWAY CHURCH' },
        {
          property: 'og:description',
          content: '뉴웨이교회에 오신 것을 환영합니다.',
        },
        {
          property: 'og:image',
          content: 'https://cdn.imweb.me/upload/S2023020869d0205dba053/94d155e4d81c7.png',
        },
        { property: 'og:url', content: 'https://yjineey.github.io/newway-front-nuxt/' },

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
