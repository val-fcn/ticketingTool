<template>
  <NuxtLayout>
    <div class="flex flex-col p-4 gap-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Projets</h1>
        <UButton
          icon="i-heroicons-plus"
          label="Nouveau projet"
          @click="onModalOpen"
        />
      </div>
      <UDivider />
      <div class="flex flex-col border rounded-md">
        <UTable
          :rows="projects || []"
          :columns="columns"
          :loading="pending"
          :empty-state="{ icon: 'i-heroicons-folder', label: 'Aucun projet' }"
          @select="onSelect"
          :ui="{
            td: { base: 'cursor-pointer' },
          }"
        >
          <template #actions-data="{ row }">
            <UButton
              icon="i-heroicons-arrow-right"
              variant="ghost"
              :to="`/dashboard/project/${row.id}`"
            />
          </template>
        </UTable>
      </div>
    </div>

    <UModal v-model="isModalOpen">
      <UCard>
        <UForm :state="form" @submit="onSubmit">
          <UFormGroup label="Titre du projet" name="project_title">
            <UInput v-model="form.project_title" />
          </UFormGroup>
          <UButton type="submit">Créer</UButton>
        </UForm>
      </UCard>
    </UModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard-layout",
  key: (route) => route.fullPath,
});

const isModalOpen = ref(false);
const form = ref({
  project_title: "",
});
const router = useRouter();
type Project = {
  id: string;
  name: string;
};

const onSelect = (row: Project) => {
  router.push(`/dashboard/project/${row.id}`);
};
const onModalOpen = () => {
  isModalOpen.value = true;
};

const onSubmit = () => {
  console.log(form.value);
};

const { data: projects, status } = await useAsyncData("projects-list", () =>
  $fetch("/api/project/projectList")
);

const pending = computed(() => status.value === "pending");

const columns = [
  {
    key: "name",
    label: "Nom",
    sortable: true,
  },
  {
    key: "actions",
    label: "",
  },
];
</script>
