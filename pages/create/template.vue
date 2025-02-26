<template>
  <div class="container mx-auto py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-1">
        <h1 class="text-3xl font-bold tracking-tight">Choose the feedback form template</h1>
      </div>
      <p class="text-muted-foreground">
        Select a template that best matches your needs. You will be able to customize it later.
      </p>
    </div>

    <!-- Template Selection -->
    <Card>
      <CardContent class="pt-6">
        <TemplateSelection @next="handleTemplateSelection" />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Template } from '~/services/templateService'

// Import components
import TemplateSelection from '~/components/create/TemplateSelection.vue'
import { Card, CardContent } from '~/components/ui/card'

const router = useRouter()

// Template selection handler
const handleTemplateSelection = (template: Template) => {
  // Store template data in localStorage to pass it to the questions page
  localStorage.setItem('survey_template', JSON.stringify({
    name: template.name,
    type: template.type,
    questions: template.questions || [] // Use template questions if available
  }))
  router.push('/create/questions')
}
</script>
