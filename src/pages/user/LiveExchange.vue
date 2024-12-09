<script setup>
import { onMounted, ref } from 'vue'
import { liveExchanges, listCountryList } from '@/services/requests/public.js'
import { setPageTitle } from '@/helper/index.js'

let rates = ref([])
let countryList = ref([])
const lastUpdated = ref('')

const getLiveExchanges = async () => {
  try {
    const response = await liveExchanges()
    rates.value = response.data.rates
    lastUpdated.value = response.data.lastUpdate
  } catch (err) {
    console.log(err)
  }
}


const getCountryList = async () => {
  try {
    const response = await listCountryList()
    countryList.value = response.data.countryList
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getLiveExchanges()
  getCountryList()
  setPageTitle()
})
</script>

<template>
  <div class="w-full">
    <div class="w-full mt-5">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-sm mb-1 font-bold">My Conversion History</h1>
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
                        Currency From
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Currency To
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                      <th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-6 text-left">
                        Date Created
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                      v-for="(rate, index) in rates"
                      :key="index"
                    >
                      <td
                        class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6"
                      >
                        {{ index + 1 }}
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <span :class="`fi fi-ca`"></span>
                        Canada
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <span :class="`fi fi-${rate.countryCode.toLowerCase()}`"></span>
                        {{ rate.countryName }}
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {{ `${rate.symbol} ${rate.rate}` }}
                      </td>
                      <td
                        class="relative py-4 pr-4 pl-3 text-sm font-medium whitespace-nowrap sm:pr-6"
                      >
                        {{ lastUpdated }}
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
