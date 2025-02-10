<template>
  <button 
    :class="[
      'inline-flex items-center shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      type === 'negative'
        ? 'px-3 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 focus:ring-red-500'
        : variant === 'primary' 
          ? 'px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
          : variant === 'secondary'
            ? 'px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500'
            : '',
      $slots['icon-left'] || $slots['icon-right'] 
        ? 'gap-1.5'
        : '',
      $slots['icon-left'] && !$slots.default
        ? 'p-2.5 rounded-full'
        : ''
    ]"
    v-bind="$attrs"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
  type?: 'negative'
}>()
</script>
