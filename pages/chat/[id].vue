<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">{{ survey?.name || 'Loading...' }}</h1>
            <p class="text-sm text-gray-500">AI-guided survey</p>
          </div>

          <div class="px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600 font-medium border border-gray-100">
            {{ answeredQuestions }}/{{ totalQuestions }}
          </div>

          <div class="flex items-center gap-3">
            <BaseButton 
              variant="secondary"
              @click="handleSave"
            >
              <template #icon-left>
                <DocumentCheckIcon class="h-4 w-4 mr-1.5" />
              </template>
              Save
            </BaseButton>
            <BaseButton 
              variant="secondary"
              @click="router.push('/list')"
            >
              <template #icon-left>
                <XMarkIcon class="h-4 w-4 mr-1.5" />
              </template>
              Exit Survey
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Container -->
    <div class="flex-1">
      <div class="container mx-auto">
        <!-- Progress Bar -->
        <div class="px-4 pt-6 pb-4">
          <ProgressBar
            :current="answeredQuestions"
            :total="totalQuestions"
          />
        </div>

        <!-- Messages -->
        <div class="px-4">
          <div class="bg-white rounded-lg shadow-sm h-[calc(100vh-200px)] flex flex-col">
            <div class="flex-1 overflow-y-auto p-4" ref="messagesContainer">
              <div class="space-y-1">
                <template v-for="(message, index) in messages" :key="index">
                  <ChatBubble
                    :content="message.content"
                    :is-user="message.type === 'user'"
                  />
                </template>

                <!-- Loading Indicator -->
                <div v-if="isLoading" class="flex items-end space-x-2 mb-2">
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <SparklesIcon class="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div class="bg-gray-100 rounded-t-2xl rounded-r-2xl rounded-bl-lg px-4 py-2 shadow-sm">
                    <div class="flex space-x-1">
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                      <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input Area -->
            <div class="border-t border-gray-100 p-4">
              <form @submit.prevent="sendMessage" class="flex space-x-3">
                <input
                  v-model="userInput"
                  type="text"
                  placeholder="Type your answer..."
                  class="block flex-1 rounded-full border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm px-4 py-2.5"
                  :disabled="isLoading || isSurveyComplete"
                >
                <BaseButton
                  type="submit"
                  variant="icon"
                  :disabled="!userInput.trim() || isLoading || isSurveyComplete"
                >
                  <PaperAirplaneIcon class="h-5 w-5 transform rotate-90" />
                </BaseButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSurvey } from '~/composables/useSurvey'
import { useAnswer } from '~/composables/useAnswer'
import { 
  XMarkIcon,
  UserIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  DocumentCheckIcon
} from '@heroicons/vue/24/outline'
import ChatBubble from '~/components/ChatBubble.vue'
import BaseButton from '~/components/BaseButton.vue'
import ProgressBar from '~/components/ProgressBar.vue'

const route = useRoute()
const router = useRouter()
const { getSurvey } = useSurvey()
const { saveAnswer } = useAnswer()

const survey = ref(null)
const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)
const isSurveyComplete = computed(() => messages.value.some(m => m.content === 'Thank you for completing the survey!'))

const totalQuestions = computed(() => survey.value?.questions.length || 0)
const answeredQuestions = computed(() => messages.value.filter(m => m.type === 'user').length)

// Scroll to bottom of chat
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

onMounted(async () => {
  // Load survey
  const surveyData = getSurvey(route.params.id)
  if (!surveyData) {
    router.push('/list')
    return
  }
  
  survey.value = surveyData
  
  // Add welcome message
  messages.value.push({
    type: 'bot',
    content: `Hi! I'll help you complete the "${surveyData.name}" survey. I'll ask you some questions one by one.\n\nLet's start with the first question:\n\n${surveyData.questions[0].text}`
  })
  
  await scrollToBottom()
})

const prepareAnswers = () => {
  const userMessages = messages.value
    .filter(m => m.type === 'user')
    .map((m, index) => ({
      question: survey.value.questions[index].text,
      answer: m.content
    }))
  return userMessages
}

const handleSave = () => {
  if (!survey.value) return
  const answers = prepareAnswers()
  saveAnswer(survey.value.id, answers)
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value || isSurveyComplete.value) return

  const message = userInput.value
  userInput.value = ''
  
  // Add user message
  messages.value.push({
    type: 'user',
    content: message
  })
  await scrollToBottom()

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Find current question index
  const questionCount = messages.value.filter(m => m.type === 'user').length

  if (questionCount < survey.value.questions.length) {
    // Send next question
    messages.value.push({
      type: 'bot',
      content: survey.value.questions[questionCount].text
    })
  } else {
    // Survey complete
    messages.value.push({
      type: 'bot',
      content: 'Thank you for completing the survey!'
    })
  }

  isLoading.value = false
  await scrollToBottom()
}
</script>
