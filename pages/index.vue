<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <Button size="lg" @click="router.push('/list')">
      Go to List
      <ArrowRightIcon class="ml-2 h-4 w-4" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
import { useRouter } from '#app'

const router = useRouter()
</script>