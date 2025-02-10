import apiClient from "./apiClient";
import { Log } from "./types";

export const getLogs = async (): Promise<Log[]> => {
  const response = await apiClient.get("/logs");
  return response.data;
};
