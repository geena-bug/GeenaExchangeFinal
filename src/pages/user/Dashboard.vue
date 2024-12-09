<script setup>
import ExchangeCards from '@/components/ExchangeCards.vue'
import { onMounted, ref } from 'vue'
import { convertCurrency, listConversions, listCountryList } from '@/services/requests/public.js'
import { FwbButton, FwbModal } from 'flowbite-vue'
import CustomSelect from '@/components/forms/CustomSelect.vue'
import CustomInput from '@/components/forms/CustomInput.vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { setPageTitle } from '@/helper/index.js'

const conversionLoading = ref(false)
const currencyData = ref([])
const conversions = ref([])
let countryList = []
let currencyList = ref([])
const singleConversionData = ref({})

const isShowModal = ref(false)

function closeModal() {
  isShowModal.value = false
}
function showModal() {
  isShowModal.value = true
}

const convertCurrencies = async () => {
  const data = [
    {
      currencyFrom: 'CAD',
      currencyTo: 'NGN',
      amount: 1,
    },
    {
      currencyFrom: 'CAD',
      currencyTo: 'GBP',
      amount: 1,
    },
    {
      currencyFrom: 'CAD',
      currencyTo: 'EUR',
      amount: 1,
    },
  ]
  const [ngnConversion, gbpConversion, euroConversion] = await Promise.all(
    data.map(async (currency) => {
      return convertCurrency({
        currencyFrom: currency.currencyFrom,
        currencyTo: currency.currencyTo,
        amount: currency.amount,
        saveToHistory: false,
      })
    }),
  )
  currencyData.value = [
    {
      currencyFrom: 'CAD',
      currencyTo: 'NGN',
      amount: ngnConversion.data.convertedAmount,
      amountConverted: 1,
      countryFrom: 'Canada',
      countryTo: 'Nigeria',
      date: ngnConversion.data.lastUpdated,
      conversionRate: ngnConversion.data.conversionRate,
      countryFromCode: 'ca',
      countryToCode: 'ng',
      currencyCodeSymbol: '₦',
      isLoading: false,
    },
    {
      currencyFrom: 'CAD',
      currencyTo: 'GBP',
      amount: gbpConversion.data.convertedAmount,
      amountConverted: 1,
      countryFrom: 'Canada',
      countryTo: 'Great Britain',
      date: gbpConversion.data.lastUpdated,
      conversionRate: gbpConversion.data.conversionRate,
      countryFromCode: 'ca',
      countryToCode: 'gb',
      currencyCodeSymbol: '£',
      isLoading: false,
    },
    {
      currencyFrom: 'CAD',
      currencyTo: 'EUR',
      amount: euroConversion.data.convertedAmount,
      amountConverted: 1,
      countryFrom: 'Canada',
      countryTo: 'Europe',
      date: euroConversion.data.lastUpdated,
      conversionRate: euroConversion.data.conversionRate,
      countryFromCode: 'ca',
      countryToCode: 'eu',
      currencyCodeSymbol: '€',
      isLoading: false,
    },
  ]
}

const getConversions = async () => {
  try {
    const response = await listConversions()
    conversions.value = response.data.conversions
    countryList = response.data.countryList
  } catch (err) {
    console.log(err)
  }
}

const getCountry = (currencyCode) =>
  countryList.find((country) => country.currency_code === currencyCode)

const form = ref(null)
const formData = ref({
  currencyFrom: '',
  currencyTo: '',
  amount: '',
})

const schema = yup.object({
  currencyFrom: yup.string().required('Currency from is required'),
  currencyTo: yup.string().required('Currency to is required'),
  amount: yup.string().required('Enter an amount'),
})

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

const singleConversion = async (data) => {
  try {
    conversionLoading.value = true
    const response = await convertCurrency({
      currencyFrom: data.currencyFrom,
      currencyTo: data.currencyTo,
      amount: data.amount,
      saveToHistory: true,
    })
    const country = getCountry(data.currencyTo)
    const countryFrom = getCountry(data.currencyFrom)
    singleConversionData.value = {
      currencyFrom: response.data.fromCurrency,
      currencyTo: response.data.toCurrency,
      amount: response.data.convertedAmount,
      amountConverted: response.data.amountToConvert,
      countryToCode: country.country_iso,
      countryToName: country.name,
      countryToSymbol: country.currency_symbol,
      date: response.data.lastUpdated,
      conversionRate: response.data.conversionRate,
      countryFromName: countryFrom.name,
      countryFromCode: countryFrom.country_iso,
    }
    form.value.resetForm()
    getConversions()
  } catch (err) {
    console.log(err)
  } finally {
    conversionLoading.value = false
  }
}

const formattedCurrency = (amount, currencyCodeSymbol) =>
  `${currencyCodeSymbol} ${amount.toLocaleString({
    minimumFractionDigits: 2,
  })}`

onMounted(() => {
  convertCurrencies()
  getConversions()
  getCountryList()
  setPageTitle()
})
</script>

<template>
  <div class="w-full">
    <div class="w-full">
      <h1 class="text-sm my-2 font-bold">Current Rates</h1>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ExchangeCards
          :is-loading="currency.isLoading"
          v-for="currency in currencyData"
          :key="currency.id"
          :currency-from="currency.currencyFrom"
          :currency-to="currency.currencyTo"
          :amount="currency.amount"
          :amount-converted="currency.amountConverted"
          :country-from="currency.countryFrom"
          :country-to="currency.countryTo"
          :date="currency.date"
          :conversion-rate="currency.conversionRate"
          :country-from-code="currency.countryFromCode"
          :country-to-code="currency.countryToCode"
          :currency-code-symbol="currency.currencyCodeSymbol"
        />
      </div>
    </div>
    <div class="w-full mt-5">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-sm my-5 font-bold">Latest Conversion</h1>
        <div class="w-50">
          <fwb-button @click="showModal" class="bg-indigo-600 hover:bg-indigo-500">
            Convert Currency
          </fwb-button>
        </div>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <fwb-modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">Convert Currency</div>
      </template>
      <template #body>
        <Form
          ref="form"
          class="space-y-6"
          @submit="singleConversion"
          :validation-schema="schema"
          :initial-values="formData"
        >
          <CustomInput name="amount" label="Amount to Convert" type="text" />
          <CustomSelect :options="currencyList" name="currencyFrom" label="Currency From" />
          <CustomSelect :options="currencyList" name="currencyTo" label="Currency To" />
          <div class="flex justify-between">
            <fwb-button
              class="bg-indigo-600 hover:bg-indigo-500"
              :loading="conversionLoading"
              type="submit"
            >
              Convert
            </fwb-button>
          </div>
        </Form>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <div class="min-w-0 flex-1" v-if="!conversionLoading && singleConversionData.currencyTo">
            <p class="flex text-xs font-semibold text-gray-900 gap-2 items-center">
              <span :class="`fi fi-${singleConversionData.countryToCode.toLowerCase()}`"></span>
              <span>{{
                `${singleConversionData.countryToName}(${singleConversionData.currencyTo})`
              }}</span>
            </p>
            <p class="text-sm text-gray-500 mt-3 flex flex-col">
              <span class="text-2xl mb-1">{{
                formattedCurrency(singleConversionData.amount, singleConversionData.countryToSymbol)
              }}</span>
              <span class="text-xs">
                {{
                  `1 ${singleConversionData.currencyFrom} = ${singleConversionData.currencyTo} ${singleConversionData.conversionRate}`
                }}
              </span>
            </p>
          </div>
        </div>
      </template>
    </fwb-modal>
  </div>
</template>
