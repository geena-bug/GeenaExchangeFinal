import { useRouter } from 'vue-router'
import { usePageTitle } from '@/stores/index.js'
import { onMounted } from 'vue'

export const setPageTitle = () => {
  const router = useRouter()
  const currentRoute = router.currentRoute.value
  const {setPageTitle} = usePageTitle()
  setPageTitle(currentRoute.meta.pageTitle, currentRoute.name)
}
