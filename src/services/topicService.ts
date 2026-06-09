import api from "../api/axios";

export const getTopicsBySubject = async (subjectId: string) => {
  const response = await api.get(`/topics/subject/${subjectId}`);
  return response.data.data;
};