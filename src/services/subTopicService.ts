import api from "../api/axios";

export const getSubTopicsByTopic = async (topicId: string) => {
  const response = await api.get(`/sub-topics/topic/${topicId}`);
  return response.data.data;
};