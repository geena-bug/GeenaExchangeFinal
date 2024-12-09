<script setup>
import { onMounted, ref } from 'vue'
import { deleteConversion, listConversions, listCountryList } from '@/services/requests/public.js'
import { usePageTitle } from '@/stores/index.js'
import { useRouter } from 'vue-router'
import { FwbButton } from 'flowbite-vue'
import { setPageTitle } from '@/helper/index.js'

const conversions = ref([])
let countryList = []
let currencyList = ref([])

const getConversions = async () => {
  try {
    const response = await listConversions(20)
    conversions.value = response.data.conversions
    countryList = response.data.countryList
  } catch (err) {
    console.log(err)
  }
}

const getCountry = (currencyCode) =>
  countryList.find((country) => country.currency_code === currencyCode)

const getCountryList = async () => {
  try {
    const response = await listCountryList()
    currencyList.value = response.data.countryList.map((currency) => ({
      value: currency.currency_code,
      label: `${currency.currency_code} - ${currency.name}`,
    }))
  } catch (error) {
    console.log(error)
  }
}

const deleteMyConversion = async (id) => {
  try {
    await deleteConversion(id)
    conversions.value = conversions.value.filter((conversion) => conversion.id !== id)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  setPageTitle()
})
</script>

<template>
  <div class="w-full">
    <div class="w-full mt-5">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-sm my-5 font-bold">My Conversion History</h1>
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
                      <th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-6 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr
                      v-for="(conversion, index) in conversions"
                      :key="conversion.id"
                      :var1="country = getCountry(conversion.currency_from)"
                      :var2="countryTo = getCountry(conversion.currency_to)"
                    >
                      <td
                        class="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6"
                      >
                        {{ index + 1 }}
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <span :class="`fi fi-${country.country_iso.toLowerCase()}`"></span>
                        {{ country.name }}
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        <span :class="`fi fi-${countryTo.country_iso.toLowerCase()}`"></span>
                        {{ countryTo.name }}
                      </td>
                      <td class="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {{ `${countryTo.currency_symbol} ${conversion.converted_amount}` }}
                      </td>
                      <td
                        class="relative py-4 pr-4 pl-3 text-sm font-medium whitespace-nowrap sm:pr-6"
                      >
                        {{ conversion.conversion_date }}
                      </td>
                      <td
                        class="relative py-4 pr-4 pl-3 text-sm font-medium whitespace-nowrap sm:pr-6"
                      >
                        <fwb-button
                          class="bg-indigo-600 hover:bg-indigo-500"
                          :loading="false"
                          @click="deleteMyConversion(conversion.id)"
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
