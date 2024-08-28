import { create } from 'zustand';
import axios from 'axios';
const API_URI = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true; 
export const userAuthStore = create((set) => ({
    user : null,
    isAuthenticated : false,
    error: null,
    isLoading : false,
    isCheckingAuth : true,
    message: null,

    signup: async (email,
        password,
        name,
        gender,
        dateOfBirth,
        country) => {
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URI}/signup`, {email,
                password,
                name,
                gender,
                dateOfBirth,
                country});
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error: error.response.data.message || "Error in signing us.", isLoading:false});
            throw error;
        }
    },

    login: async (email,
        password) => {
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URI}/login`, {email,
                password});
            set({user:response.data.user, error:null, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error: error.response.data.message || "Error logging in.", isLoading:false});
            throw error;
        }
    },

    verifyEmail : async(code) => {
        set({isLoading:true,error:null});
        try {
            const response = await axios.post(`${API_URI}/verify-email`, {code});
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
            return response.data;
        } catch (error) {
            set({error: error.response.data.message || "Error in verifying email.", isLoading:false});
            throw error;
        }
    },

    checkAuth : async() => {
        await new Promise((resolve) => {setTimeout(resolve,1000)});
        set({isCheckingAuth:true,error:null});
        try {
            const response = await axios.get(`${API_URI}/check-auth`);
            set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
        } catch (error) {
            set({error: null, isCheckingAuth: false, isAuthenticated: false});
        }
    },

    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
    additionalInformation: async () => {

    },

}));