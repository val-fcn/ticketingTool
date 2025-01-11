<template>
  <NuxtLayout>
    <template #main-content>
      <UContainer class="flex flex-col px-6 py-4">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold">{{ project?.name }}</h1>
          <UButton
            icon="i-heroicons-plus"
            label="Nouveau ticket"
            @click="isCreateTicketOpen = true"
          />
        </div>
        <div v-if="status === 'pending'">
          <USkeleton class="w-full" />
        </div>
        <UCard v-else>
          <UTable
            :TableRows="tickets || []"
            :columns="columns"
            :status="status"
          />
        </UCard>
      </UContainer>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
  key: (route) => route.fullPath,
});

const route = useRoute();
const isCreateTicketOpen = ref(false);

interface Project {
  id: string;
  name: string;
}

const { data: project, status } = await useFetch<Project>(
  `/api/project/${route.params.id}`,
  {
    watch: [toRef(route.params, "id")],
    key: `project-${route.params.id}`,
    cache: "force-cache",
  }
);

const { data: tickets, status: ticketsStatus } = await useFetch(
  `/api/ticket/ticketList`,
  {
    params: {
      id: project?.value?.id,
    },
    watch: [toRef(route.params, "id")],
    key: `ticket-${route.params.id}`,
    cache: "force-cache",
  }
);

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
