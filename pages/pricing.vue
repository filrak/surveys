<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckIcon } from 'lucide-vue-next'

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$9',
    description: 'Perfect for small projects and individuals',
    features: [
      'Up to 5 projects',
      '2GB storage',
      'Basic support',
      'Basic analytics',
      'Team collaboration'
    ]
  },
  {
    name: 'Professional',
    price: '$29',
    description: 'Best for growing businesses',
    features: [
      'Unlimited projects',
      '20GB storage',
      'Priority support',
      'Advanced analytics',
      'Team collaboration',
      'Custom domains',
      'API access'
    ],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    description: 'For large organizations',
    features: [
      'Unlimited everything',
      'Unlimited storage',
      '24/7 support',
      'Custom analytics',
      'Advanced security',
      'SLA guarantee',
      'Custom integration',
      'Dedicated account manager'
    ]
  }
]
</script>

<template>
  <section class="relative w-full flex items-center py-8 md:py-16 lg:py-24">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center space-y-4 mb-8 md:mb-12">
        <h2 class="text-3xl font-bold tracking-tight md:text-5xl">Simple, transparent pricing</h2>
        <p class="text-muted-foreground md:text-lg">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <Card v-for="tier in tiers" :key="tier.name" :class="[
          'relative p-6 lg:p-8',
          tier.highlighted ? 'border-primary shadow-lg scale-[1.02]' : ''
        ]">
          <!-- Popular Badge -->
          <div v-if="tier.highlighted" class="absolute -top-4 left-1/2 -translate-x-1/2">
            <span class="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>

          <!-- Tier Header -->
          <div class="space-y-2 mb-6">
            <h3 class="font-semibold text-xl">{{ tier.name }}</h3>
            <div class="flex items-baseline">
              <span class="text-4xl font-bold">{{ tier.price }}</span>
              <span class="text-muted-foreground ml-1">/month</span>
            </div>
            <p class="text-sm text-muted-foreground">{{ tier.description }}</p>
          </div>

          <!-- Features List -->
          <ul class="space-y-2 mb-6">
            <li v-for="feature in tier.features" :key="feature" class="flex items-center text-sm">
              <CheckIcon class="mr-2 h-4 w-4 text-primary" />
              {{ feature }}
            </li>
          </ul>

          <!-- CTA Button -->
          <Button :variant="tier.highlighted ? 'default' : 'outline'" class="w-full">
            Get Started
          </Button>
        </Card>
      </div>

      <!-- Money Back Guarantee -->
      <p class="text-center text-sm text-muted-foreground mt-8">
        30-day money-back guarantee. No questions asked.
      </p>
    </div>
  </section>
</template>
