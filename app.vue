<template>
  <div class="bg-background">
    <AppHeader>
      <template #actions>
        <!-- Exit Survey button on chat page -->
        <Button 
          v-if="route.path.startsWith('/chat/')"
          variant="outline"
          @click="router.push('/')"
        >
          <XIcon class="mr-2 h-4 w-4" />
          Exit Survey
        </Button>
      </template>
    </AppHeader>

    <NuxtRouteAnnouncer />
    <main class="min-h-screen bg-background">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { XIcon } from 'lucide-vue-next'
import AppHeader from '~/components/ui/app-header/AppHeader.vue'
import Button from '~/components/ui/button/Button.vue'

const route = useRoute()
const router = useRouter()

</script>
