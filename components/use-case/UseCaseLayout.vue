<!-- UseCaseLayout.vue -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary-dark/5 dark:via-primary-dark/10 dark:to-primary-dark/5">
      <div class="container mx-auto px-4">
        <slot name="hero" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-background dark:bg-background-dark">
      <div class="container mx-auto px-4">
        <slot name="features" />
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 bg-muted/20 dark:bg-muted-dark/20">
      <div class="container mx-auto px-4">
        <slot name="benefits" />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-background dark:bg-background-dark">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to transform your feedback process?</h2>
        <Button size="lg" variant="default">Start Free Trial</Button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
</script>
