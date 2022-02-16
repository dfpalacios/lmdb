import axios from 'axios'
import { getNewToken } from 'services/users'

const storeToken = (newToken) => {
  const user = JSON.parse(window.localStorage.getItem("user"))
  if (!user) return
  user.token = newToken
  window.localStorage.setItem('user', JSON.stringify(user))
}

axios.interceptors.request.use(function (config) {
  const user = JSON.parse(window.localStorage.getItem("user"))
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
});

axios.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const user = JSON.parse(window.localStorage.getItem("user"))
    const res = await getNewToken(user.id, user.refreshToken);
    storeToken(res.token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.token;
    return axios(originalRequest);
  }
  return Promise.reject(error);
});