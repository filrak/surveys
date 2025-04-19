<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold tracking-tight mb-2">{{ survey?.name || 'Survey' }} Answers</h1>
      </div>

      <!-- Stats -->
      <div class="grid gap-4 md:grid-cols-3 mb-8">
        <StatBox
          :icon="PercentIcon"
          label="Completion Rate"
          :value="`${completionRatio}%`"
          :description="`${completedAnswers.length} out of ${answers.length} surveys completed`"
        />

        <!-- Sentiment Analysis -->
        <Card class="col-span-2 relative z-10 bg-card/95">
          <CardHeader class="p-4">
            <CardTitle class="text-base font-semibold">Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent class="p-4 pt-0">
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-green-500 transition-all duration-500"
                    :style="{ width: `${sentimentStats.positive}%` }"
                  />
                </div>
                <span class="text-sm font-medium">{{ sentimentStats.positive }}%</span>
              </div>

              <div class="flex items-center gap-2">
                <div class="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-yellow-500 transition-all duration-500"
                    :style="{ width: `${sentimentStats.neutral}%` }"
                  />
                </div>
                <span class="text-sm font-medium">{{ sentimentStats.neutral }}%</span>
              </div>

              <div class="flex items-center gap-2">
                <div class="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-red-500 transition-all duration-500"
                    :style="{ width: `${sentimentStats.negative}%` }"
                  />
                </div>
                <span class="text-sm font-medium">{{ sentimentStats.negative }}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Global Question Section -->
      <Card class="mb-8 p-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Analyze All Responses</h3>
            <Badge variant="outline">AI Powered</Badge>
          </div>
          <p class="text-sm text-muted-foreground">
            Ask questions about all survey responses to get insights and patterns.
          </p>
          <div class="flex gap-2">
            <Input 
              v-model="globalQuestion" 
              placeholder="Ask a question about all responses (e.g., 'What are the common themes?')"
              class="flex-1 h-10"
            />
            <Button 
              :disabled="analyzing || !globalQuestion" 
              @click="handleGlobalQuestion"
              size="lg"
            >
              <Loader2Icon v-if="analyzing" class="mr-2 h-4 w-4 animate-spin" />
              Analyze
            </Button>
          </div>
          <div v-if="analysisResult" class="p-4 bg-muted rounded-lg">
            <div class="font-medium mb-2">Analysis:</div>
            <div class="text-sm whitespace-pre-wrap">{{ analysisResult }}</div>
          </div>
        </div>
      </Card>

      <!-- Filter -->
      <div class="mb-6 max-w-sm">
        <Filter
          v-model="filterStatus"
          :options="filterOptions"
        />
      </div>

      <!-- List of Answers -->
      <div class="space-y-6">
        <Card v-for="answer in filteredAnswers" :key="answer.id" class="p-6">
          <!-- Answer Header -->
          <div class="flex justify-between items-start mb-6">
            <div class="space-y-1">
              <div class="text-sm text-muted-foreground">
                Submitted {{ formatDate(answer.createdAt) }}
              </div>
              <div class="flex items-center gap-2">
                <!-- <Badge :variant="answer.finished ? 'default' : 'secondary'">
                  {{ answer.finished ? 'Completed' : 'In Progress' }}
                </Badge> -->
                <Badge 
                  v-if="answer.sentiment" 
                  :class="{
                    'bg-emerald-500 hover:bg-emerald-600 text-white border-0': answer.sentiment === 'positive',
                    'bg-amber-400 hover:bg-amber-500 text-amber-950 border-0': answer.sentiment === 'neutral',
                    'bg-zinc-500 hover:bg-zinc-600 text-white border-0': answer.sentiment === 'negative'
                  }"
                  variant="outline"
                >
                  {{ answer.sentiment.toUpperCase() }}
                </Badge>
              </div>
            </div>
          </div>

          <!-- Answer Summary -->
          <div class="mb-6">
            <Card class="bg-muted">
              <CardHeader>
                <CardTitle class="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-sm">{{ answer.summary || 'No summary available' }}</p>
              </CardContent>
            </Card>
          </div>

          <!-- Toggle Conversation Button -->
          <Button 
            variant="outline" 
            class="w-full mb-4"
            @click="toggleConversation(answer.id)"
          >
            <span class="flex items-center">
              <span class="mr-2">{{ expandedAnswers.includes(answer.id) ? 'Hide' : 'Show' }} Conversation</span>
              <component :is="expandedAnswers.includes(answer.id) ? ChevronUpIcon : ChevronDownIcon" class="h-4 w-4" />
            </span>
          </Button>

          <!-- Conversation -->
          <div v-if="expandedAnswers.includes(answer.id)" class="space-y-4">
            <ChatBubble
              v-for="(message, index) in answer.conversation"
              :key="index"
              :content="message.content"
              :is-user="message.type === 'user'"
            />
          </div>
        </Card>

        <!-- Empty State -->
        <Card v-if="!answers.length" class="p-6">
          <div class="text-center">
            <InboxIcon class="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 class="mt-2 text-sm font-medium">No answers yet</h3>
            <p class="mt-1 text-sm text-muted-foreground">
              Start the survey to collect answers.
            </p>
            <Button 
              variant="outline" 
              class="mt-4"
              @click="router.push(`/chat/${route.params.id}`)"
            >
              <MessageSquareIcon class="mr-2 h-4 w-4" />
              Start Survey
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { InboxIcon, MessageSquareIcon, ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, PercentIcon, Loader2Icon } from 'lucide-vue-next'
import Input from '~/components/ui/input/Input.vue'
import ChatBubble from '~/components/ChatBubble.vue'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import CardTitle from '~/components/ui/card/CardTitle.vue'
import Button from '~/components/ui/button/Button.vue'
import Badge from '~/components/ui/badge/Badge.vue'
import Filter from '~/components/ui/filter/Filter.vue'
import StatBox from '~/components/ui/stat-box/StatBox.vue'
import { useAnswer } from '~/composables/useAnswer'
import { useSurvey } from '~/composables/useSurvey'

interface Message {
  type: 'user' | 'bot'
  content: string
  timestamp?: string
}

interface Answer {
  id: string
  surveyId: string
  conversation: Message[]
  summary?: string
  finished: boolean
  createdAt: string
  updatedAt?: string
}

const router = useRouter()
const route = useRoute()
const { getSurvey } = useSurvey()
const { getAnswers, askQuestionAboutAnswers, loading: analyzing } = useAnswer()

const loading = ref(true)
const survey = ref(null)
interface Message {
  type: 'user' | 'bot'
  content: string
  timestamp?: string
}

interface Answer {
  id: string
  conversation: Message[]
  summary?: string
  sentiment?: 'positive' | 'negative' | 'neutral'
  finished: boolean
  createdAt: string
  updatedAt?: string
}

const answers = ref<Answer[]>([])
const expandedAnswers = ref<string[]>([])
const globalQuestion = ref('')
const analysisResult = ref('')
const filterStatus = ref('all')

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'In Progress', value: 'in-progress' }
]

const sortedAnswers = computed(() => {
  return [...answers.value].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

const filteredAnswers = computed(() => {
  if (filterStatus.value === 'all') return sortedAnswers.value
  
  return sortedAnswers.value.filter(answer => {
    if (filterStatus.value === 'completed') return answer.finished
    return !answer.finished
  })
})

const completedAnswers = computed(() => 
  answers.value.filter(answer => answer.finished)
)

const completionRatio = computed(() => {
  if (!answers.value.length) return 0
  return Math.round((completedAnswers.value.length / answers.value.length) * 100)
})

const sentimentStats = computed(() => {
  const total = answers.value.filter(a => a.sentiment).length
  if (!total) return { positive: 0, neutral: 0, negative: 0 }

  const counts = answers.value.reduce((acc, answer) => {
    if (answer.sentiment) {
      acc[answer.sentiment]++
    }
    return acc
  }, { positive: 0, neutral: 0, negative: 0 })

  return {
    positive: Math.round((counts.positive / total) * 100),
    neutral: Math.round((counts.neutral / total) * 100),
    negative: Math.round((counts.negative / total) * 100)
  }
})

const toggleConversation = (answerId) => {
  if (expandedAnswers.value.includes(answerId)) {
    expandedAnswers.value = expandedAnswers.value.filter(id => id !== answerId)
  } else {
    expandedAnswers.value.push(answerId)
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  
  // Handle Firestore Timestamp
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp)
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Warsaw'
  })
}

const handleGlobalQuestion = async () => {
  if (!globalQuestion.value) return
  
  try {
    const answer = await askQuestionAboutAnswers(globalQuestion.value, answers.value)
    analysisResult.value = answer
    globalQuestion.value = '' // Clear input after successful question
  } catch (error) {
    console.error('Error asking question:', error)
  }
}

const loadSurveyAndAnswers = async () => {
  try {
    const surveyId = route.params.id as string
    
    // Load survey details and answers in parallel
    const [surveyData, answersData] = await Promise.all([
      getSurvey(surveyId),
      getAnswers(surveyId)
    ])

    if (!surveyData) {
      router.push('/404')
      return
    }

    survey.value = surveyData
    answers.value = answersData
  } catch (error) {
    console.error('Error loading survey and answers:', error)
  } finally {
    loading.value = false
  }
}

// Load data on mount
onMounted(() => {
  loadSurveyAndAnswers()
})
</script>
