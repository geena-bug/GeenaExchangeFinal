import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageTitle = defineStore('pageTitle', () => {
  const pageTitle = ref('')
  const routerName = ref('')
  function setPageTitle(title, routeName) {
    pageTitle.value = title
    routerName.value = routeName
  }
  return { pageTitle, setPageTitle, routerName }
})

export const useAppUser = defineStore('appUser', () => {
  const appUser = ref({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    user_type: '',
  })
  function setAppUser(user) {
    appUser.value = user
  }
  return { appUser, setAppUser }
})
