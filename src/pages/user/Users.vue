<script setup>
import { onMounted, ref } from 'vue'
import { deleteAppUser, getUsers } from '@/services/requests/public.js'
import { FwbButton } from 'flowbite-vue'
import { setPageTitle } from '@/helper/index.js'

let users = ref([])

const deleteUser = async (id) => {
  try {
    await deleteAppUser(id)
    users.value = users.value.filter((user) => user.id !== id)
  } catch (error) {
    console.log(error)
  }
}
const listUsers = async () => {
  try {
    const response = await getUsers()
    users.value = response.data.users
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  setPageTitle()
  listUsers()
})
</script>

<template>
  <div class="w-full">
    <div class="w-full mt-5">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-sm my-5 font-bold">All Users</h1>
      </div>
      <div>
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div class="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        S/N
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        First name
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last name
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-6 text-left">
                        Total Conversions
                      </th>
                      <th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-6 text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(user, index) in users" :key="index">
                      <td
                        class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6"
                      >
                        {{ index + 1 }}
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {{ user.first_name }}
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {{ user.last_name }}
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {{ user.email }}
                      </td>
                      <td
                        class="relative py-4 pr-4 pl-3 text-sm font-medium whitespace-nowrap sm:pr-6"
                      >
                        {{ user.conversion_count }}
                      </td>
                      <td
                        class="relative py-4 pr-4 pl-3 text-sm font-medium whitespace-nowrap sm:pr-6"
                      >
                        <fwb-button
                          class="bg-indigo-600 hover:bg-indigo-500"
                          :loading="false"
                          @click="deleteUser(user.id)"
                          type="button"
                        >
                          Delete
                        </fwb-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
