<script setup>
import { useField } from 'vee-validate'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: String,
  placeholder: String,
  label: String,
})

const { value, errorMessage, meta } = useField(() => props.name)
</script>

<template>
  <div>
    <label for="email" v-if="label" class="block text-sm/6 font-medium text-gray-900">{{label}}</label>
    <div class="mt-1">
      <input
        :type="type ?? 'text'"
        :name="name"
        :id="name"
        :class="{ 'ring-1 ring-indigo-500': !meta.valid }"
        autocomplete="email"
        v-model="value"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ring-1 ring-indigo-500" />
    </div>
    <p class="text-red-500 text-sm" v-if="!meta.valid">{{errorMessage}}</p>
  </div>
</template>

<style scoped>

</style>
