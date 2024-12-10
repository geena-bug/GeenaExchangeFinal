// Import the ref function from the Vue package for reactive references
import { ref } from 'vue'

// Import the defineStore function from the Pinia package for defining stores
import { defineStore } from 'pinia'

// Define a Pinia store for managing the page title
export const usePageTitle = defineStore('pageTitle', () => {
  // Create a reactive reference for the page title
  const pageTitle = ref('')

  // Create a reactive reference for the router name
  const routerName = ref('')

  // Define a function to set the page title and router name
  function setPageTitle(title, routeName) {
    // Update the pageTitle with the provided title
    pageTitle.value = title

    // Update the routerName with the provided routeName
    routerName.value = routeName
  }

  // Return the reactive properties and the setter function for use in components
  return { pageTitle, setPageTitle, routerName }
})

// Define a Pinia store for managing application user details
export const useAppUser = defineStore('appUser', () => {
  // Create a reactive reference for storing user details
  const appUser = ref({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    user_type: '',
  })

  // Define a function to update the user details
  function setAppUser(user) {
    // Update the appUser reference with the provided user data
    appUser.value = user
  }

  // Return the reactive properties and the setter function for use in components
  return { appUser, setAppUser }
})
