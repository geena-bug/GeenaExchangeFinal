<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-center">
    <p class="text-base font-semibold text-indigo-600">403</p>
    <h1 class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Forbidden</h1>
    <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Forbidden! You are not allowed to access this resource. Allowed to only admin users</p>
    <p class="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">This page allowed to only admin users</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <router-link :to="{name: 'user-panel.home'}" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
