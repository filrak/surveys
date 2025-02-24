import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

export default defineNitroPlugin(() => {
  // Initialize Firebase Admin if it hasn't been initialized yet
  if (!process.env.FIREBASE_ADMIN_INITIALIZED) {
    try {
      const app = initializeApp({
        credential: cert({
          "type": "service_account",
          "project_id": "feedback-35ec9",
          "private_key_id": "a5ff04f5e92cb28f38f74306b8a5aca2a1932623",
          "private_key": process.env.FIREBASE_PRIVATE_KEY,
          "client_email": process.env.FIREBASE_CLIENT_EMAIL,
          "client_id": process.env.FIREBASE_CLIENT_ID,
          "auth_uri": "https://accounts.google.com/o/oauth2/auth",
          "token_uri": "https://oauth2.googleapis.com/token",
          "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
          "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL
        })
      })

      // Test the initialization
      const auth = getAuth(app)
      const db = getFirestore(app)
      
      console.log('Firebase Admin initialized successfully')
      process.env.FIREBASE_ADMIN_INITIALIZED = 'true'
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error)
    }
  }
})
