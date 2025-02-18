<template>
  <div class="bg-background">
    <AppHeader>
      <template #actions>
        <!-- Create Survey button on list page -->
        <Button
          v-if="route.path === '/list'"
          @click="router.push('/create')"
          class="inline-flex items-center justify-center"
        >
          <PlusIcon class="mr-2 h-4 w-4" />
          Create Survey
        </Button>

        <!-- Exit Survey button on chat page -->
        <Button 
          v-if="route.path.startsWith('/chat/')"
          variant="outline"
          @click="router.push('/list')"
        >
          <XIcon class="mr-2 h-4 w-4" />
          Exit Survey
        </Button>

        <!-- Back button on answers page -->
        <Button 
          v-if="route.path.startsWith('/answers/')"
          variant="outline"
          @click="router.push('/list')"
        >
          <ArrowLeftIcon class="mr-2 h-4 w-4" />
          Back to Surveys
        </Button>
      </template>
    </AppHeader>

    <NuxtRouteAnnouncer />
    <main class="min-h-screen bg-background">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { PlusIcon, XIcon, ArrowLeftIcon } from 'lucide-vue-next'
import AppHeader from '~/components/ui/app-header/AppHeader.vue'
import Button from '~/components/ui/button/Button.vue'

const route = useRoute()
const router = useRouter()
</script>
