<script lang="ts" setup>
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { ref } from 'vue'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'

const auth = useFirebaseAuth()!
const user = useCurrentUser()
const googleAuthProvider = new GoogleAuthProvider()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const route = useRoute()
const router = useRouter()

// Redirect if user is already logged in
watch(user, (user) => {
  if (user && route.query.redirect && typeof route.query.redirect === 'string') {
    router.push(route.query.redirect)
  } else if (user) {
    router.push('/') // Default redirect to home if no redirect query
  }
})

async function loginWithEmail() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields'
    return
  }
  
  try {
    isLoading.value = true
    errorMessage.value = ''
    await signInWithEmailAndPassword(auth, email.value, password.value)
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to login'
  } finally {
    isLoading.value = false
  }
}

async function loginWithGoogle() {
  try {
    isLoading.value = true
    errorMessage.value = ''
    await signInWithPopup(auth, googleAuthProvider)
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to login with Google'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="loginWithEmail">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            >
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div class="flex flex-col space-y-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign in with Email</span>
          </button>

          <button
            type="button"
            @click="loginWithGoogle"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign in with Google</span>
          </button>
        </div>

        <div class="text-sm text-center">
          <NuxtLink to="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">
            Don't have an account? Sign up
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
