<template>
  <div class="col-span-12">
    <div 
      class="flex w-full"
      :class="isUser ? 'justify-end' : 'justify-start'"
    >
      <div 
        class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm"
        :class="[
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        ]"
        :title="formattedTime"
      >
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  content: string
  isUser?: boolean
  timestamp?: Date
}

const props = withDefaults(defineProps<Props>(), {
  isUser: false,
  timestamp: () => new Date()
})

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric'
  }).format(props.timestamp)
})
</script>

<style scoped>
.glass {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
