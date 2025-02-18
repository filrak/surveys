<template>
  <section class="section-padding">
    <div class="container-padding">
      <div class="max-w-md mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold">Create an account</h1>
          <p class="text-muted-foreground">Sign up to get started with our platform</p>
        </div>

        <!-- Social Login Buttons -->
        <div class="grid grid-cols-1 gap-4">
          <Button variant="outline" class="w-full" @click="handleAuthGoogleSignup">
            <GoogleIcon class="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t"></span>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <!-- Signup Form -->
        <form @submit.prevent="handleAuthEmailSignup" class="space-y-6">
          <div class="space-y-4">
            <!-- Full Name -->
            <div class="space-y-2">
              <Label for="name">Full Name</Label>
              <div class="relative">
                <User class="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  v-model="name"
                  type="text"
                  placeholder="John Doe"
                  class="pl-10"
                  required
                />
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <div class="relative">
                <Mail class="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="john@example.com"
                  class="pl-10"
                  required
                />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <Label for="password">Password</Label>
              <div class="relative">
                <Lock class="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Create a password"
                  class="pl-10"
                  required
                />
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-2">
              <Label for="confirm-password">Confirm Password</Label>
              <div class="relative">
                <Lock class="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirm-password"
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  class="pl-10"
                  required
                />
              </div>
              <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
            </div>
          </div>

          <Button type="submit" class="w-full" :disabled="isLoading">
            <Loader2 class="mr-2 h-4 w-4 animate-spin" v-if="isLoading" />
            Create Account
          </Button>

          <p class="text-center text-sm text-muted-foreground">
            Already have an account?
            <NuxtLink to="/login" class="text-primary hover:underline">
              Sign in
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import Button from '~/components/ui/button/Button.vue'
import Input from '~/components/ui/input/Input.vue'
import Label from '~/components/ui/label/Label.vue'
import GoogleIcon from '~/components/icons/GoogleIcon.vue'
import {
  Mail,
  Loader2,
  User,
  Lock
} from 'lucide-vue-next'

const router = useRouter()
const auth = useFirebaseAuth()!

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// Handle email/password registration
async function handleAuthEmailSignup() {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    // Update user profile with name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name.value
      })
    }
    router.push('/list')
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}

// Handle Google OAuth registration
async function handleAuthGoogleSignup() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    router.push('/list')
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>
