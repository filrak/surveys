<!-- Card footer component -->
<template>
  <div :class="cn('flex items-center p-6 pt-0', className)" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  className?: string
}>()
</script>
