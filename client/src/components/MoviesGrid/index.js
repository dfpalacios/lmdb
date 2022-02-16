import React from 'react'
import { Grid } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import MoviesList from 'components/MoviesList'

const MoviesGrid = () => {
  const errorFallback = ({ error, resetErrorBoundary }) => {
    return (
      <>
        <p>There was an error loading the movies.</p>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </>
    )
  }

  return (
    <Grid container spacing={2}>
      <ErrorBoundary FallbackComponent={errorFallback}>
        <MoviesList />
      </ErrorBoundary>
    </Grid>
  )
}

export default MoviesGrid
