import apiClient from "./apiService";

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  socialLogin: async (providerToken) => {
    const response = await apiClient.post("/auth/social-login", { token: providerToken });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("authToken");
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};

export default authService;
