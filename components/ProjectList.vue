<template>
  <div class="flex flex-col gap-2">
    <div v-if="status === 'pending'" class="flex flex-col gap-2 p-4">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-3/4" />
    </div>
    <div v-else>
      <ULink
        v-for="project in projects"
        :key="project.id"
        :to="`/dashboard/project/${project.id}`"
        class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md"
      >
        <span>{{ project.name }}</span>
      </ULink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: projects, status } = await useAsyncData(
  "projects-list",
  () => $fetch("/api/project/projectList"),
  {
    server: true,
    transform: (projects) => projects || [],
  }
);
</script>
