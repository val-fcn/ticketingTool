<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">
        {{ props.error?.statusCode || "500" }}
      </h1>
      <p class="mb-4">
        {{ props.error?.message || "Une erreur s'est produite" }}
      </p>
      <UButton @click="handleError">Retour à l'accueil</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const user = useSupabaseUser();

function handleError() {
  if (user) {
    clearError({ redirect: "/dashboard" });
  } else {
    clearError({ redirect: "/login" });
  }
}
</script>
