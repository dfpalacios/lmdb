import React, { useEffect, useState, useRef } from 'react'
import { Autocomplete, Rating, TextField } from '@mui/material'
import { getMovies } from 'services/movies'
import { Link } from 'react-router-dom'

const SearchForm = () => {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const timeout = useRef()

  useEffect(() => {
    clearTimeout(timeout.current)

    if (search.length < 2) {
      setMovies([])
      return
    }

    timeout.current = setTimeout(() => {
      setLoading(true)
      getMovies({ search })
        .then((movies) => {
          setMovies(movies.result)
          setLoading(false)
        })
    }, 600)
  }, [search])

  return (
    <Autocomplete
      onInputChange={(event, value) => {
        setSearch(value)
      }}
      loading={loading}
      disablePortal
      id='search-movie-autocomplete'
      options={movies}
      sx={{ width: 300 }}
      getOptionLabel={option => option.title}
      renderOption={(props, option, state) => {
        return (
          <div>
            <Link to={`/movie/${option.id}`}>
              {option.title}
              {option.info.rating && <Rating value={option.info.rating} precision={0.5} readOnly />}
            </Link>
          </div>
        )
      }}
      renderInput={(params) => <TextField {...params} label='Search a movie' />}
    />
  )
}

export default SearchForm
