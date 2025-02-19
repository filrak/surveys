<template>
  <div class="container mx-auto py-8">
    <!-- Header -->
    <div class="flex items-center justify-between space-x-4 pb-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ isEditing ? 'Edit Survey' : 'Create Survey' }}</h1>
        <p class="text-muted-foreground">{{ isEditing ? 'Modify your existing survey' : 'Create a new survey' }}</p>
      </div>
    </div>

    <!-- Stepper -->
    <Stepper v-model="currentStep" class="mb-8">
      <StepperItem
        v-for="step in steps"
        :key="step.step"
        v-slot="{ state }"
        class="relative flex w-full flex-col items-center justify-center"
        :step="step.step"
      >
        <StepperSeparator
          v-if="step.step !== steps[steps.length - 1].step"
          class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
        />

        <StepperTrigger as-child>
          <Button
            :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
            size="icon"
            class="z-10 rounded-full shrink-0"
            :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
          >
            <Check v-if="state === 'completed'" class="size-5" />
            <Circle v-if="state === 'active'" />
            <Dot v-if="state === 'inactive'" />
          </Button>
        </StepperTrigger>

        <div class="mt-5 flex flex-col items-center text-center">
          <StepperTitle
            :class="[state === 'active' && 'text-primary']"
            class="text-sm font-semibold transition lg:text-base"
          >
            {{ step.title }}
          </StepperTitle>
          <StepperDescription
            :class="[state === 'active' && 'text-primary']"
            class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
          >
            {{ step.description }}
          </StepperDescription>
        </div>
      </StepperItem>
    </Stepper>

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
import { Check, Circle, Dot } from 'lucide-vue-next'

// Import components
import TemplateSelection from '~/components/create/TemplateSelection.vue'
import SurveyDetails from '~/components/create/SurveyDetails.vue'
import Card from '~/components/ui/card/Card.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import Button from '~/components/ui/button/Button.vue'
import Stepper from '~/components/ui/stepper/Stepper.vue'
import StepperDescription from '~/components/ui/stepper/StepperDescription.vue'
import StepperItem from '~/components/ui/stepper/StepperItem.vue'
import StepperSeparator from '~/components/ui/stepper/StepperSeparator.vue'
import StepperTitle from '~/components/ui/stepper/StepperTitle.vue'
import StepperTrigger from '~/components/ui/stepper/StepperTrigger.vue'

const route = useRoute()
const router = useRouter()
const { getSurvey, setSurvey } = useSurvey()

const currentStep = ref(1)
const isLoading = ref(false)
const surveyData = ref({
  name: '',
  questions: []
})

const steps = [
  {
    step: 1,
    title: 'Choose Template',
    description: 'Select a survey template',
  },
  {
    step: 2,
    title: 'Survey Details',
    description: 'Customize your survey questions',
  }
]

const isEditing = computed(() => !!route.query.id)

// Template selection handler
const handleTemplateSelection = (templateId: string) => {
  // Here we will load the template questions
  // For now, just move to next step
  currentStep.value = 2
}

// Save survey
const saveSurvey = async (data) => {
  try {
    isLoading.value = true
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
    currentStep.value = 2 // Skip template selection when editing
  } else {
    router.push('/list')
  }
}
</script>