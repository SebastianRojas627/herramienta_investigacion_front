import apiClient from "./apiClient";
import { UserLog } from "./types";

export const getUsers = async () => {
  const response = await apiClient.get("auth/get-users");
  return response.data;
};

export const userLogin = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  console.log(response)
  const { token, user } = response.data;
  return { token, user };
};

export const userRoleChange = async (userId: string, role: string) => {
  const response = await apiClient.patch(`/auth/role/${userId}`, { role });
  // en el backend responder con un codigo para saber si la actualizacion fue exitosa

  return response.data;
};

export const createUser = async (formData: any) => {
  const response = await apiClient.post("/auth/register", formData);
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get("auth/get-user");
  return response.data;
};

export const updateUser = async (formData: any) => {
  const response = await apiClient.patch("/auth/update", formData);
  return response.data;
};

export const getLogUser = async (id: string): Promise<UserLog> => {
  const response = await apiClient.get(`auth/log-user/${id}`);
  return response.data;
};
