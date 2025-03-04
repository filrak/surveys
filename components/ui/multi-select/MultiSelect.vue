<!-- Multi Select Component -->
<template>
  <div class="relative w-full">
    <div
      class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer"
      @click="toggleOpen"
    >
      <div class="flex gap-1 flex-wrap">
        <Badge
          v-for="option in modelValue"
          :key="option"
          variant="secondary"
          class="mr-1"
        >
          {{ option }}
          <button
            class="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            @click.stop="removeOption(option)"
          >
            <XIcon class="h-3 w-3" />
          </button>
        </Badge>
        <span v-if="!modelValue.length" class="text-muted-foreground">
          {{ placeholder }}
        </span>
      </div>
      <ChevronsUpDownIcon class="h-4 w-4 opacity-50" />
    </div>
    <div
      v-show="open"
      class="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none"
    >
      <div class="max-h-[200px] overflow-auto p-1">
        <div
          v-for="option in options"
          :key="option"
          class="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
          @click="toggleOption(option)"
        >
          <CheckIcon
            class="mr-2 h-4 w-4"
            :class="{ invisible: !isSelected(option) }"
          />
          <span>{{ option }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Check as CheckIcon, ChevronsUpDown as ChevronsUpDownIcon, X as XIcon } from 'lucide-vue-next'
import Badge from '~/components/ui/badge/Badge.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Select options...'
  },
  searchable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const open = ref(false)

const isSelected = (option) => props.modelValue.includes(option)

const toggleOption = (option) => {
  const newValue = isSelected(option)
    ? props.modelValue.filter(o => o !== option)
    : [...props.modelValue, option]
  emit('update:modelValue', newValue)
}

const removeOption = (option) => {
  emit('update:modelValue', props.modelValue.filter(o => o !== option))
}

const toggleOpen = () => {
  open.value = !open.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
