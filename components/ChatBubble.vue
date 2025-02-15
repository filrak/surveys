<template>
  <div class="col-span-12">
    <div 
      class="flex w-full"
      :class="isUser ? 'justify-end' : 'justify-start'"
    >
      <div 
        class="flex items-start gap-2 max-w-[80%]"
        :class="isUser ? 'flex-row-reverse' : 'flex-row'"
      >
        <!-- Avatar -->
        <div v-if="!isUser" class="min-w-12 shrink-0">
          <span class="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 w-10 h-10 text-tiny bg-indigo-100 text-indigo-600 rounded-full">
            <SparklesIcon class="w-6 h-6" />
          </span>
        </div>

        <!-- Message -->
        <div 
          class="glass flex p-4 rounded-[20px] shadow-sm"
          :class="[
            isUser 
              ? 'bg-indigo-500 text-white' 
              : 'bg-white text-gray-900'
          ]"
        >
          <div class="flex flex-col overflow-hidden">
            <!-- Header -->
            <div 
              class="flex items-center gap-2"
              :class="isUser ? 'flex-row-reverse' : 'flex-row'"
            >
              <span v-if="!isUser" class="text-sm font-semibold">
                AI Assistant
              </span>
              <span 
                class="text-xs font-normal"
                :class="isUser ? 'text-indigo-100' : 'text-gray-400'"
              >
                {{ formattedTime }}
              </span>
            </div>

            <!-- Content -->
            <div class="text-sm font-normal pt-2 markdown">
              <p>{{ content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SparklesIcon } from '@heroicons/vue/24/outline'

defineProps({
  content: {
    type: String,
    required: true
  },
  isUser: {
    type: Boolean,
    default: false
  }
})

const formattedTime = new Date().toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
})
</script>

<style>
.glass {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.glass:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>
