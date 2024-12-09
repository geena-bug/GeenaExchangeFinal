import apiService from '../axios'
const resources  = '/users/';

const generateParams = (limit,page)=>{
    return limit && page ? '?' + new URLSearchParams({limit,page}) : '';
}

export const convertCurrency = async (data) =>{
    return apiService.post(`${resources}convert-currency`, data);
}

export const updateProfile = async (data) =>{
  return apiService.put(`${resources}update-account`, data);
}

export const updatePassword = async (data) =>{
  return apiService.put(`${resources}update-password`, data);
}

export const listConversions = async (limit = 10,page = 1) => {
  return apiService.get(`${resources}conversions${generateParams(limit,page)}`);
}

export const listCountryList = async () => {
  return apiService.get(`${resources}country-list`);
}

export const deleteConversion = async (id) => {
  return apiService.delete(`${resources}delete-conversions/${id}`);
}

export const liveExchanges = async () => {
  return apiService.get(`${resources}live-exchange`);
}

export const getLoggedInUser = async () => {
  return apiService.get(`${resources}me`);
}


