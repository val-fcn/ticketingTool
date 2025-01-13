<template #main-content>
  <NuxtLayout>
    <UContainer class="flex flex-col px-6 py-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">{{ project?.name }}</h1>
        <UButton icon="i-heroicons-plus" label="Nouveau ticket" />
      </div>
      <div v-if="ticketsStatus === 'loading'">
        <USkeleton class="w-full" />
      </div>
      <div v-else>
        <UTable
          class="w-full border border-gray-200 rounded-md"
          :rows="tickets || []"
          :columns="columns"
        />
      </div>
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

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: string;
}

// VARIABLES
const route = useRoute();
let project = ref<Project>();
let tickets = ref<Ticket[]>([]);
let ticketsStatus = ref<string>("");

//FETCH
const { data: projectData } = await useFetch<Project>(
  `/api/project/${route.params.id}`
);
if (projectData.value) {
  project.value = projectData.value;
}

const { data: ticketsData, status } = await useFetch<Ticket[]>(
  `/api/ticket/${project.value?.id}`
);

tickets.value = ticketsData.value || [];
ticketsStatus.value = status.value;

const columns = [
  {
    key: "title",
    label: "Titre",
  },
  {
    key: "status",
    label: "Statut",
  },
  {
    key: "priority",
    label: "Priorité",
  },
];
</script>
