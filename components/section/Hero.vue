<template>
  <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center space-y-4 text-center">
        <div class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Create AI-Powered Surveys
          </h1>
          <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Design intelligent surveys that adapt to your respondents. Get deeper insights with our AI-driven analysis.
          </p>
        </div>
        <div class="space-x-4">
          <Button size="lg" @click="$router.push('/signup')">
            Get Started
          </Button>
          <Button variant="outline" size="lg" @click="$router.push('/pricing')">
            View Pricing
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'
</script>