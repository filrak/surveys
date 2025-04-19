<!-- Survey List Page -->
<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto py-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex flex-col gap-4">
          <h1 class="text-3xl font-bold tracking-tight">Your Surveys</h1>
          <CategoryFilter
            :surveys="surveysWithResponses"
            @update:selected="selectedCategories = $event"
          />
        </div>
        <Button @click="router.push('/create/template')" class="inline-flex items-center">
          <PlusIcon class="mr-2 h-4 w-4" />
          Create Survey
        </Button>
      </div>
      <!-- Table -->
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Responses</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="survey in filteredSurveys" :key="survey.id">
              <TableCell class="font-medium">{{ survey.name }}</TableCell>
              <TableCell>{{ survey.category || '-' }}</TableCell>
              <TableCell>
                {{ survey.questions.length }} {{ survey.questions.length === 1 ? 'question' : 'questions' }}
              </TableCell>
              <TableCell>
                <div class="flex items-center gap-2">
                  {{ survey.responseCount }}
                  <Badge v-if="survey.completedCount" variant="default" class="text-xs">
                    {{ survey.completedCount }} completed
                  </Badge>
                </div>
              </TableCell>
              <TableCell>{{ formatDate(survey.createdAt) }}</TableCell>
              <TableCell>{{ survey.updatedAt ? formatDate(survey.updatedAt) : '-' }}</TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    @click="router.push(`/answers/${survey.id}`)"
                  >
                    <ClipboardListIcon class="mr-2 h-4 w-4" />
                    Answers
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    @click="router.push(`/create/questions?id=${survey.id}`)"
                  >
                    <PencilIcon class="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem @click="router.push(`/chat/${survey.id}`)">
                        <MessageSquareIcon class="mr-2 h-4 w-4" />
                        Start Survey
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem @click="deleteSurvey(survey.id)">
                        <Trash2Icon class="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
            <!-- Empty state -->
            <TableRow v-if="!filteredSurveys.length">
              <TableCell colspan="7" class="h-24 text-center">
                <div class="flex flex-col items-center justify-center space-y-2">
                  <ClipboardListIcon class="h-8 w-8 text-muted-foreground" />
                  <div class="text-lg font-medium">No surveys</div>
                  <div class="text-sm text-muted-foreground">
                    Create your first survey to get started.
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { useSurvey } from '~/composables/useSurvey'
import { useAnswer } from '~/composables/useAnswer'
import { 
  PlusIcon, 
  MessageSquare as MessageSquareIcon, 
  Pencil as PencilIcon, 
  MoreVertical as MoreVerticalIcon,
  Trash2 as Trash2Icon,
  ClipboardList as ClipboardListIcon
} from 'lucide-vue-next'

// Import shadcn components
import Table from '~/components/ui/table/Table.vue'
import TableBody from '~/components/ui/table/TableBody.vue'
import TableCell from '~/components/ui/table/TableCell.vue'
import TableHead from '~/components/ui/table/TableHead.vue'
import TableHeader from '~/components/ui/table/TableHeader.vue'
import TableRow from '~/components/ui/table/TableRow.vue'
import DropdownMenu from '~/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '~/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '~/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '~/components/ui/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuSeparator from '~/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
import Button from '~/components/ui/button/Button.vue'
import Badge from '~/components/ui/badge/Badge.vue'
import CategoryFilter from '~/components/CategoryFilter.vue'

const router = useRouter()
const { listSurveys } = useSurvey()
const { getAnswers } = useAnswer()
const surveys = ref([])
const surveysWithResponses = ref([])
const selectedCategories = ref([])
const currentUser = useCurrentUser()

// Computed property for filtered surveys
const filteredSurveys = computed(() => {
  if (!selectedCategories.value.length) return surveysWithResponses.value
  
  return surveysWithResponses.value.filter(survey => {
    const surveyCategory = survey.category || 'No category'
    return selectedCategories.value.includes(surveyCategory)
  })
})

// Load surveys and update response counts
const loadSurveysAndCounts = async () => {
  const surveyList = await listSurveys()
  surveys.value = surveyList

  // Get response counts for each survey
  const withCounts = await Promise.all(
    surveyList.map(async (survey) => {
      try {
        const answers = await getAnswers(survey.id)
        const completedAnswers = answers.filter(a => a.finished)
        return {
          ...survey,
          responseCount: answers.length,
          completedCount: completedAnswers.length
        }
      } catch (error) {
        console.error(`Error loading responses for survey "${survey.name}":`, error)
        return {
          ...survey,
          responseCount: 0,
          completedCount: 0
        }
      }
    })
  )

  surveysWithResponses.value = withCounts
}

// Load data on mount
onMounted(() => {
  loadSurveysAndCounts()
})

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

const deleteSurvey = async (id) => {
  try {
    // Get all answers for this survey first
    const answers = await useAnswer().getAnswers(id)
    
    // Delete all answers
    await Promise.all(answers.map(answer => useAnswer().deleteAnswer(answer.id)))
    
    // Delete the survey itself
    await useSurvey().deleteSurvey(id)
    
    // Refresh the list
    loadSurveysAndCounts()
  } catch (error) {
    console.error('Failed to delete survey:', error)
    // Here you might want to show an error toast to the user
  }
}
</script>
