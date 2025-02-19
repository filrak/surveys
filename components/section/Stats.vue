<script setup>
import { ref, onMounted } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ChartBar, BookCheck, Building2, Trophy, Star } from 'lucide-vue-next'

const statsData = [
  {
    label: 'Feedbacks gathered',
    value: 15000,
    icon: BookCheck,
    suffix: '+',
    decimals: 0
  },
  {
    label: 'Happy Customers',
    value: 2000,
    icon: Building2,
    suffix: '+',
    decimals: 0
  },
  {
    label: 'Completion Rate',
    value: 85,
    icon: Trophy,
    decimals: 1,
    suffix: '%'
  },
  {
    label: 'Customer Rating',
    value: 4.9,
    icon: Star,
    decimals: 1,
    suffix: '/5'
  }
]

const stats = ref(statsData.map(stat => ({
  ...stat,
  displayValue: '0'
})))

const animateValue = (stat, index) => {
  const duration = 2000 // 2 seconds
  const steps = 60
  const stepDuration = duration / steps
  let currentStep = 0

  const interval = setInterval(() => {
    currentStep++
    const progress = currentStep / steps
    const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic easing

    const currentValue = stat.value * easedProgress
    stats.value[index].displayValue = currentValue.toFixed(stat.decimals)

    if (currentStep >= steps) {
      clearInterval(interval)
      stats.value[index].displayValue = stat.value.toFixed(stat.decimals)
    }
  }, stepDuration)
}

onMounted(() => {
  stats.value.forEach((stat, index) => {
    setTimeout(() => {
      animateValue(stat, index)
    }, index * 200) // Stagger the animations
  })
})

const testimonial = {
  quote: 'This platform has transformed how we handle our business operations. The statistics speak for themselves - it\'s been an incredible journey.',
  author: 'Sarah Johnson',
  role: 'CEO at TechCorp',
  avatar: 'https://shadcnblocks-vue.com/avatars/sarah-johnson.jpg',
  initials: 'SJ'
}
</script>

<template>
  <section class="relative w-full flex items-center py-8 md:py-16 lg:py-24">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center space-y-4 mb-12">
        <Badge variant="outline" class="mb-4">
          <ChartBar class="mr-2 size-4" />
          Our Impact
        </Badge>
        <h2 class="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Join the 2,000 companies using AI Surveys
        </h2>
        <p class="text-muted-foreground md:text-lg max-w-2xl mx-auto">
            Start getting better answers with our AI-powered surveys.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card v-for="stat in stats" :key="stat.label"
          class="text-center p-6 transition-all duration-300 hover:border-primary bg-card">
          <component :is="stat.icon" class="mx-auto mb-4 size-8 text-primary" />
          <div class="space-y-2">
            <h3 class="text-3xl font-bold tracking-tight text-card-foreground">
              {{ stat.displayValue }}{{ stat.suffix }}
            </h3>
            <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
          </div>
        </Card>
      </div>

      <!-- Testimonial -->
      <div class="mt-24">
        <div class="bg-muted dark:bg-muted/50 py-16 px-4">
          <blockquote class="max-w-3xl mx-auto">
            <p class="text-xl font-medium italic text-foreground">
              "{{ testimonial.quote }}"
            </p>
            <footer class="mt-6">
              <div class="flex items-center justify-center gap-3">
                <Avatar class="size-12 border-2 border-primary">
                  <AvatarImage :src="testimonial.avatar" :alt="testimonial.author" />
                  <AvatarFallback class="bg-primary text-primary-foreground">{{ testimonial.initials }}</AvatarFallback>
                </Avatar>
                <div class="text-left">
                  <p class="font-semibold text-foreground">{{ testimonial.author }}</p>
                  <p class="text-sm text-muted-foreground">{{ testimonial.role }}</p>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>