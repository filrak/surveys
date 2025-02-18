<!-- App header component -->
<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center">
      <div class="mr-4 flex">
        <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
          <ClipboardIcon class="h-6 w-6" />
          <span class="hidden font-bold sm:inline-block">AI Surveys</span>
        </NuxtLink>
        <nav class="flex items-center space-x-2">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/pricing"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            Pricing
          </NuxtLink>
        </nav>
      </div>

      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div class="flex items-center gap-2">
          <ThemeSwitcher />

          <!-- Auth Button -->
          <NuxtLink
            v-if="user"
            to="/list"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            <ClipboardListIcon class="mr-2 h-4 w-4" />
            My Surveys
          </NuxtLink>
          <template v-if="user">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <UserIcon class="h-4 w-4 mr-2" />
                  {{ user.email }}
                  <ChevronDownIcon class="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <CreditCardIcon class="mr-2 h-4 w-4" />
                    Buy Subscription ($9.99)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="handleSignOut">
                  <LogOutIcon class="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
          </template>
          <template v-else>
            <Button 
              v-if="route.path !== '/login'"
              variant="outline" 
              @click="router.push('/login')"
            >
              <LogInIcon class="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </template>
          <!-- Page Actions -->
          <slot name="actions" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { signOut } from 'firebase/auth'
import { 
  Clipboard as ClipboardIcon,
  User as UserIcon,
  LogIn as LogInIcon,
  LogOut as LogOutIcon,
  ChevronDown as ChevronDownIcon,
  CreditCard as CreditCardIcon,
  ClipboardList as ClipboardListIcon
} from 'lucide-vue-next'
import ThemeSwitcher from '~/components/ui/theme-switcher/ThemeSwitcher.vue'
import Button from '~/components/ui/button/Button.vue'
import DropdownMenu from '~/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '~/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '~/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '~/components/ui/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuSeparator from '~/components/ui/dropdown-menu/DropdownMenuSeparator.vue'

defineProps<{
  showNav?: boolean
}>()

const route = useRoute()
const router = useRouter()
const auth = useFirebaseAuth()!
const user = useCurrentUser()

const handleSignOut = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
</script>
