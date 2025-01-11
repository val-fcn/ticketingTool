<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <h1 class="text-2xl font-bold">Chargement...</h1>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>
