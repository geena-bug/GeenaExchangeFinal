import axios from 'axios'
import store from 'store'
const baseUrl = 'http://localhost:3000/api/v1/';

const apiClient = axios.create({
  baseURL: baseUrl,
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  const { response } = error
  if(response.status === 401){
    store.remove('accessToken')
    window.location.href = '/auth/login'
  }
  if(response.status === 403){
    window.location.href = '/403'
  }
  return Promise.reject(error)
})


export default apiClient
