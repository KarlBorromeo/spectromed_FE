import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    //// use t he 0.0.0.0 in productions
    host: '0.0.0.0', // Listen on all interfaces for production
    // host: 'localhost',// Listen to localhost only
    port: 3000, // You can change this if needed
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SpectruMed',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/svg+xml', href: '/spectromed_logo.svg' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vuex-persist', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },

  auth: {
    strategies: {
      googleOauth: {
        scheme: 'oauth2',
        endpoints: {
          authorization: `${process.env.API_URL}/api/connect/google`,  // Google OAuth URL in Strapi
          userInfo:`${process.env.API_URL}/api/users/me?populate=*`,            // Endpoint to get user info from Strapi
        },
        token: {
          property: 'jwt',  // The property that holds the JWT in the response
          type: 'Bearer',   // The token type
        },
        user: {
          property: false,  // The user data is not nested
        },
        responseType: 'token',  // We expect the token to come in the query params
        redirectUri: `${process.env.APP_URL}/google-callback`,  // The callback URL after successful login
      },
    },
    redirect: {
      login: '/login',        // Redirect to login page if user isn't logged in
      logout: '/login',            // Redirect to homepage after logout
      callback: '/google-callback',  // The callback route for successful OAuth login
      home: '/',              // Redirect to homepage after successful login
    },
  },
  

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
