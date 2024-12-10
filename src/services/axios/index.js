// Import the axios library for making HTTP requests
import axios from 'axios'

// Import the store object for accessing and manipulating local storage
import store from 'store'

// Define the base URL for the API
const baseUrl = 'http://localhost:3000/api/v1/';

// Create an axios instance with the specified base URL
const apiClient = axios.create({
  baseURL: baseUrl,
})

// Add a request interceptor to the axios instance
apiClient.interceptors.request.use(request => {
  // Retrieve the access token from the store
  const accessToken = store.get('accessToken')

  // If an access token exists, include it in the request headers
  if (accessToken) {
    // Set the Authorization header with a Bearer token
    request.headers.Authorization = `Bearer ${accessToken}`
    // Also include the AccessToken in the request headers
    request.headers.AccessToken = accessToken
  }

  // Return the modified request object
  return request
})

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(undefined, error => {
  // Destructure the response object from the error
  const { response } = error

  // Check if the response status is 401 (Unauthorized)
  if(response.status === 401){
    // Remove the access token from the store
    store.remove('accessToken')
    // Redirect the user to the login page
    window.location.href = '/auth/login'
  }

  // Check if the response status is 403 (Forbidden)
  if(response.status === 403){
    // Redirect the user to the 403 Forbidden Access page
    window.location.href = '/403'
  }

  // Reject the promise with the error to handle it in the request call chain
  return Promise.reject(error)
})

// Export the configured apiClient for use in the application
export default apiClient
