<template>
  <div class="grid grid-cols-12">
    <div class="col-span-2 h-screen border-r">
      <div class="flex flex-col gap-4 px-6 py-4">
        <h1 class="text-2xl font-bold text-center">Tickety</h1>
      </div>
      <div>
        <div class="flex items-center gap-2 px-6 pt-4 pb-2">
          <ULink
            class="flex items-center gap-2 w-full hover:bg-gray-100 rounded-md p-2"
            to="/dashboard/project"
          >
            <UIcon name="i-heroicons-folder-open" class="w-4 h-4" />
            <h2 class="text-sm font-bold">Projects</h2>
          </ULink>
        </div>
      </div>
    </div>
    <div class="col-span-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
