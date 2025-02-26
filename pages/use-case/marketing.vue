<!-- marketing.vue -->
<template>
  <UseCaseLayout>
    <template #hero>
      <div class="max-w-3xl mx-auto text-center space-y-6">
        <h1 class="text-4xl md:text-6xl font-bold">
          Transform Marketing Research with AI-Powered Insights
        </h1>
        <p class="text-xl text-muted-foreground">
          Get deeper insights into your campaigns and audience with conversational surveys that adapt in real-time
        </p>
        <div class="flex justify-center gap-4 pt-4">
          <Button size="lg" variant="default">Start Free Trial</Button>
          <Button size="lg" variant="outline">Watch Demo</Button>
        </div>
      </div>
    </template>

    <template #features>
      <FeatureGrid v-bind="marketingFeatures" />
    </template>

    <template #benefits>
      <div class="max-w-3xl mx-auto space-y-16">
        <h2 class="text-3xl font-bold text-center">What You'll Learn From Events</h2>
        
        <div class="space-y-8">
          <div v-for="question in marketingQuestions" :key="question.text" class="flex gap-4">
            <CheckCircle class="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 class="text-xl font-semibold">{{ formatQuestionTitle(question.text) }}</h3>
              <p class="text-muted-foreground mt-2">{{ question.expectedAnswer }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UseCaseLayout>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-vue-next'
import UseCaseLayout from '@/components/use-case/UseCaseLayout.vue'
import { surveyTemplates } from '@/data/surveyTemplates'
import FeatureGrid from '@/components/features/FeatureGrid.vue'
import { marketingFeatures } from '@/data/features'

const marketingTemplate = surveyTemplates.find(t => t.id === 'event-feedback')
const marketingQuestions = marketingTemplate.questions

const formatQuestionTitle = (question) => {
  // Remove the question mark and everything after it
  const mainPart = question.split('?')[0]
  // Capitalize first letter
  return mainPart.charAt(0).toUpperCase() + mainPart.slice(1)
}
</script>
