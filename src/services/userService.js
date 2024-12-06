import apiClient from "./apiService";

const userService = {
  /**
   * Fetch the profile of the current user
   * @returns {Object} User data
   */
  getProfile: async () => {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },

  /**
   * Update the profile of the current user
   * @param {Object} profileData - Data to update the user profile
   * @returns {Object} Updated user data
   */
  updateProfile: async (profileData) => {
    const response = await apiClient.put("/users/profile", profileData);
    return response.data;
  },

  /**
   * Fetch all users (for admin purposes)
   * @returns {Array} List of users
   */
  getAllUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },

  /**
   * Delete a user by ID (admin functionality)
   * @param {string} userId - ID of the user to delete
   * @returns {Object} Confirmation message
   */
  deleteUser: async (userId) => {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  },

  /**
   * Update user-specific settings
   * @param {Object} settings - Updated settings
   * @returns {Object} Updated settings
   */
  updateUserSettings: async (settings) => {
    const response = await apiClient.put("/users/settings", settings);
    return response.data;
  },
};

export default userService;
