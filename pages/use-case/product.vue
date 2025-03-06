<!-- product.vue -->
<template>
  <UseCaseLayout>
    <template #hero>
      <div class="max-w-3xl mx-auto text-center space-y-6">
        <h1 class="text-4xl md:text-6xl font-bold">
          Transform Product Development with Intelligent User Insights
        </h1>
        <p class="text-xl text-muted-foreground">
          Get actionable product feedback and user insights through intelligent, adaptive conversations
        </p>
        <div class="flex justify-center gap-4 pt-4">
          <Button size="lg" variant="default">Start Free Trial</Button>
          <Button size="lg" variant="outline">Watch Demo</Button>
        </div>
      </div>
    </template>

    <template #features>
      <FeatureGrid v-bind="productFeatures" />
    </template>

    <template #benefits>
      <div class="max-w-3xl mx-auto space-y-16">
        <h2 class="text-3xl font-bold text-center">What You'll Learn From Users</h2>
        
        <div class="space-y-8">
          <div v-for="question in productQuestions" :key="question.text" class="flex gap-4">
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
import { productFeatures } from '@/data/features'

const productTemplate = surveyTemplates.find(t => t.id === 'product-feedback')
const productQuestions = productTemplate.questions

const formatQuestionTitle = (question) => {
  // Remove the question mark and everything after it
  const mainPart = question.split('?')[0]
  // Capitalize first letter
  return mainPart.charAt(0).toUpperCase() + mainPart.slice(1)
}
</script>
