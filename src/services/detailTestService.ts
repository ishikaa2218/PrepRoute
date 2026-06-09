import api from "../api/axios";

export const getTestById = async (id: string) => {
  const response = await api.get(`/tests/${id}`);
  return response.data.data;
};