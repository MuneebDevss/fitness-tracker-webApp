import apiClient from "./apiService";

const fitnessService = {
  getGoals: async () => {
    const response = await apiClient.get("/fitness/goals");
    return response.data;
  },

  createGoal: async (goalData) => {
    const response = await apiClient.post("/fitness/goals", goalData);
    return response.data;
  },

  updateGoal: async (goalId, updatedData) => {
    const response = await apiClient.put(`/fitness/goals/${goalId}`, updatedData);
    return response.data;
  },

  deleteGoal: async (goalId) => {
    const response = await apiClient.delete(`/fitness/goals/${goalId}`);
    return response.data;
  },

  getExercisePlans: async () => {
    const response = await apiClient.get("/fitness/exercise-plans");
    return response.data;
  },

  createExercisePlan: async (planData) => {
    const response = await apiClient.post("/fitness/exercise-plans", planData);
    return response.data;
  },

  trackProgress: async (progressData) => {
    const response = await apiClient.post("/fitness/progress", progressData);
    return response.data;
  },
};

export default fitnessService;
