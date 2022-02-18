import React from 'react'

import MovieDetail from 'components/MovieDetail'
import { useParams } from 'react-router-dom'

const Movie = () => {
  const params = useParams()

  return (<MovieDetail movieId={params.movieId} />)
}

export default Movie
