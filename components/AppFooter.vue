<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LinkedinIcon, TwitterIcon } from 'lucide-vue-next'

const footerLinks = {
  product: [
    { name: 'Features', href: '#' },
    { name: 'Use Cases', href: '#' },
    { name: 'Templates', href: '#' },
    { name: 'Analytics', href: '#' }
  ],
  solutions: [
    { name: 'Product Teams', href: '/use-case/product' },
    { name: 'HR Teams', href: '/use-case/hr' },
    { name: 'Marketing Teams', href: '/use-case/marketing' },
    { name: 'Enterprise', href: '#' }
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' }
  ]
}

const socialLinks = [
  { icon: LinkedinIcon, href: '#' },
  { icon: TwitterIcon, href: '#' }
]
</script>

<template>
  <section class="relative w-full flex items-center py-8 md:py-16 lg:py-24">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between gap-12 lg:gap-40">

        <!-- Brand Column -->
        <div class="space-y-6 max-w-[300px]">
          <div class="flex items-center space-x-2">
            <div class="size-8 rounded-lg bg-primary/10" />
            <span class="text-xl font-bold">Feedback Intelligence</span>
          </div>
          <p class="text-muted-foreground">
            Transform your feedback into actionable insights with AI-powered surveys and analytics.
          </p>
          <div class="space-y-4">
            <h3 class="font-medium">Get product updates</h3>
            <div class="flex gap-2">
              <Input type="email" placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
          <!-- Product Links -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold">Product</h3>
            <ul class="space-y-3">
              <li v-for="link in footerLinks.product" :key="link.name">
                <a :href="link.href" class="text-muted-foreground hover:text-primary transition-colors">
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </div>
          <!-- Solutions Links -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold">Solutions</h3>
            <ul class="space-y-3">
              <li v-for="link in footerLinks.solutions" :key="link.name">
                <a :href="link.href" class="text-muted-foreground hover:text-primary transition-colors">
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </div>
          <!-- Resources Links -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold">Resources</h3>
            <ul class="space-y-3">
              <li v-for="link in footerLinks.resources" :key="link.name">
                <a :href="link.href" class="text-muted-foreground hover:text-primary transition-colors">
                  {{ link.name }}
                </a>
              </li>
            </ul>
            <!-- Social Links -->
            <div class="flex gap-4 pt-4">
              <a v-for="social in socialLinks" :key="social.href" :href="social.href"
                class="text-muted-foreground hover:text-primary transition-colors">
                <component :is="social.icon" class="size-5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="border-t mt-16 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-muted-foreground">
            2025 Feedback Intelligence. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" class="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
