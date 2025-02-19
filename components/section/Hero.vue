<template>
  <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center space-y-4 text-center">
        <div class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Tired of low-quality feedback?
          </h1>
          <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Design intelligent surveys that adapt to your respondents and get the information you want. Get deeper
            insights with our AI-driven analysis.
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

        <div class="mx-auto mt-10 flex w-fit flex-col items-center gap-2 sm:flex-row">
          <span
            class="mx-4 mt-5 inline-flex items-center -space-x-4"><span
              class="inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden text-xs rounded-full size-14 border hover:-translate-y-1 transition-transform"><img
                role="img" src="/avatars/1.jpg" class="h-full w-full object-cover" alt="Developer 1"
                style=""></span><span
              class="inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden text-xs rounded-full size-14 border hover:-translate-y-1 transition-transform"><img
                role="img" src="/avatars/2.jpg" class="h-full w-full object-cover" alt="Developer 2"
                style=""></span><span
              class="inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden text-xs rounded-full size-14 border hover:-translate-y-1 transition-transform"><img
                role="img" src="/avatars/3.jpg" class="h-full w-full object-cover" alt="Developer 3"
                style=""></span><span
              class="inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden text-xs rounded-full size-14 border hover:-translate-y-1 transition-transform"><img
                role="img" src="/avatars/4.jpg" class="h-full w-full object-cover" alt="Developer 4"
                style=""></span><span
              class="inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden text-xs rounded-full size-14 border hover:-translate-y-1 transition-transform"><img
                role="img" src="/avatars/5.jpg" class="h-full w-full object-cover" alt="Developer 5"
                style=""></span></span>
          <div>
            <div class="flex mt-5 items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-star-icon size-5 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform">
                <path
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                </path>
              </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-star-icon size-5 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform">
                <path
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                </path>
              </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-star-icon size-5 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform">
                <path
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                </path>
              </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-star-icon size-5 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform">
                <path
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                </path>
              </svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-star-icon size-5 fill-yellow-400 text-yellow-400 hover:scale-110 transition-transform">
                <path
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
                </path>
              </svg><span class="font-semibold">4.9</span></div>
            <p class="text-left font-medium text-muted-foreground"> from over 200 reviews </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from '~/components/ui/button/Button.vue'
</script>