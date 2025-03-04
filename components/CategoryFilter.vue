<!-- Category Filter Component -->
<template>
  <div class="flex items-center gap-2">
    <MultiSelect
      v-model="selectedCategories"
      :options="availableCategories"
      :searchable="false"
      placeholder="Filter by category"
      class="w-[200px]"
      @update:modelValue="handleSelectionChange"
    />
    <Button
      v-if="selectedCategories.length"
      variant="ghost"
      size="sm"
      @click="clearFilters"
    >
      <XIcon class="h-4 w-4" />
    </Button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { X as XIcon } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import MultiSelect from '~/components/ui/multi-select/MultiSelect.vue'

const props = defineProps({
  surveys: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:selected'])

const selectedCategories = ref([])

const availableCategories = computed(() => {
  const categories = new Set(props.surveys.map(survey => survey.category || 'No category'))
  return Array.from(categories).sort()
})

const handleSelectionChange = (newValue) => {
  selectedCategories.value = newValue
  emit('update:selected', newValue)
}

const clearFilters = () => {
  selectedCategories.value = []
  emit('update:selected', [])
}

// Reset selection when surveys change
watch(() => props.surveys, () => {
  selectedCategories.value = []
}, { deep: true })
</script>
