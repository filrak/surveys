<!-- Tooltip trigger component -->
<template>
  <TooltipTrigger v-bind="$attrs">
    <slot />
  </TooltipTrigger>
</template>

<script setup lang="ts">
import { TooltipTrigger } from 'radix-vue'
</script>
