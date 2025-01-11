<template>
  <NuxtLayout>
    <div class="col-span-10">
      <h1>{{ page }}</h1>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const page = useRoute().name;
definePageMeta({
  layout: "dashboard-layout",
  middleware: ["auth"],
});
</script>
