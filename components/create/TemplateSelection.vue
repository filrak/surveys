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
      <Button @click="$emit('next', selectedTemplate)" :disabled="!selectedTemplate">
        Continue
        <ArrowRight class="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import Card from '@/components/ui/card/Card.vue'
import CardHeader from '@/components/ui/card/CardHeader.vue'
import CardTitle from '@/components/ui/card/CardTitle.vue'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import CardContent from '@/components/ui/card/CardContent.vue'
import RadioGroup from '@/components/ui/radio-group/RadioGroup.vue'
import RadioGroupItem from '@/components/ui/radio-group/RadioGroupItem.vue'
import Button from '@/components/ui/button/Button.vue'

const emit = defineEmits<{
  (e: 'next', templateId: string): void
}>()

const selectedTemplate = ref('')

const templates = [
  {
    id: 'customer-feedback',
    title: 'Customer Feedback',
    description: 'Perfect for gathering feedback about your product or service',
    features: [
      'Product satisfaction questions',
      'Service quality evaluation',
      'Net Promoter Score (NPS)',
      'Open-ended feedback questions'
    ]
  },
  {
    id: 'market-research',
    title: 'Market Research',
    description: 'Understand your target market and customer preferences',
    features: [
      'Demographics questions',
      'Product preferences',
      'Purchase behavior',
      'Competitor analysis'
    ]
  },
  {
    id: 'employee-satisfaction',
    title: 'Employee Satisfaction',
    description: 'Measure employee engagement and workplace satisfaction',
    features: [
      'Work environment assessment',
      'Job satisfaction metrics',
      'Career development feedback',
      'Management effectiveness'
    ]
  },
  {
    id: 'event-feedback',
    title: 'Event Feedback',
    description: 'Collect feedback from event attendees',
    features: [
      'Event organization rating',
      'Content quality assessment',
      'Speaker/presenter feedback',
      'Suggestions for improvement'
    ]
  }
]
</script>

<style scoped>
.radio-card:has(input:checked) {
  @apply ring-2 ring-primary;
}
</style>
