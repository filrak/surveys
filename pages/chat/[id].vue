<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Survey Info -->
    <div class="border-b">
      <div class="container mx-auto py-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">{{ survey?.name || 'Loading...' }}</h1>
          <p class="text-sm text-muted-foreground">AI-guided survey</p>
        </div>
      </div>
    </div>

    <!-- Chat Container -->
    <div class="flex-1">
      <div class="container mx-auto">
        <!-- Messages -->
        <div class="px-4 pt-6">
          <Card class="h-[calc(100vh-200px)] flex flex-col">
            <ScrollArea class="flex-1 p-4" ref="messagesContainer">
              <div class="grid grid-cols-12 gap-y-2">
                <ChatBubble
                  v-for="(message, index) in messages"
                  :key="index"
                  :content="message.content.replace('QUESTION ANSWERED', '')"
                  :is-user="message.type === 'user'"
                  :timestamp="message.timestamp"
                />

                <!-- Loading Indicator -->
                <div v-if="isLoading" class="col-span-12 flex justify-center py-2">
                  <Loader2Icon class="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              </div>
            </ScrollArea>

            <!-- Input Area -->
            <div class="border-t p-4">
              <form @submit.prevent="sendMessage" class="flex gap-2">
                <Input
                  v-model="userInput"
                  placeholder="Type your answer..."
                  :disabled="isLoading"
                  class="flex-1"
                />
                <Button 
                  type="submit"
                  :disabled="isLoading || !userInput.trim()"
                >
                  <SendIcon class="h-4 w-4" />
                  <span class="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '#app'
import { useSurvey } from '~/composables/useSurvey'
import { useAnswer } from '~/composables/useAnswer'
import { 
  CheckIcon, 
  XIcon, 
  Loader2Icon,
  SendIcon
} from 'lucide-vue-next'
import ChatBubble from '~/components/ChatBubble.vue'
import Card from '~/components/ui/card/Card.vue'
import ScrollArea from '~/components/ui/scroll-area/ScrollArea.vue'
import Button from '~/components/ui/button/Button.vue'
import Input from '~/components/ui/input/Input.vue'

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
  const surveyData = await getSurvey(route.params.id)
  if (!surveyData) {
    router.push('/')
    return
  }
  
  survey.value = surveyData
  
  // Check if survey has questions
  if (!survey.value.questions?.length) {
    console.error('Survey has no questions')
    router.push('/')
    return
  }
  
  // Always start a new chat
  const initialMessage = {
    type: 'bot',
    content: `Hi! I'll help you complete the "${survey.value.name}" survey. I'll ask you some questions one by one.

Let's start with the first question:

${survey.value.questions[0].text}`
  }
  messages.value = [initialMessage]
  
  // Save initial state using survey ID
  const { saveAnswer } = useAnswer()
  saveAnswer(route.params.id, messages.value, false)
})
</script>
