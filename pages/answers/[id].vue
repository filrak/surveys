<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold tracking-tight mb-2">{{ survey?.name || 'Survey' }} Answers</h1>
      </div>

      <!-- Stats -->
      <div class="grid gap-4 md:grid-cols-2 mb-8">
        <StatBox
          :icon="CheckCircleIcon"
          label="Completed Surveys"
          :value="completedAnswers.length"
          :description="`Out of ${answers.length} total responses`"
        />
        <StatBox
          :icon="PercentIcon"
          label="Completion Rate"
          :value="`${completionRatio}%`"
          description="Percentage of completed surveys"
        />
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
              :disabled="isLoading || !globalQuestion" 
              @click="handleGlobalQuestion"
              size="lg"
            >
              <Loader2Icon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              Analyze
            </Button>
          </div>
          <div v-if="globalAnswer" class="p-4 bg-muted rounded-lg">
            <div class="font-medium mb-2">Analysis:</div>
            <div class="text-sm whitespace-pre-wrap">{{ globalAnswer }}</div>
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
                <Badge :variant="answer.finished ? 'default' : 'secondary'">
                  {{ answer.finished ? 'Completed' : 'In Progress' }}
                </Badge>
                <Badge variant="outline" v-if="answer.updatedAt !== answer.createdAt">
                  Updated {{ formatDate(answer.updatedAt) }}
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
              <span class="mr-2">{{ expandedAnswers.has(answer.id) ? 'Hide' : 'Show' }} Conversation</span>
              <component :is="expandedAnswers.has(answer.id) ? ChevronUpIcon : ChevronDownIcon" class="h-4 w-4" />
            </span>
          </Button>

          <!-- Conversation -->
          <div v-if="expandedAnswers.has(answer.id)" class="space-y-4">
            <ChatBubble
              v-for="(message, index) in answer.conversation"
              :key="index"
              :content="message.content"
              :is-user="message.type === 'user'"
              :timestamp="new Date(answer.createdAt)"
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

const route = useRoute()
const router = useRouter()
const user = useCurrentUser()
const { getAnswers, askQuestionAboutAnswers } = useAnswer()
const { getSurvey } = useSurvey()

const survey = ref(null)
const answers = ref([])
const expandedAnswers = ref(new Set())
const globalQuestion = ref('')
const globalAnswer = ref('')
const isLoading = ref(false)
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

const toggleConversation = (answerId) => {
  if (expandedAnswers.value.has(answerId)) {
    expandedAnswers.value.delete(answerId)
  } else {
    expandedAnswers.value.add(answerId)
  }
}

const formatDate = (date) => {
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.round((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
    'day'
  )
}

const handleGlobalQuestion = async () => {
  if (!globalQuestion.value || isLoading.value) return

  isLoading.value = true
  try {
    const answer = await askQuestionAboutAnswers(route.params.id as string, globalQuestion.value)
    globalAnswer.value = answer
    globalQuestion.value = '' // Clear input after successful question
  } catch (error) {
    console.error('Error asking question:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const surveyId = route.params.id as string
  const surveyData = getSurvey(surveyId)
  
  // Redirect if survey doesn't exist or doesn't belong to user
  if (!surveyData) {
    router.push('/list')
    return
  }
  
  survey.value = surveyData
  answers.value = getAnswers(surveyId)
})
</script>
