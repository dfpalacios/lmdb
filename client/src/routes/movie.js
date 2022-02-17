import React, { useEffect, useState } from 'react'

import MovieDetail from 'components/MovieDetail'
import { useParams } from 'react-router-dom'
import { getMovie } from 'services/movies'
import { useUserStore } from 'context/UserProvider/hooks'

const Movie = () => {
  const params = useParams()
  const [movie, setMovie] = useState(null)
  const [user] = useUserStore()

  useEffect(() => {
    getMovie(params.movieId).then((movie) => {
      setMovie(movie)
    })
  }, [user, params.movieId])

  if (!movie) {
    return <p>Loading</p>
  }

  return (<MovieDetail movie={movie} />)
}

export default Movie
