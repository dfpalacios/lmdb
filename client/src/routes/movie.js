import React, { useEffect, useState } from 'react'

import MovieDetail from "components/movies/MovieDetail";
import { useParams } from "react-router-dom";
import { getMovie } from 'services/movies';

const Movie = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    getMovie(params.movieId).then((movie) => {
      setMovie(movie)
    })
  }, [params.movieId])

  if (!movie) {
    return <p>Loading</p>
  }

  return (<MovieDetail movie={movie} />)
}

export default Movie
