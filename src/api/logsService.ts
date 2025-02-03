import apiClient from "./apiClient";

export const getLogs = async () => {
  const response = await apiClient.get("/logs");
  return response.data;
};
