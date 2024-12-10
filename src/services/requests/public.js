// Import the apiService instance from the axios configuration
import apiService from '../axios'

// Define the base API resource path for user-related requests
const resources = '/users/';

// Utility function to generate query parameters for pagination
const generateParams = (limit, page) => {
  // If both limit and page are provided, return a query string with these parameters
  return limit && page ? '?' + new URLSearchParams({ limit, page }) : '';
}

// Define an asynchronous function to convert currency
export const convertCurrency = async (data) => {
  // Send a POST request to the 'users/convert-currency' endpoint with the provided data
  return apiService.post(`${resources}convert-currency`, data);
}

// Define an asynchronous function to update the user's profile
export const updateProfile = async (data) => {
  // Send a PUT request to the 'users/update-account' endpoint with the provided data
  return apiService.put(`${resources}update-account`, data);
}

// Define an asynchronous function to update the user's password
export const updatePassword = async (data) => {
  // Send a PUT request to the 'users/update-password' endpoint with the provided data
  return apiService.put(`${resources}update-password`, data);
}

// Define an asynchronous function to list currency conversions with pagination
export const listConversions = async (limit = 10, page = 1) => {
  // Send a GET request with generated query parameters for limit and page
  return apiService.get(`${resources}conversions${generateParams(limit, page)}`);
}

// Define an asynchronous function to retrieve a list of countries
export const listCountryList = async () => {
  // Send a GET request to the 'users/country-list' endpoint
  return apiService.get(`${resources}country-list`);
}

// Define an asynchronous function to delete a specific currency conversion
export const deleteConversion = async (id) => {
  // Send a DELETE request to 'users/delete-conversions' with the specified conversion ID
  return apiService.delete(`${resources}delete-conversions/${id}`);
}

// Define an asynchronous function to retrieve live exchange rates
export const liveExchanges = async () => {
  // Send a GET request to the 'users/live-exchange' endpoint
  return apiService.get(`${resources}live-exchange`);
}

// Define an asynchronous function to get the currently logged-in user's details
export const getLoggedInUser = async () => {
  // Send a GET request to the 'users/me' endpoint
  return apiService.get(`${resources}me`);
}

// Define an asynchronous function to get a list of users for admin purposes
export const getUsers = async () => {
  // Send a GET request to the 'admin/list-users' endpoint
  return apiService.get(`/admin/list-users`);
}

// Define an asynchronous function to delete a specific user by admin
export const deleteAppUser = async (id) => {
  // Send a DELETE request to 'admin/delete-user' with the specified user ID
  return apiService.delete(`/admin/delete-user/${id}`);
}
