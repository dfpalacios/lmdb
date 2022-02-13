import axios from 'axios'

export const getMovies = async () => {
  const { data } = await axios.get('/api/movies')
  return data
}

export const getMovie = async (movieId) => {
  const { data } = await axios.get(`/api/movies/${movieId}`)
  return data
}