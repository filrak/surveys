<!-- Survey Creation/Edit Page -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-semibold text-gray-900">{{ isEditing ? 'Edit Survey' : 'Create Survey' }}</h1>
      <button 
        @click="router.push('/list')"
        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ArrowLeftIcon class="h-4 w-4 mr-1.5" />
        Back to List
      </button>
    </div>

    <!-- Survey Form -->
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <!-- Survey Name -->
        <div class="mb-8">
          <label for="surveyName" class="block text-sm font-medium text-gray-700">Survey Name</label>
          <div class="mt-1">
            <input 
              id="surveyName"
              v-model="surveyName" 
              type="text" 
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter survey name"
            >
          </div>
        </div>
        
        <!-- Questions List -->
        <div class="space-y-6">
          <div v-for="(question, index) in questions" :key="index" class="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div class="space-y-4">
              <!-- Question Number -->
              <div class="flex justify-between items-center">
                <h3 class="text-sm font-medium text-gray-900">Question {{ index + 1 }}</h3>
                <button 
                  @click="removeQuestion(index)"
                  class="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <TrashIcon class="h-4 w-4 mr-1" />
                  Remove
                </button>
              </div>

              <!-- Question Input -->
              <div>
                <label :for="'question-'+index" class="block text-sm font-medium text-gray-700">Question Text</label>
                <div class="mt-1">
                  <input 
                    :id="'question-'+index"
                    v-model="question.text" 
                    type="text" 
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter your question"
                  >
                </div>
              </div>
              
              <!-- Expected Answer Explanation -->
              <div>
                <label :for="'expected-'+index" class="block text-sm font-medium text-gray-700">Expected Answer Explanation</label>
                <div class="mt-1">
                  <textarea 
                    :id="'expected-'+index"
                    v-model="question.expectedAnswer" 
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="3"
                    placeholder="Explain what kind of answer you expect"
                  ></textarea>
                </div>
              </div>
              
              <!-- Unwanted Answer Pattern -->
              <div>
                <label :for="'unwanted-'+index" class="block text-sm font-medium text-gray-700">Unwanted Answer Pattern</label>
                <div class="mt-1">
                  <textarea 
                    :id="'unwanted-'+index"
                    v-model="question.unwantedAnswer" 
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    rows="2"
                    placeholder="Describe what answers you don't want to get"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="questions.length === 0" class="text-center py-12">
          <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">No questions</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by adding your first question.</p>
        </div>
        
        <!-- Action Buttons -->
        <div class="mt-8 flex justify-between items-center">
          <button 
            @click="addQuestion"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon class="h-4 w-4 mr-1.5" />
            Add Question
          </button>

          <button 
            @click="saveSurvey"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CheckIcon class="h-4 w-4 mr-1.5" />
            {{ isEditing ? 'Save Changes' : 'Create Survey' }}
          </button>
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
  PlusIcon, 
  CheckIcon, 
  TrashIcon, 
  ArrowLeftIcon,
  DocumentTextIcon 
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const surveyId = route.query.id
const isEditing = ref(false)

// Define the questions array with reactive reference
const questions = ref([])
const surveyName = ref('')
const { setSurvey, getSurvey } = useSurvey()

// Load existing survey if editing
onMounted(() => {
  if (surveyId) {
    const survey = getSurvey(surveyId)
    if (survey) {
      isEditing.value = true
      surveyName.value = survey.name
      questions.value = survey.questions
    } else {
      // Survey not found, redirect to list
      router.push('/list')
    }
  }
})

// Function to add a new question
const addQuestion = () => {
  questions.value.push({
    text: '',
    expectedAnswer: '',
    unwantedAnswer: ''
  })
}

// Function to remove a question
const removeQuestion = (index) => {
  questions.value.splice(index, 1)
}

// Function to save the survey
const saveSurvey = () => {
  // Validate survey name
  if (!surveyName.value.trim()) {
    alert('Please enter a survey name')
    return
  }

  // Validate that we have at least one question
  if (questions.value.length === 0) {
    alert('Please add at least one question to the survey')
    return
  }

  // Validate that all questions have required fields
  const isValid = questions.value.every(q => 
    q.text.trim() && q.expectedAnswer.trim()
  )

  if (!isValid) {
    alert('Please fill in all required fields for each question')
    return
  }

  // Save using the composable
  setSurvey({ 
    name: surveyName.value,
    questions: questions.value 
  }, surveyId)

  // Redirect to list page
  router.push('/list')
}
</script>