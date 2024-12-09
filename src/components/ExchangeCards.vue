<script setup>
import { ArrowRightCircleIcon } from '@heroicons/vue/16/solid/index.js'
import Loading from '@/components/Loading.vue'

defineProps({
  isLoading: {
    type: Boolean,
    default: true
  },
  currencyFrom: {
    type: String,
    required: true
  },
  currencyTo: {
    type: String,
    required: true,
    default: 'USD'
  },
  amount: {
    type: Number,
    required: true,
    default: 1
  },
  amountConverted: {
    type: Number,
    required: true
  },
  countryFrom: {
    type: String,
    required: true
  },
  countryTo: {
    type: String,
    required: true
  },
  countryFromCode: {
    type: String,
    required: true
  },
  countryToCode: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  conversionRate: {
    type: Number,
    required: true
  },
  currencyCodeSymbol: {
    type: String,
    required: true
  },
})
const formattedCurrency = (amount, currencyCodeSymbol) => `${currencyCodeSymbol} ${amount.toLocaleString({
  minimumFractionDigits: 2
})}`
</script>

<template>
  <div class="bg-white px-4 py-5 sm:px-6 ring-1 ring-gray-900/5 shadow sm:rounded-lg">
    <div v-if="isLoading" class="flex justify-center">
      <Loading />
    </div>
    <div class="flex space-x-3 justify-center" v-if="!isLoading">
      <div class="shrink-0">
        <span :class="`fi fi-${countryFromCode.toLowerCase()}`"></span>
      </div>
      <div class="min-w-0 flex-1">
        <p class="flex text-xs font-semibold text-gray-900 gap-3 items-center">
          <span class="text-center">{{`${countryFrom}(${currencyFrom})`}}</span> <ArrowRightCircleIcon class="w-5 h-5 text-indigo-700" /> <span>{{`${countryTo}(${currencyTo})`}}</span>
        </p>
        <p class="text-sm text-gray-500 mt-3 flex flex-col">
          <span class="text-2xl mb-1">{{formattedCurrency(amount, currencyCodeSymbol)}}</span>
          <span class="text-xs">
            {{`1 ${currencyFrom} = ${currencyTo} ${conversionRate}`}}
          </span>
          <span class="text-xs">{{date}}</span>
        </p>
      </div>
      <div class="shrink-0">
        <span :class="`fi fi-${countryToCode.toLowerCase()}`"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
