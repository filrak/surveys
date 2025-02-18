// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    // Skip middleware for home page
    if (to.path === '/') return

    const user = await getCurrentUser()
  
    // redirect the user to the login page
    if (!user && to.path !== '/login' && to.path !== '/signup') {
      return navigateTo({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  })