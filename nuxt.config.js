// eslint-disable-next-line nuxt/no-cjs-in-config

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'まんなか佐賀 ぐるっとスタンプラリー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  privateRuntimeConfig: {
    publicVapidKey: process.env.PUBLIC_VAPID_KEY
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugin/vue2-google-maps.js' },
    {
      src: '~/plugin/vuex-persistedstate.js',
      ssr: false
    },
    { src: '~/plugin/firebase.js' },
    { src: '~/plugin/vue-qrcode-reader.js', ssr: false },
    { src: '~/plugin/day.js', ssr: false },
    { src: '~/plugin/VueQrcode.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/google-gtag',
    'nuxt-client-init-module',
    'nuxt-fontawesome',
    'nuxt-svg-loader',
    '@nuxtjs/axios'
  ],
  'google-gtag': {
    id: 'G-JKG7RZNFMC',
    debug: true
  },
  workbox: {
    cachingExtensions: '~/plugin/fcm.js'
  },
  fontawesome: {
    component: 'fa'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
      gcm_sender_id: '173580424138'
    }
  },

  moment: {
    locales: ['ja']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vue2-google-maps'],
    transpile: [/^vue2-google-maps($|\/)/]
  },

  router: {
    middleware: 'redirect'
  }
}
