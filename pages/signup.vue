<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to sign up</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleAuthEmailSignup" class="space-y-4">
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

          <div class="space-y-2">
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              v-model.trim="confirmPassword"
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
              {{ isLoading ? 'Creating account...' : 'Sign up with Email' }}
            </Button>

            <Button
              type="button"
              variant="outline"
              class="w-full"
              @click="handleAuthGoogleSignup"
              :disabled="isLoading"
            >
              <img src="/google.svg" alt="Google" class="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>

            <div class="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <NuxtLink to="/login" class="text-primary hover:underline">
                Sign in
              </NuxtLink>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
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
const auth = useFirebaseAuth()!

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
    await createUserWithEmailAndPassword(auth, email.value, password.value)
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
