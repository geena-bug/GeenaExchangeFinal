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
  const { data } = response
  if (data) {
    if(data.token_expired){
        store.remove('accessToken');
        window.location.href = '/auth/login';
    }
    // notification.error({
    //   message: data.errors ? processError(data.errors) : data.message,
    // })
  }
  return Promise.reject(error)
})

const processError = (errors)=>{

  let message = "";
  errors.map(val=>{
    message+= Object.values(val)[0] + "\n";
  })

  return message;
}

export default apiClient
