<!-- App header component -->
<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center">
      <div class="mr-4 flex">
        <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
          <ClipboardIcon class="h-6 w-6" />
          <span class="hidden font-bold sm:inline-block">AI Surveys</span>
        </NuxtLink>
      </div>

      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <nav v-if="showNav" class="flex items-center">
          <NuxtLink
            to="/list"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            Surveys
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <ThemeSwitcher />
          <slot name="actions" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ClipboardIcon } from 'lucide-vue-next'
import ThemeSwitcher from '~/components/ui/theme-switcher/ThemeSwitcher.vue'

defineProps<{
  showNav?: boolean
}>()
</script>
