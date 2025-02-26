<!-- FeatureGrid.vue -->
<script setup lang="ts">
import {
  MessageSquareText,
  Brain,
  TrendingUp,
  Target,
  LineChart,
  Zap,
} from 'lucide-vue-next'

interface Feature {
  title: string
  description: string
  icon: any
}

defineProps<{
  title: string
  subtitle: string
  description: string
  features: Feature[]
}>()
</script>

<template>
  <section class="relative w-full flex items-center py-8 md:py-16 lg:py-24">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12 max-w-3xl mx-auto">
        <p class="text-sm font-medium text-primary mb-4">{{ subtitle }}</p>
        <h2 class="text-4xl font-bold tracking-tighter sm:text-5xl" v-html="title"></h2>
        <p class="mt-4 text-lg text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
        <div v-for="(feature, idx) in features" :key="idx"
          class="group relative bg-card p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border">
          <!-- Icon Container -->
          <div class="mb-6">
            <div
              class="inline-flex items-center justify-center size-14 rounded-xl bg-primary/10 group-hover:bg-primary transition-colors duration-300">
              <component :is="feature.icon"
                class="size-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
          </div>

          <!-- Content -->
          <div>
            <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </div>

          <!-- Hover Effect Line -->
          <div
            class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </div>
    </div>
  </section>
</template>
