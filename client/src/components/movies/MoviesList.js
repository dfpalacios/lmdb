import React, { useEffect } from 'react'
import { Grid } from '@mui/material'

import MovieCard from './MovieCard'
import { getMovies } from 'services/movies'

const MoviesList = () => {
  const [data, setData] = React.useState(null)

  useEffect(() => {
    getMovies().then((movies) => {
      setData(movies)
    })
  }, [])

  if (!data) {
    return <p>Loading</p>
  }

  return (
    <Grid container spacing={2}>
      {data.map((movie) => (
        <Grid item xs={4} sm={4} md={4} key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MoviesList
