<script setup>
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote, Star, Briefcase } from 'lucide-vue-next'

const testimonials = [
  {
    id: 1,
    name: 'Emily Rodriguez',
    initials: 'ER',
    role: 'HR Director',
    avatar: 'https://shadcnblocks-vue.com/avatars/1.jpg',
    quote: 'The AI chat helps us gather detailed employee feedback that actually drives meaningful workplace improvements. It\'s like having a skilled interviewer for every survey.'
  },
  {
    id: 2,
    name: 'David Park',
    initials: 'DP',
    role: 'Product Manager',
    avatar: 'https://shadcnblocks-vue.com/avatars/2.jpg',
    quote: 'We\'ve cut our feedback analysis time by 80%. The AI instantly surfaces patterns and insights that would take weeks to find manually.'
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    initials: 'ST',
    role: 'Marketing Lead',
    avatar: 'https://shadcnblocks-vue.com/avatars/3.jpg',
    quote: 'Game-changer for our marketing campaigns. We get precise customer sentiment and preferences that directly inform our messaging strategy.'
  }
]
</script>

<template>
  <section class="relative w-full flex items-center py-8 md:py-16 lg:py-24">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <!-- Content -->
      <div class="flex flex-col items-center">
        <!-- Header -->
        <div class="mb-16 flex items-center justify-center gap-2 flex-col">
          <Badge variant="outline" class="mb-4">
            <Quote class="mr-2 size-4" />
            Success Stories
          </Badge>
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            Transforming Feedback into Action
          </h2>
          <p class="mt-4 text-muted-foreground text-center max-w-[600px]">
            See how teams use Feedback Intelligence to get precise insights and make data-driven decisions
          </p>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="testimonial in testimonials" :key="testimonial.id" class="relative">
            <CardHeader>
              <div class="flex items-center gap-4">
                <Avatar class="size-12">
                  <AvatarImage :src="testimonial.avatar" :alt="testimonial.name" />
                  <AvatarFallback>{{ testimonial.initials }}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{{ testimonial.name }}</CardTitle>
                  <CardDescription class="flex items-center gap-1">
                    <Briefcase class="size-3" />
                    {{ testimonial.role }}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p class="text-muted-foreground">{{ testimonial.quote }}</p>
              <div class="mt-4 flex items-center gap-1">
                <Star v-for="i in 5" :key="i" class="size-4 fill-yellow-400 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>