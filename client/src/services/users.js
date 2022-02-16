import axios from 'axios'

export const getNewToken = async (userId, refreshToken) => {
  const { data } = await axios.post('/api/token/refresh', { id: userId, refreshToken })
  return data
}

export const postLogin = async (loginData) => {
  const { data } = await axios.post('/api/login', loginData)
  return data
}

export const postRegister = async (registerData) => {
  const { data } = await axios.post('/api/register', registerData)
  return data
}
