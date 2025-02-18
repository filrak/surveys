// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', 'nuxt-vuefire', 'shadcn-nuxt'],
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
  },
  vuefire: {
    config: {
      apiKey: '#{public.firebaseApiKey}',
      authDomain: '#{public.firebaseAuthDomain}',
      projectId: '#{public.firebaseProjectId}',
      storageBucket: '#{public.firebaseStorageBucket}',
      messagingSenderId: '#{public.firebaseMessagingSenderId}',
      appId: '#{public.firebaseAppId}',
      measurementId: '#{public.firebaseMeasurementId}'
    },
    auth: {
      enabled: true
    },
  },
})