<!-- Survey Creation Page -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">Create Survey</h1>
    
    <!-- Questions List -->
    <div class="space-y-6">
      <div v-for="(question, index) in questions" :key="index" class="bg-white p-6 rounded-lg shadow-md">
        <div class="space-y-4">
          <!-- Question Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Question</label>
            <input 
              v-model="question.text" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your question"
            >
          </div>
          
          <!-- Expected Answer Explanation -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Expected Answer Explanation</label>
            <textarea 
              v-model="question.expectedAnswer" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
              placeholder="Explain what kind of answer you expect"
            ></textarea>
          </div>
          
          <!-- Unwanted Answer Pattern -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Unwanted Answer Pattern</label>
            <textarea 
              v-model="question.unwantedAnswer" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="2"
              placeholder="Describe what answers you don't want to get"
            ></textarea>
          </div>
          
          <!-- Remove Question Button -->
          <button 
            @click="removeQuestion(index)"
            class="text-red-600 hover:text-red-800"
          >
            Remove Question
          </button>
        </div>
      </div>
    </div>
    
    <!-- Add Question Button -->
    <button 
      @click="addQuestion"
      class="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Add Question
    </button>
    
    <!-- Save Survey Button -->
    <button 
      @click="saveSurvey"
      class="mt-6 ml-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      Save Survey
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Define the questions array with reactive reference
const questions = ref([])

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

  // Save to localStorage
  const surveys = JSON.parse(localStorage.getItem('surveys') || '[]')
  surveys.push({
    id: Date.now(),
    questions: questions.value,
    createdAt: new Date().toISOString()
  })
  localStorage.setItem('surveys', JSON.stringify(surveys))

  // Clear the form
  questions.value = []
  alert('Survey saved successfully!')
}
</script>
