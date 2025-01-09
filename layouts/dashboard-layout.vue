<template>
    <UContainer class="w-full h-full flex flex-row col-span-12">
        <UContainer class="col-span-2">
            <UVerticalNavigation :links="links"/>
        </UContainer>
        <UContainer class="col-span-10">
            <slot />
        </UContainer>
    </UContainer>   
</template>

<script setup lang="ts">
const links = [{
  id: 'home',
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}]
</script>