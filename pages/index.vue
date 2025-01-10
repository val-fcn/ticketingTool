<template>
    <UContainer class="min-h-screen flex items-center justify-center">
        <h1 class="text-2xl font-bold">Chargement...</h1>
    </UContainer>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { navigateTo } from '#app'

  onMounted(() => {
    navigateTo('/login')
  })
  </script>