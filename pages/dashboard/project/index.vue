<template #main-content>
  <NuxtLayout>
    <UContainer class="flex flex-row p-4 gap-4">
      <UButton>Create Project</UButton>
    </UContainer>
    <UDivider />
    <UContainer class="flex flex-row p-4 gap-4">
      <UTable
        class="w-full border border-gray-200 rounded-md"
        :rows="projects || []"
        :columns="columns"
        :empty-state="{
          icon: 'i-heroicons-folder-open',
          label: 'No items.',
        }"
        @select="handleSelect"
        :ui="{
          td: {
            base: 'cursor-pointer',
          },
        }"
      />
    </UContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
  key: (route) => route.fullPath,
});

// TYPES
interface Project {
  id: string;
  name: string;
}
const router = useRouter();

// FETCH
const { data: projects, status } = await useFetch("/api/project/projectList");

// FUNCTIONS
const handleSelect = (row: Project) => {
  router.push(`/dashboard/project/${row.id}`);
};

const columns = [
  {
    key: "name",
    label: "Projet",
  },
  {
    key: "created_at",
    label: "Créé le",
  },
];
</script>
