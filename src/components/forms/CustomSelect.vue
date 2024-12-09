<script setup>
import { useField } from 'vee-validate'
import { ChevronDownIcon } from '@heroicons/vue/16/solid/index.js'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  placeholder: String,
  label: String,
  options: {
    type: Array,
    required: true
  },
})

const { value, errorMessage, meta } = useField(() => props.name)
</script>

<template>
  <div>
    <label for="email" v-if="label" class="block text-sm/6 font-medium text-gray-900">{{label}}</label>
      <div class="mt-1 grid grid-cols-1">
          <select
            :name="name"
            :id="name"
            v-model="value"
            :class="{ 'ring-1 ring-indigo-500': !meta.valid }"
            class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ring-1 ring-indigo-500">
            <option v-for="option in options" :key="option.value" :value="option.value" :selected="option.value === value">{{option.label}}</option>
          </select>
          <ChevronDownIcon class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" aria-hidden="true" />
        <p class="text-red-500 text-sm" v-if="!meta.valid">{{errorMessage}}</p>
      </div>
  </div>
</template>

<style scoped>

</style>
