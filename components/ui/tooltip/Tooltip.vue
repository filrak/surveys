<!-- Tooltip component -->
<template>
  <Tooltip :open="open" :default-open="defaultOpen" :delay-duration="delayDuration">
    <slot />
  </Tooltip>
</template>

<script setup lang="ts">
import { Tooltip } from 'radix-vue'

defineProps<{
  defaultOpen?: boolean
  open?: boolean
  delayDuration?: number
}>()
</script>
