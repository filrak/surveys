<template>
  <button 
    :class="[
      'inline-flex items-center shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' 
        ? 'px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700' 
        : variant === 'secondary'
          ? 'px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50'
          : variant === 'icon'
            ? 'p-2.5 border border-transparent rounded-full text-white bg-indigo-600 hover:bg-indigo-700'
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
  variant?: 'primary' | 'secondary' | 'icon'
}>()
</script>
