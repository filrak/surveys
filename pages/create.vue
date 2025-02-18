<!-- Survey Creation/Edit Page -->
<template>
  <div class="container mx-auto py-8">
    <!-- Header -->
    <div class="flex items-center justify-between space-x-4 pb-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ isEditing ? 'Edit Survey' : 'Create Survey' }}</h1>
        <p class="text-muted-foreground">{{ isEditing ? 'Modify your existing survey' : 'Create a new survey' }}</p>
      </div>
      <Button
        variant="outline"
        @click="router.push('/list')"
      >
        <ArrowLeftIcon class="mr-2 h-4 w-4" />
        Back to List
      </Button>
    </div>

    <!-- Survey Form -->
    <Card>
      <CardContent class="pt-6">
        <form @submit.prevent="saveSurvey" class="space-y-8">
          <!-- Survey Name -->
          <div class="space-y-2">
            <Label for="surveyName">Survey Name</Label>
            <Input
              id="surveyName"
              v-model="surveyName"
              placeholder="Enter survey name"
              :disabled="isLoading"
            />
          </div>
          
          <!-- Questions List -->
          <div class="space-y-6">
            <div v-for="(question, index) in questions" :key="index" class="rounded-lg border p-4">
              <div class="space-y-4">
                <!-- Question Header -->
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-medium">Question {{ index + 1 }}</h3>
                  <Button
                    variant="destructive"
                    size="sm"
                    @click="removeQuestion(index)"
                    :disabled="isLoading"
                  >
                    <Trash2Icon class="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>

                <!-- Question Text -->
                <div class="space-y-2">
                  <Label :for="'question-' + index">Question Text</Label>
                  <Textarea
                    :id="'question-' + index"
                    v-model="question.text"
                    placeholder="Enter your question"
                    :disabled="isLoading"
                  />
                </div>

                <!-- Expected Answer -->
                <div class="space-y-2">
                  <Label :for="'answer-' + index">Expected Answer</Label>
                  <Textarea
                    :id="'answer-' + index"
                    v-model="question.expectedAnswer"
                    placeholder="Describe what kind of answer you expect"
                    :disabled="isLoading"
                  />
                </div>

                <!-- Unwanted Answer -->
                <div class="space-y-2">
                  <Label :for="'unwanted-answer-' + index">Unwanted Answer</Label>
                  <Textarea
                    :id="'unwanted-answer-' + index"
                    v-model="question.unwantedAnswer"
                    placeholder="Describe what kind of answer you want to avoid"
                    :disabled="isLoading"
                  />
                </div>
              </div>
            </div>

            <!-- Add Question Button -->
            <Button
              type="button"
              variant="outline"
              @click="addQuestion"
              :disabled="isLoading"
              class="w-full"
            >
              <PlusIcon class="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end space-x-4">
            <Button
              type="submit"
              :disabled="isLoading"
            >
              <Loader2Icon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Saving...' : 'Save Survey' }}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSurvey } from '~/composables/useSurvey'
import { 
  ArrowLeft as ArrowLeftIcon,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
  Save as SaveIcon
} from 'lucide-vue-next'

// Import shadcn components
import Card from '~/components/ui/card/Card.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import Button from '~/components/ui/button/Button.vue'
import Input from '~/components/ui/input/Input.vue'
import Label from '~/components/ui/label/Label.vue'
import Textarea from '~/components/ui/textarea/Textarea.vue'

const route = useRoute()
const router = useRouter()
const { getSurvey, setSurvey } = useSurvey()

const isLoading = ref(false)
const surveyName = ref('')
const questions = ref([])
const isEditing = computed(() => route.query.id)

// Initialize empty question
const createEmptyQuestion = () => ({
  text: '',
  expectedAnswer: '',
  unwantedAnswer: ''
})

// Add new question
const addQuestion = () => {
  questions.value.push(createEmptyQuestion())
}

// Remove question
const removeQuestion = (index) => {
  questions.value.splice(index, 1)
}

// Save survey
const saveSurvey = async () => {
  isLoading.value = true
  try {
    const survey = {
      name: surveyName.value,
      questions: questions.value,
    }
    await setSurvey(survey, isEditing.value ? route.query.id : undefined)
    router.push('/list')
  } catch (error) {
    console.error('Error saving survey:', error)
  } finally {
    isLoading.value = false
  }
}

// Load existing survey if editing
onMounted(() => {
  if (isEditing.value) {
    const survey = getSurvey(route.query.id)
    if (survey) {
      surveyName.value = survey.name
      questions.value = survey.questions
    }
  } else {
    // Add first question by default for new surveys
    addQuestion()
  }
})
</script>