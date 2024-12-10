// Import the apiService instance from the axios configuration
import apiService from '../axios'

// Define the API resource path for authentication-related requests
const resources = 'auth/';

// Define an asynchronous function to handle user login
export const login = async (data) => {
  // Send a POST request to the 'auth/login' endpoint with the provided data
  return apiService.post(`${resources}login`, data);
}

// Define an asynchronous function to handle user sign-up
export const signUp = async (data) => {
  // Send a POST request to the 'auth/sign-up' endpoint with the provided data
  return apiService.post(`${resources}sign-up`, data);
}
