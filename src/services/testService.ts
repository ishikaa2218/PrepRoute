import api from "../api/axios";

export const createTest = async (payload: any) => {
  const response = await api.post("/tests", payload);
  return response.data;
};

export const updateTest = async (id: string, payload: any) => {
  const response = await api.put(`/tests/${id}`, payload);
  return response.data;
};

export const getAllTests = async () => {
  const response = await api.get("/tests");
  return response.data.data;
};

export const deleteTest = async (testId: string) => {
  const response = await api.delete(`/tests/${testId}`);
  return response.data;
};