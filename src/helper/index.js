// Import the useRouter function from the vue-router package
import { useRouter } from 'vue-router'

// Import the usePageTitle function from a store located at '@/stores/index.js'
import { usePageTitle } from '@/stores/index.js'

// Import the onMounted lifecycle hook from the vue package
import { onMounted } from 'vue'

// Define and export a function named setPageTitle
export const setPageTitle = () => {
  // Create a router instance using the useRouter function
  const router = useRouter()

  // Access the current route object via the router and get its reactive value
  const currentRoute = router.currentRoute.value

  // Destructure the setPageTitle function from the usePageTitle store
  const { setPageTitle } = usePageTitle()

  // Call the setPageTitle function with the pageTitle from the current route's metadata
  // and the current route's name as arguments
  setPageTitle(currentRoute.meta.pageTitle, currentRoute.name)
}
