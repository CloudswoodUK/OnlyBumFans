import { create } from "zustand";
import axios from "axios";
const API_URI = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;
export const userAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name, gender, dateOfBirth, country) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URI}/signup`, {
        email,
        password,
        name,
        gender,
        dateOfBirth,
        country,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error in signing us.",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URI}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        error: null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging in.",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URI}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error in verifying email.",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URI}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URI}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },
  additionalInformation: async (
    profilePicture,
    maritalStatus,
    habitOfSmoking,
    habitOfDrinking,
    wantsToTravel
  ) => {
    set({ isLoading: true, error: null });

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("maritalStatus", maritalStatus);
    formData.append("habitOfSmoking", habitOfSmoking);
    formData.append("habitOfDrinking", habitOfDrinking);
    formData.append("wantsToTravel", wantsToTravel);

    try {
      const response = await axios.post(
        `${API_URI}/additional-information`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error in saving additional information",
        isLoading: false,
      });
      throw error;
    }
  },

  updateProfileInformation : async (formData) => {
    set({ isLoading: true, error: null });
  
    try {
      const response = await axios.post(
        `${API_URI}/update-profile-information`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error in saving additional information",
        isLoading: false,
      });
      throw error;
    }
  },
  


  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URI}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URI}/reset-password/${token}`, { password });
        set({ message: response.data.message, isLoading: false });
    } catch (error) {
        set({
            isLoading: false,
            error: error.response.data.message || "Error resetting password",
        });
        throw error;
    }
},
}));
