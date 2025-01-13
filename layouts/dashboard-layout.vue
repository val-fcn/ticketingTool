<template>
  <div class="grid grid-cols-12">
    <div class="col-span-2 h-screen border-r">
      <div class="flex flex-col gap-4 px-6 py-4">
        <NuxtLink
          to="/dashboard"
          class="text-2xl font-bold text-center hover:text-primary-500"
        >
          Tickety
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-2">
        <ULink
          to="/dashboard/project"
          class="flex items-center gap-2 px-6 pt-4 pb-2 hover:bg-gray-100 rounded-md"
        >
          <UIcon name="i-heroicons-folder-open" class="w-4 h-4" />
          <span class="text-sm font-bold">Projects</span>
        </ULink>
      </div>
    </div>
    <div class="col-span-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
