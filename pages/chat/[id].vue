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
        <!-- Messages -->
        <div class="px-4 pt-6">
          <div class="bg-gray-50 rounded-lg shadow-sm h-[calc(100vh-200px)] flex flex-col">
            <div class="flex-1 overflow-y-auto p-4" ref="messagesContainer">
              <div class="grid grid-cols-12 gap-y-2">
                <ChatBubble
                  v-for="(message, index) in messages"
                  :key="index"
                  :content="message.content.replace('QUESTION ANSWERED', '')"
                  :is-user="message.type === 'user'"
                />

                <!-- Loading Indicator -->
                <div v-if="isLoading" class="col-start-1 col-end-13 sm:col-end-11 md:col-end-9 lg:col-end-8 xl:col-end-7 md:px-3 pt-3">
                  <div class="flex items-start gap-2">
                    <div class="min-w-12 shrink-0">
                      <span class="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 w-10 h-10 text-tiny bg-indigo-100 text-indigo-600 rounded-full">
                        <SparklesIcon class="w-6 h-6" />
                      </span>
                    </div>
                    <div class="glass flex p-4 rounded-xl shadow-sm bg-white text-gray-900 rounded-tl-none">
                      <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                        <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input Area -->
            <div class="border-t border-gray-200 bg-white p-4 rounded-b-lg">
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
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '#app'
import { 
  XMarkIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  DocumentCheckIcon 
} from '@heroicons/vue/24/outline'
import { useSurvey } from '~/composables/useSurvey'
import { useAnswer } from '~/composables/useAnswer'

const messages = ref([])
const userInput = ref('')
const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const survey = ref(null)
const { getSurvey } = useSurvey()
const { prepareAnswers, handleSave, saveAnswer, getAnswer } = useAnswer()

const isSurveyComplete = ref(false)

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

  try {
    // Prepare survey context
    const currentQuestion = survey.value.questions[0]
    
    // Convert messages to OpenAI format
    const chatMessages = messages.value.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }))

    // Add current question context
    const surveyContext = `
      The current question is: "${currentQuestion?.text}".
      Expected answer type: "${currentQuestion?.answerType || 'text'}".
      ${currentQuestion?.description ? `Additional context: ${currentQuestion.description}` : ''}
      Please evaluate the user's answer and either mark it as complete with "QUESTION ANSWERED" or ask for more details.
      When you're happy with all the answers in the survey, complete it.
    `

    // Call our API using Nuxt's useFetch
    const { data, error } = await useFetch('/api/chat', {
      method: 'POST',
      body: {
        messages: chatMessages,
        surveyContext
      }
    })

    if (error.value) {
      throw error.value
    }

    if (data.value?.success) {
      const botMessage = {
        type: 'bot',
        content: data.value.message.content
      }
      messages.value.push(botMessage)

      // Check if the answer is complete
      if (data.value.isAnswerComplete) {
        console.log('Question answered successfully!')
        isSurveyComplete.value = true
        
        const thankYouMessage = {
          type: 'bot',
          content: 'Thank you for completing the survey!'
        }
        messages.value.push(thankYouMessage)
        
        console.log('Survey completed! Saving final conversation...')
      }

      // Save conversation after each message
      saveAnswer(
        survey.value.id,
        messages.value,
        isSurveyComplete.value
      )
    } else {
      throw new Error(data.value?.error || 'Failed to get response')
    }
  } catch (error) {
    console.error('Failed to get AI response:', error)
    messages.value.push({
      type: 'bot',
      content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.'
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}

const scrollToBottom = async () => {
  await nextTick()
  const container = messagesContainer.value
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

const messagesContainer = ref(null)

onMounted(async () => {
  // Load survey
  const surveyData = getSurvey(route.params.id)
  if (!surveyData) {
    router.push('/')
    return
  }
  
  survey.value = surveyData
  
  // Always start a new chat
  const initialMessage = {
    type: 'bot',
    content: `Hi! I'll help you complete the "${survey.value.name}" survey. I'll ask you some questions one by one.

Let's start with the first question:

${survey.value.questions[0].text}`
  }
  messages.value = [initialMessage]
  
  // Save initial state with a new UUID
  const { saveAnswer } = useAnswer()
  saveAnswer(crypto.randomUUID(), messages.value, false)
})
</script>
