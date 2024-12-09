import apiService from '../axios'
const resources  = 'auth/';

export const login = async (data) =>{
    return apiService.post(`${resources}login`,data);
}

export const signUp = async (data) =>{
    return apiService.post(`${resources}sign-up`, data);
}

