import { api } from './const';

export const registerUser = (username: string, email: string, password: string) => 
    api.post('/user', { username, email, password });

export const loginUser = (email: string, password: string) => 
    api.post('/auth/login', { email, password });

export const getUser = (username: string) => 
    api.get(`/user/${username}`);

export const getProfile = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return api.get('/auth/profile');
};