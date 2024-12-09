import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const usePageTitle = defineStore('pageTitle', () => {
  const pageTitle = ref('')
  const routerName = ref('')
  function setPageTitle(title, routeName) {
    pageTitle.value = title
    routerName.value = routeName
  }
  return { pageTitle, setPageTitle, routerName }
})
