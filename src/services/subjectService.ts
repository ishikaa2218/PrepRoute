import api from '../api/axios'

export const getSubjects = async() => {
     console.log(
    "TOKEN:",
    localStorage.getItem("token")
  );

    const response = await api.get('/subjects')
    return response.data.data
}