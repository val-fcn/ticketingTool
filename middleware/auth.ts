export default defineNuxtRouteMiddleware(async (to) => {
  const user = await useSupabaseUser()
  
  if (user.value) {
    // Utilisateur connecté : rediriger vers dashboard si sur la page login ou index
    if (to.path === '/login' || to.path === '/') {
      return navigateTo('/dashboard')
    }
  } else {
    // Utilisateur non connecté : rediriger vers login si tentative d'accès au dashboard
    if (to.path.startsWith('/dashboard')) {
      return navigateTo('/login')
    }
  }
}) 