<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Survey Answers</h1>
          <p class="text-gray-600">View all responses for this survey</p>
        </div>
        
        <button 
          @click="router.push('/list')"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Back to Surveys
        </button>
      </div>

      <!-- List of Answers -->
      <div class="space-y-8">
        <div v-for="answer in answers" :key="answer.id" class="bg-white rounded-lg shadow-sm p-6">
          <!-- Answer Summary -->
          <div v-if="answer.summary" class="mb-6 p-4 bg-indigo-50 rounded-lg">
            <h3 class="text-sm font-semibold text-indigo-900 mb-2">Summary</h3>
            <p class="text-sm text-indigo-800">{{ answer.summary }}</p>
          </div>

          <!-- Answer Details -->
          <div class="mb-4">
            <div class="text-sm text-gray-500">
              Submitted on {{ new Date(answer.createdAt).toLocaleString() }}
            </div>
          </div>

          <!-- Conversation -->
          <div class="space-y-4">
            <ChatBubble
              v-for="(message, index) in answer.conversation"
              :key="index"
              :content="message.content"
              :is-user="message.type === 'user'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { useAnswer } from '~/composables/useAnswer'

const route = useRoute()
const router = useRouter()
const { getAnswers } = useAnswer()
const answers = ref(getAnswers(route.params.id as string))
</script>
