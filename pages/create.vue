<template>
  <div class="container mx-auto py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-1">
        <h1 class="text-3xl font-bold tracking-tight">
          {{ currentStep === 1 ? 'Choose the feedback form template' : 'Customize the questions' }}
        </h1>
        <div class="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-sm font-medium">
          <span :class="currentStep === 1 ? 'text-primary' : 'text-muted-foreground'">1</span>
          <span class="text-muted-foreground">/</span>
          <span :class="currentStep === 2 ? 'text-primary' : 'text-muted-foreground'">2</span>
        </div>
      </div>
      <p class="text-muted-foreground">
        {{ currentStep === 1 
          ? 'Select a template that best matches your needs. You will be able to customize it later.' 
          : isEditing 
            ? 'Modify your existing survey questions' 
            : 'Customize the template questions or add your own'
        }}
      </p>
    </div>

    <!-- Step Content -->
    <Card>
      <CardContent class="pt-6">
        <TemplateSelection
          v-if="currentStep === 1"
          @next="handleTemplateSelection"
        />
        <SurveyDetails
          v-else-if="currentStep === 2"
          :initial-data="surveyData"
          :is-loading="isLoading"
          @prev="currentStep = 1"
          @save="saveSurvey"
        />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'
import { useSurvey } from '~/composables/useSurvey'
import type { SurveyTemplate } from '~/data/surveyTemplates'

// Import components
import TemplateSelection from '~/components/create/TemplateSelection.vue'
import SurveyDetails from '~/components/create/SurveyDetails.vue'
import { Card, CardContent } from '~/components/ui/card'

const currentStep = ref(1)
const isLoading = ref(false)
const route = useRoute()
const router = useRouter()
const currentUser = useCurrentUser()
const { setSurvey, getSurvey } = useSurvey()

const isEditing = computed(() => Boolean(route.query.id))

// Data for the survey
const surveyData = ref({
  name: '',
  questions: [{
    text: '',
    expectedAnswer: '',
    unwantedAnswer: ''
  }]
})

// Template selection handler
const handleTemplateSelection = (template: SurveyTemplate) => {
  surveyData.value = {
    name: template.title,
    questions: [...template.questions]
  }
  currentStep.value = 2
}

// Save survey
const saveSurvey = async (data: typeof surveyData.value) => {
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

// Load existing survey if editing
if (isEditing.value) {
  const survey = getSurvey(route.query.id as string)
  if (survey) {
    surveyData.value = survey
  }
}
</script>