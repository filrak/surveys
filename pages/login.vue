<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Enter your credentials to sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleAuthEmail" class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model.trim="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model.trim="password"
              type="password"
              required
            />
          </div>

          <div v-if="errorMessage" class="text-sm text-destructive text-center">
            {{ errorMessage }}
          </div>

          <div class="space-y-4">
            <Button
              type="submit"
              class="w-full"
              :disabled="isLoading"
            >
              <Loader2Icon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Signing in...' : 'Sign in with Email' }}
            </Button>

            <Button
              type="button"
              variant="outline"
              class="w-full"
              @click="handleAuthGoogle"
              :disabled="isLoading"
            >
              <img src="/google.svg" alt="Google" class="mr-2 h-4 w-4" />
              {{ isLoading ? 'Signing in...' : 'Sign in with Google' }}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-center pb-5">
        <NuxtLink to="/signup" class="text-sm text-primary hover:underline">
          Don't have an account? Sign up
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from '#app'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { Loader2Icon } from 'lucide-vue-next'
import Input from '~/components/ui/input/Input.vue'
import Label from '~/components/ui/label/Label.vue'
import { Button } from '~/components/ui/button'
import Card from '~/components/ui/card/Card.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import CardDescription from '~/components/ui/card/CardDescription.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardTitle from '~/components/ui/card/CardTitle.vue'

const router = useRouter()
const route = useRoute()
const auth = useFirebaseAuth()!
const user = useCurrentUser()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// Redirect user to requested page after successful login
watch(user, (user) => {
  if (user && route.query.redirect && typeof route.query.redirect === 'string') {
    router.push(route.query.redirect)
  } else if (user) {
    router.push('/list') // Default redirect to list if no redirect query
  }
})

// Handle email/password authentication
async function handleAuthEmail() {
  try {
    isLoading.value = true
    errorMessage.value = ''

    if (!email.value.trim() || !password.value.trim()) {
      errorMessage.value = 'Please fill in all fields'
      return
    }
    
    await signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim())
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential') {
      errorMessage.value = 'Invalid email or password'
    } else {
      errorMessage.value = error.message
    }
  } finally {
    isLoading.value = false
  }
}

// Handle Google OAuth authentication
async function handleAuthGoogle() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  } catch (error: any) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>
