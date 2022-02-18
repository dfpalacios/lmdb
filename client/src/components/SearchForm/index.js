import React, { useEffect, useState, useRef } from 'react'
import { Autocomplete, Rating, TextField, styled } from '@mui/material'
import { getMovies } from 'services/movies'
import { Link } from 'react-router-dom'
import styles from './searchForm.module.scss'

const StyledAutocomplete = styled(Autocomplete)({
  '& .MuiInputLabel-outlined': {
    color: 'white'
  },
  '& .MuiInputLabel': {
    color: 'white'
  },
  '& .MuiAutocomplete-inputRoot': {
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      color: 'white'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white'
    }
  }
})

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
    <StyledAutocomplete
      onInputChange={(event, value) => {
        setSearch(value)
      }}
      loading={loading}
      disablePortal
      noOptionsText='No movies found'
      id='search-movie-autocomplete'
      options={movies}
      getOptionLabel={option => option.title}
      renderOption={(props, option, state) => {
        return (
          <Link to={`/movie/${option.id}`} className={styles.movie}>
            <span className={styles.title}>
              {option.title}
            </span>
            <span className={styles.rating}>
              {option.info.rating && <Rating value={option.info.rating} size='small' precision={0.5} readOnly />}
            </span>
            <span className={styles.cover}>
              {option.info.image_url &&
                <img src={option.info.image_url} alt={`${option.title} cover`} />}
              {!option.info.image_url &&
                <div className={styles.fakeCover}>
                  <svg viewBox='0 0 2 3' />
                  <span>N/A</span>
                </div>}
            </span>
          </Link>
        )
      }}
      renderInput={(params) => <TextField {...params} label='Search a movie' />}
    />
  )
}

export default SearchForm
