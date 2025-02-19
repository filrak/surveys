<script setup>
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote, Star, Briefcase } from 'lucide-vue-next'

const testimonials = [
  {
    id: 1,
    name: 'Alex Thompson',
    initials: 'AT',
    role: 'CTO at TechCorp',
    avatar: 'https://shadcnblocks-vue.com/avatars/1.jpg',
    quote: 'The components are incredibly well-designed and have saved us countless hours of development time. Highly recommended!'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    initials: 'SC',
    role: 'Product Manager',
    avatar: 'https://shadcnblocks-vue.com/avatars/2.jpg',
    quote: 'Outstanding quality and attention to detail. The modern design elements have really elevated our user interface.'
  },
  {
    id: 3,
    name: 'James Wilson',
    initials: 'JW',
    role: 'Lead Developer',
    avatar: 'https://shadcnblocks-vue.com/avatars/3.jpg',
    quote: 'The flexibility and customization options are fantastic. Perfect for both small projects and enterprise applications.'
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
            Client Stories
          </Badge>
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center">
            What People Are Saying
          </h2>
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