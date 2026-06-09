import api from "../api/axios";

export const createQuestionsBulk = async (payload: any) => {
  const response = await api.post("/questions/bulk", payload);
  return response.data;
};

export const fetchQuestionsBulk = async (questionIds: string[]) => {
  const response = await api.post("/questions/fetchBulk", {question_ids: questionIds});
  return response.data.data;
};

export const updateQuestion = async (id:string, payload:any) => {
  const response = await api.put(`/questions/${id}`, payload);
  return response.data;
};