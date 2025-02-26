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
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all hover:shadow-lg">
          <div class="absolute right-4 top-4 z-20">
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Product</div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"></div>
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
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-900 hover:bg-white/90 h-10 px-4 py-2 w-full">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <!-- HR Team -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all hover:shadow-lg">
          <div class="absolute right-4 top-4 z-20">
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">HR</div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700"></div>
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
                <span class="text-sm">Enhance work culture</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Drive talent growth</span>
              </div>
            </div>
            <div class="mt-6">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-900 hover:bg-white/90 h-10 px-4 py-2 w-full">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <!-- Marketing Team -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all hover:shadow-lg">
          <div class="absolute right-4 top-4 z-20">
            <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">Marketing</div>
          </div>
          <div class="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-green-700"></div>
          <div class="flex flex-col gap-y-1.5 p-6 relative z-20">
            <div class="size-12 rounded-lg bg-background/90 p-3 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-full text-green-600">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.29 7 12 12 20.71 7"/>
                <line x1="12" y1="22" x2="12" y2="12"/>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold leading-none tracking-tight mt-4 text-white">Marketing Team</h3>
            <p class="text-sm text-zinc-200">Maximize campaign impact</p>
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
                <span class="text-sm">Measure brand impact</span>
              </div>
              <div class="flex items-center gap-2 text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                <span class="text-sm">Target effectively</span>
              </div>
            </div>
            <div class="mt-6">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-zinc-900 hover:bg-white/90 h-10 px-4 py-2 w-full">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
