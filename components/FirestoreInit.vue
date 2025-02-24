<template>
  <div v-if="error" class="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useCollectionInit } from '~/composables/useCollectionInit'
import { useCurrentUser } from 'vuefire'

const error = ref('')
const user = useCurrentUser()
const { initializeCollections } = useCollectionInit()

onMounted(async () => {
  // Wait for user to be authenticated
  if (!user.value) {
    return
  }

  try {
    await initializeCollections()
    console.log('Collections initialized successfully')
  } catch (err: any) {
    console.error('Failed to initialize collections:', err)
    error.value = err.message
  }
})

// Watch for user changes
watch(user, async (newUser) => {
  if (newUser) {
    try {
      await initializeCollections()
      console.log('Collections initialized successfully after user login')
    } catch (err: any) {
      console.error('Failed to initialize collections:', err)
      error.value = err.message
    }
  }
})
</script>
