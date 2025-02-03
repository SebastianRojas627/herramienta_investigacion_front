import apiClient from "./apiClient";
import { SearchItv, SearchSegip } from "./types";

export const listSegip = async (searchSegip: SearchSegip) => {
  const response = await apiClient.post("/search/segip", searchSegip);
  return response.data;
};

export const listItv = async (searchItv: SearchItv) => {
  const response = await apiClient.post("/search/itv", searchItv);
  return response.data;
};

export const getOneItv = async (searchItv: SearchItv) => {
  const response = await apiClient.post("/search/itvo", searchItv);
  return response.data;
};

export const getVehicleOwners = async (query: any) => {
  const response = await apiClient.post("/search/owners", query);
  return response.data;
};

export const getOneSegip = async (searchSegip: SearchSegip) => {
  const response = await apiClient.post("/search/segipo", searchSegip);
  return response.data;
};

export const getPersonaVehiculos = async (query: any) => {
  const response = await apiClient.post("/search/vehiculos", query);
  return response.data;
};
