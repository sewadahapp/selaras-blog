// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@sewadah/selaras',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  devtools: { enabled: true },
  colorMode: { preference: 'dark', fallback: 'dark' },
  icon: { serverBundle: { collections: ['lucide'] } },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: { htmlAttrs: { lang: 'en' }, titleTemplate: '%s · Naya Arunika' },
  },
  // Server-render app/error.vue into 404.html at build time, so static hosts
  // serve a themed not-found page even before (or without) JavaScript.
  experimental: { prerenderErrorPages: true },
  compatibilityDate: '2025-07-15',
})
