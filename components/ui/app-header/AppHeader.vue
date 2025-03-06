<!-- App header component -->
<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <nav class="container flex h-14 items-center justify-between">
      <!-- Logo and Navigation -->
      <div class="flex items-center space-x-6">
        <NuxtLink class="flex items-center space-x-2" to="/">
          <ClipboardIcon class="h-6 w-6" />
          <span class="hidden font-bold sm:inline-block">Feedback Intelligence</span>
        </NuxtLink>
        
        <!-- Main Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            Home
          </NuxtLink>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Use Cases</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div class="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                    <NuxtLink to="/use-case/product" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div class="text-sm font-medium leading-none">Product Team</div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Get actionable insights about your product from users
                      </p>
                    </NuxtLink>
                    <NuxtLink to="/use-case/marketing" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div class="text-sm font-medium leading-none">Marketing Team</div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Maximize campaign impact and optimize messaging strategies
                      </p>
                    </NuxtLink>
                    <NuxtLink to="/use-case/hr" class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <div class="text-sm font-medium leading-none">HR Team</div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Create a thriving workplace and boost team engagement
                      </p>
                    </NuxtLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NuxtLink
            to="/pricing"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            Pricing
          </NuxtLink>
        </div>
      </div>

      <!-- Right side actions -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center gap-2">
          <!-- Auth Button -->
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
          <NuxtLink
            v-if="user"
            to="/list"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            <ClipboardListIcon class="mr-2 h-4 w-4" />
            Dashboard
          </NuxtLink>
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
          <ThemeSwitcher />
          <slot name="actions" />
        </div>
      </div>
    </nav>
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
import NavigationMenu from '~/components/ui/navigation-menu/NavigationMenu.vue'
import NavigationMenuContent from '~/components/ui/navigation-menu/NavigationMenuContent.vue'
import NavigationMenuItem from '~/components/ui/navigation-menu/NavigationMenuItem.vue'
import NavigationMenuLink from '~/components/ui/navigation-menu/NavigationMenuLink.vue'
import NavigationMenuList from '~/components/ui/navigation-menu/NavigationMenuList.vue'
import NavigationMenuTrigger from '~/components/ui/navigation-menu/NavigationMenuTrigger.vue'

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
