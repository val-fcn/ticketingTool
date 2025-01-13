<template>
  <NuxtLayout>
    <div class="flex flex-col p-4 gap-4">
      <div class="flex justify-between items-center">
        <UBreadcrumb :links="links" />
        <UButton
          icon="i-heroicons-plus"
          label="Nouveau ticket"
          @click="isModalOpen = true"
        />
      </div>
      <UDivider />
      <div class="flex flex-col border rounded-md">
        <UTable
          :rows="tickets || []"
          :columns="columns"
          :loading="pending"
          :empty-state="{ icon: 'i-heroicons-ticket', label: 'Aucun ticket' }"
        >
          <template #status-data="{ row }">
            <UBadge
              :variant="row.status === 'open' ? 'solid' : 'outline'"
              :color="row.status === 'open' ? 'green' : 'gray'"
            >
              {{ row.status }}
            </UBadge>
          </template>
          <template #priority-data="{ row }">
            <UBadge
              variant="solid"
              :color="
                row.priority === 'high'
                  ? 'red'
                  : row.priority === 'medium'
                  ? 'orange'
                  : 'blue'
              "
            >
              {{ row.priority }}
            </UBadge>
          </template>
        </UTable>
      </div>
    </div>

    <UModal v-model="isModalOpen">
      <UCard>
        <!-- Formulaire de création de ticket ici -->
      </UCard>
    </UModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
  key: (route) => route.fullPath,
});

// Types
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

// État
const route = useRoute();
const isModalOpen = ref(false);

// Données
const { data: project, status: projectStatus } = await useFetch<Project>(
  `/api/project/${route.params.id}`
);

const { data: tickets = ref<Ticket[]>([]), status: ticketsStatus } =
  await useFetch<Ticket[]>(`/api/ticket/${route.params.id}`, {
    watch: [() => route.params.id],
  });

const pending = computed(
  () => projectStatus.value === "pending" || ticketsStatus.value === "pending"
);

// Colonnes de la table
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

const links = [
  {
    label: "Projets",
    to: "/dashboard/project",
  },
  {
    label: project.value?.name || "Chargement...",
    to: `/dashboard/project/${route.params.id}`,
  },
];
</script>
