<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-2 h-screen border-r">
      <div class="flex flex-col gap-4 px-6 py-4">
        <h1 class="text-2xl font-bold text-center">Tickety</h1>
      </div>
      <div>
        <div class="flex items-center gap-2 px-6 pt-4 pb-2">
          <UIcon name="i-heroicons-folder-open" class="w-4 h-4" />
          <h2 class="text-sm font-bold">Projects</h2>
        </div>
        <div v-if="status === 'pending'">
          <USkeleton class="w-full" />
        </div>
        <div v-else class="flex items-center gap-2 px-6 pt-4 pb-2">
          <ul class="flex flex-col gap-2">
            <li v-for="project in projects" :key="project.id">
              <ULink
                :to="`/dashboard/project/${project.id}`"
                :project="project"
              >
                {{ project.name }}
              </ULink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-span-10">
      <slot name="main-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: projects, status } = await useFetch("/api/project/projectList");
</script>
