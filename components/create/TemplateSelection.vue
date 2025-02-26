<template>
  <div class="space-y-6">
    <div v-if="isLoading" class="text-center py-8">
      Loading templates...
    </div>
    
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>
    
    <div v-else>
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
                <CardTitle>{{ template.name }}</CardTitle>
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

      <div class="flex justify-end mt-6">
        <Button @click="handleNext" :disabled="!selectedTemplate">
          Continue
          <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
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
import { useTemplate } from '~/composables/useTemplate'
import type { Template } from '~/services/templateService'
import { useCurrentUser } from 'vuefire'

const selectedTemplate = ref<string>('')
const templates = ref<Template[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const templateService = useTemplate()
const user = useCurrentUser()

const emit = defineEmits<{
  (e: 'next', template: Template): void
}>()

const handleNext = () => {
  const template = templates.value.find(t => t.id === selectedTemplate.value)
  if (template) {
    emit('next', template)
  }
}

const loadTemplates = async () => {
  if (!user.value?.uid) {
    console.log('No user ID available')
    return
  }
  
  isLoading.value = true
  error.value = null
  
  try {
    console.log('Loading templates for user:', user.value.uid)
    templates.value = await templateService.listTemplates(user.value.uid)
    console.log('Loaded templates:', templates.value)
  } catch (err) {
    console.error('Error loading templates:', err)
    error.value = 'Failed to load templates. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Watch for user authentication and load templates when ready
watch(user, () => {
  loadTemplates()
}, { immediate: true })
</script>

<style scoped>
.radio-card:has(input:checked) {
  @apply ring-2 ring-primary;
}
</style>
