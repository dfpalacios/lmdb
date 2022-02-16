import React, { useState, useEffect } from 'react';
import { Autocomplete, Rating, TextField } from '@mui/material';
import { getMovies } from 'services/movies';
import { Link } from 'react-router-dom';

const SearchForm = () => {

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search.length < 2) {
      setMovies([])
      return
    }
    getMovies({ search })
      .then((movies) => setMovies(movies.result))
  }, [search])

  return (
    <Autocomplete
      onInputChange={(event, value) => {
        setSearch(value)
      }}
      disablePortal
      id="combo-box-demo"
      options={movies}
      sx={{ width: 300 }}
      getOptionLabel={option => option.title}
      renderOption={(props, option, state) => {
        return (<div><Link to={`/movie/${option.id}`}>
          {option.title}
          {option.info.rating && <Rating value={option.info.rating / 2} readOnly />}
        </Link></div>)
      }}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  )
}

export default SearchForm