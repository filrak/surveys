<template>
  <div class="space-y-8">
    <!-- Survey Name -->
    <div class="space-y-2">
      <Label for="surveyName">Survey Name</Label>
      <Input
        id="surveyName"
        v-model="surveyData.name"
        placeholder="Enter survey name"
        :disabled="isLoading"
      />
    </div>
    
    <!-- Questions List -->
    <div class="space-y-6">
      <div v-for="(question, index) in surveyData.questions" :key="index" class="rounded-lg border p-4">
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

    <!-- Navigation Buttons -->
    <div class="flex justify-between">
      <Button variant="outline" @click="$emit('prev')">
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back
      </Button>
      <Button @click="$emit('save', surveyData)" :disabled="!isValid || isLoading">
        <Loader2Icon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        {{ isLoading ? 'Saving...' : 'Save Survey' }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  ArrowLeft,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
  Loader2 as Loader2Icon
} from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Textarea from '~/components/ui/textarea/Textarea.vue'

interface Question {
  text: string
  expectedAnswer: string
  unwantedAnswer: string
}

interface SurveyData {
  name: string
  questions: Question[]
}

const props = defineProps<{
  initialData?: SurveyData
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'save', data: SurveyData): void
}>()

const surveyData = ref<SurveyData>(props.initialData || {
  name: '',
  questions: [createEmptyQuestion()]
})

const isValid = computed(() => {
  return surveyData.value.name.trim() !== '' && 
    surveyData.value.questions.length > 0 &&
    surveyData.value.questions.every(q => q.text.trim() !== '')
})

// Initialize empty question
function createEmptyQuestion(): Question {
  return {
    text: '',
    expectedAnswer: '',
    unwantedAnswer: ''
  }
}

// Add new question
function addQuestion() {
  surveyData.value.questions.push(createEmptyQuestion())
}

// Remove question
function removeQuestion(index: number) {
  surveyData.value.questions.splice(index, 1)
}
</script>
