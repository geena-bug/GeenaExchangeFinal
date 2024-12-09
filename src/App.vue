<script setup>
import { RouterView } from 'vue-router'
import { useAppUser } from '@/stores/index.js'
import { getLoggedInUser } from '@/services/requests/public.js'
import { onMounted } from 'vue'
import store from 'store'


</script>

<template>
  <RouterView />
</template>
