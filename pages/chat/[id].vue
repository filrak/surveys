<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">{{ survey?.name || 'Loading...' }}</h1>
        <p class="mt-1 text-sm text-gray-500">Answer the questions to complete the survey</p>
      </div>
      <button 
        @click="router.push('/list')"
        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ArrowLeftIcon class="h-4 w-4 mr-1.5" />
        Back to List
      </button>
    </div>

    <!-- Chat Container -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="flex flex-col h-[600px]">
        <!-- Chat Messages -->
        <div class="flex-1 p-4 overflow-y-auto space-y-4">
          <template v-for="(message, index) in messages" :key="index">
            <!-- Bot Message -->
            <div v-if="message.type === 'bot'" class="flex items-start">
              <div class="flex-shrink-0">
                <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <ChatBubbleBottomCenterTextIcon class="h-5 w-5 text-indigo-600" />
                </div>
              </div>
              <div class="ml-3">
                <div class="bg-gray-100 rounded-lg px-4 py-2 max-w-lg">
                  <p class="text-sm text-gray-900">{{ message.content }}</p>
                </div>
              </div>
            </div>

            <!-- User Message -->
            <div v-else class="flex items-start justify-end">
              <div class="mr-3">
                <div class="bg-indigo-600 rounded-lg px-4 py-2 max-w-lg">
                  <p class="text-sm text-white">{{ message.content }}</p>
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon class="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </template>

          <!-- Loading Indicator -->
          <div v-if="isLoading" class="flex items-center justify-center py-4">
            <div class="animate-pulse flex space-x-4">
              <div class="h-2 w-2 bg-gray-500 rounded-full"></div>
              <div class="h-2 w-2 bg-gray-500 rounded-full"></div>
              <div class="h-2 w-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-gray-200 p-4">
          <div class="flex space-x-3">
            <input
              v-model="userInput"
              type="text"
              placeholder="Type your answer..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @keyup.enter="sendMessage"
            >
            <button
              @click="sendMessage"
              :disabled="!userInput.trim() || isLoading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSurvey } from '~/composables/useSurvey'
import { 
  ArrowLeftIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  PaperAirplaneIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const { getSurvey } = useSurvey()

const survey = ref(null)
const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const currentQuestionIndex = ref(0)

onMounted(() => {
  // Load survey
  const surveyData = getSurvey(route.params.id)
  if (!surveyData) {
    router.push('/list')
    return
  }
  
  survey.value = surveyData
  // Start the conversation with the first question
  messages.value.push({
    type: 'bot',
    content: surveyData.questions[0].text
  })
})

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return

  const message = userInput.value
  userInput.value = ''
  
  // Add user message
  messages.value.push({
    type: 'user',
    content: message
  })

  isLoading.value = true

  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Move to next question or end survey
  currentQuestionIndex.value++
  if (currentQuestionIndex.value < survey.value.questions.length) {
    messages.value.push({
      type: 'bot',
      content: survey.value.questions[currentQuestionIndex.value].text
    })
  } else {
    messages.value.push({
      type: 'bot',
      content: 'Thank you for completing the survey!'
    })
  }

  isLoading.value = false
}
</script>
