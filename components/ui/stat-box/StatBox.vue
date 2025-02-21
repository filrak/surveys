<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm relative">
    <div class="flex flex-col gap-y-1.5 p-6 pb-2">
      <h3 class="font-semibold tracking-tight text-sm flex items-center gap-2">
        <component :is="icon" class="size-4 text-primary" />
        {{ label }}
      </h3>
    </div>
    <div class="p-6 pt-0">
      <div class="text-2xl font-bold">{{ value }}</div>
      <p class="text-xs text-muted-foreground mt-1">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRightIcon } from 'lucide-vue-next'

defineProps<{
  icon: any
  label: string
  value: string | number
  description: string
}>()
</script>
