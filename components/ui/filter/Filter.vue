<template>
  <div 
    role="tablist" 
    aria-orientation="horizontal" 
    tabindex="0" 
    data-orientation="horizontal" 
    dir="ltr" 
    class="items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-3"
  >
    <button 
      v-for="option in options" 
      :key="option.value"
      role="tab" 
      type="button" 
      :aria-selected="modelValue === option.value" 
      :data-state="modelValue === option.value ? 'active' : 'inactive'"
      data-orientation="horizontal" 
      :tabindex="modelValue === option.value ? 0 : -1"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
      @click="$emit('update:modelValue', option.value)"
    >
      <span class="truncate">{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  options: Array<{
    label: string
    value: string
  }>
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
