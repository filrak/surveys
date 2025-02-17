<template>
  <div class="w-full">
    <div class="flex w-full bg-gray-100 rounded-full overflow-hidden">
      <div class="flex w-full">
        <template v-for="step in total" :key="step">
          <div 
            :class="[
              'h-full transition-all duration-200',
              'flex-1',
              step <= current 
                ? 'bg-indigo-600' 
                : step === current + 1
                  ? 'bg-indigo-400'
                  : 'bg-transparent'
            ]"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  current: number
  total: number
}>()
</script>
