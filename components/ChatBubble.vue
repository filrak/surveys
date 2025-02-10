<template>
  <div 
    :class="[
      'flex items-end space-x-2 mb-2',
      isUser ? 'flex-row-reverse space-x-reverse' : ''
    ]"
  >
    <!-- Avatar -->
    <div class="flex-shrink-0">
      <div 
        :class="[
          'h-8 w-8 rounded-full flex items-center justify-center',
          isUser ? 'bg-indigo-100' : 'bg-gray-100'
        ]"
      >
        <component 
          :is="isUser ? UserIcon : SparklesIcon"
          class="h-5 w-5"
          :class="isUser ? 'text-indigo-600' : 'text-gray-500'"
        />
      </div>
    </div>

    <!-- Message -->
    <div 
      :class="[
        'px-4 py-2 max-w-[80%] shadow-sm',
        isUser 
          ? 'bg-indigo-600 text-white rounded-t-2xl rounded-l-2xl rounded-br-lg' 
          : 'bg-gray-100 text-gray-900 rounded-t-2xl rounded-r-2xl rounded-bl-lg'
      ]"
    >
      <p class="text-[15px] leading-relaxed whitespace-pre-wrap">{{ content }}</p>
    </div>
  </div>
</template>

<script setup>
import { UserIcon, SparklesIcon } from '@heroicons/vue/24/outline'

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
</script>
