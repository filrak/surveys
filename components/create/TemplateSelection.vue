<template>
  <div class="space-y-6">
    <RadioGroup v-model="selectedTemplate" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RadioGroupItem 
        v-for="template in templates" 
        :key="template.id"
        :value="template.id"
        class="sr-only"
      />
      <div v-for="template in templates" :key="template.id">
        <label 
          :for="template.id"
          class="relative block cursor-pointer"
          :class="{ 'ring-2 ring-primary': selectedTemplate === template.id }"
        >
          <Card class="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>{{ template.title }}</CardTitle>
              <CardDescription>{{ template.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul class="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li v-for="(feature, index) in template.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </CardContent>
          </Card>
          <input 
            type="radio" 
            :id="template.id" 
            :name="template.id" 
            :value="template.id" 
            v-model="selectedTemplate"
            class="sr-only"
          />
        </label>
      </div>
    </RadioGroup>

    <div class="flex justify-end">
      <Button @click="handleNext" :disabled="!selectedTemplate">
        Continue
        <ArrowRight class="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { surveyTemplates, type SurveyTemplate } from '@/data/surveyTemplates'
import Button from '@/components/ui/button/Button.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'

const selectedTemplate = ref<string>('')

const emit = defineEmits<{
  (e: 'next', template: SurveyTemplate): void
}>()

const handleNext = () => {
  const template = surveyTemplates.find(t => t.id === selectedTemplate.value)
  if (template) {
    emit('next', template)
  }
}

const templates = surveyTemplates
</script>

<style scoped>
.radio-card:has(input:checked) {
  @apply ring-2 ring-primary;
}
</style>
