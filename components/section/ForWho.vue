<template>
  <section class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users mr-2 size-4">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          For Every Team
        </div>
        <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Empower Your Team with AI Insights</h2>
        <p class="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
          Transform feedback into actionable insights for every department
        </p>
      </div>

      <div class="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
        <!-- Product Team -->
        <NuxtLink to="/use-case/product" class="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all hover:shadow-lg group">
          <div class="absolute right-4 top-4 z-20">
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Product</div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 group-hover:scale-105 transition-transform duration-300"></div>
          <div class="flex flex-col gap-y-1.5 p-6 relative z-20">
            <div class="size-12 rounded-lg bg-background/90 p-3 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-full text-blue-600">
                <path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98a1 1 0 0 0 .9 1.45h16a1 1 0 0 0 .9-1.45Z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold leading-none tracking-tight mt-4 text-white">Product Team</h3>
            <p class="text-sm text-zinc-200">Build what users truly need</p>
          </div>
          <div class="p-6 pt-0 relative z-20">
            <div class="mt-2 space-y-4">
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Validate feature ideas</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Improve user experience</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Prioritize roadmap</span>
              </div>
            </div>
            <div class="mt-6">
              <span class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-900 hover:bg-white/90 h-10 px-4 py-2 w-full">
                Learn More
                <ArrowRight class="ml-2 h-4 w-4" />
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- HR Team -->
        <NuxtLink to="/use-case/hr" class="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all hover:shadow-lg group">
          <div class="absolute right-4 top-4 z-20">
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">HR</div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 group-hover:scale-105 transition-transform duration-300"></div>
          <div class="flex flex-col gap-y-1.5 p-6 relative z-20">
            <div class="size-12 rounded-lg bg-background/90 p-3 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-full text-purple-600">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold leading-none tracking-tight mt-4 text-white">HR Team</h3>
            <p class="text-sm text-zinc-200">Create a thriving workplace</p>
          </div>
          <div class="p-6 pt-0 relative z-20">
            <div class="mt-2 space-y-4">
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Boost team engagement</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Improve workplace culture</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Drive employee growth</span>
              </div>
            </div>
            <div class="mt-6">
              <span class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-900 hover:bg-white/90 h-10 px-4 py-2 w-full">
                Learn More
                <ArrowRight class="ml-2 h-4 w-4" />
              </span>
            </div>
          </div>
        </NuxtLink>

        <!-- Marketing Team -->
        <NuxtLink to="/use-case/marketing" class="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all hover:shadow-lg group">
          <div class="absolute right-4 top-4 z-20">
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Marketing</div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-green-700 group-hover:scale-105 transition-transform duration-300"></div>
          <div class="flex flex-col gap-y-1.5 p-6 relative z-20">
            <div class="size-12 rounded-lg bg-background/90 p-3 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-full text-green-600">
                <path d="M5.8 11.3 2 22l10.7-3.79"/>
                <path d="M4 3h.01"/>
                <path d="M22 8h.01"/>
                <path d="M15 2h.01"/>
                <path d="M22 20h.01"/>
                <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/>
                <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"/>
                <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"/>
                <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold leading-none tracking-tight mt-4 text-white">Marketing Team</h3>
            <p class="text-sm text-zinc-200">Drive campaign success</p>
          </div>
          <div class="p-6 pt-0 relative z-20">
            <div class="mt-2 space-y-4">
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Optimize messaging</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Measure event impact</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Track engagement</span>
              </div>
            </div>
            <div class="mt-6">
              <span class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-900 hover:bg-white/90 h-10 px-4 py-2 w-full">
                Learn More
                <ArrowRight class="ml-2 h-4 w-4" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'
</script>
