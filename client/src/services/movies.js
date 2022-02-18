import axios from 'axios'

export const getMovies = async (queryParams) => {
  const { data } = await axios.get('/api/movies', { params: queryParams })
  return data
}

export const getMovie = async (movieId) => {
  const res = await axios.get(`/api/movies/${movieId}`)
  return res.data
}

export const postRateMovie = async (movieId, rating) => {
  return await axios.post(`/api/movies/${movieId}/stars`, { rating })
}
