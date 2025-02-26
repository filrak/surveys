<template>
  <div class="container mx-auto py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-1">
        <h1 class="text-3xl font-bold tracking-tight">Customize the questions</h1>
      </div>
      <p class="text-muted-foreground">
        {{ isEditing ? 'Modify your existing survey questions' : 'Customize the template questions or add your own' }}
      </p>
    </div>

    <!-- Survey Details -->
    <Card>
      <CardContent class="pt-6">
        <SurveyDetails
          :initial-data="surveyData"
          :is-loading="isLoading"
          @prev="router.push('/create/template')"
          @save="saveSurvey"
        />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { useSurvey } from '~/composables/useSurvey'

// Import components
import SurveyDetails from '~/components/create/SurveyDetails.vue'
import { Card, CardContent } from '~/components/ui/card'

const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const currentUser = useCurrentUser()
const { setSurvey, getSurvey } = useSurvey()

const isEditing = computed(() => Boolean(route.query.id))

// Data for the survey
interface Question {
  text: string
  expectedAnswer: string
  unwantedAnswer: string
}

interface Survey {
  name: string
  type: string
  questions: Question[]
}

const surveyData = ref<Survey>({
  name: '',
  type: '',
  questions: [{
    text: '',
    expectedAnswer: '',
    unwantedAnswer: ''
  }]
})

// Save survey
const saveSurvey = async (data: Survey) => {
  if (!currentUser.value) return
  
  isLoading.value = true
  try {
    await setSurvey(data, isEditing.value ? route.query.id as string : undefined)
    router.push('/list') 
  } catch (error) {
    console.error('Error saving survey:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  if (isEditing.value) {
    // Load existing survey if editing
    isLoading.value = true
    try {
      const survey = await getSurvey(route.query.id as string)
      if (survey) {
        surveyData.value = survey
      }
    } catch (error) {
      console.error('Error loading survey:', error)
    } finally {
      isLoading.value = false
    }
  } else {
    // Load template data from localStorage
    const templateData = localStorage.getItem('survey_template')
    if (templateData) {
      const template = JSON.parse(templateData)
      surveyData.value = {
        name: template.name,
        type: template.type,
        questions: template.questions.map((q: any) => ({
          text: q.text || '',
          expectedAnswer: q.expectedAnswer || '',
          unwantedAnswer: q.unwantedAnswer || ''
        }))
      }
    }
  }
})
</script>
