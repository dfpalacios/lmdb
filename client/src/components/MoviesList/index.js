import React, { useEffect, useState } from 'react'
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { getMovies } from 'services/movies'
import { DataGrid } from '@mui/x-data-grid'
import genresAndTopics from './genresAndTopics'
import gridColumnsConfig from './gridColumnsConfig'
import { ErrorBoundary } from 'react-error-boundary'

const MoviesList = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorLoading, setErrorLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [sortModel, setSortModel] = useState([{ field: 'rank', sort: 'asc' }])
  const [genresFilter, setGenresFilter] = useState([])
  const pageSize = 10

  const handleUpdateGenresFilter = (event) => {
    const {
      target: { value }
    } = event
    setGenresFilter(value)
  }

  const handleDeleteGenre = (value) => {
    setGenresFilter(genresFilter.filter((genre) => genre !== value))
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel)
  }

  const onMouseDown = (e) => {
    e.stopPropagation()
  }

  const loadMovies = () => {
    setLoading(true)
    setErrorLoading(false)
    getMovies({
      page,
      offset:
        pageSize,
      field:
        sortModel[0]?.field,
      sort: sortModel[0]?.sort,
      genres: genresFilter
    }).then((data) => {
      setTotal(data.total)

      const rows = data.result.map((movie) => ({
        id: movie.id,
        rank: movie.info.rank,
        title: {
          id: movie.id,
          title: movie.title
        },
        rating: movie.info.rating,
        genres: movie.info.genres,
        image: {
          src: movie.info.image_url,
          alt: movie.title
        }
      }))

      setMovies(rows)
    }, () => {
      setErrorLoading(true)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(loadMovies, [page, sortModel, genresFilter])

  const errorFallback = () => (
    <p>There was an error loading the movies.</p>
  )

  return (
    <>
      <FormControl sx={{ width: '100%', margin: '30px 0 30px 0' }}>
        <InputLabel id='select-genres-label'>Genres &amp; Topics</InputLabel>
        <Select
          labelId='select-genres-label'
          id='select-genres'
          multiple
          sx={{ width: '100%' }}
          value={genresFilter}
          onChange={handleUpdateGenresFilter}
          input={<OutlinedInput id='select-genres-label' label='Genres &amp; Topics' />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} onDelete={() => handleDeleteGenre(value)} onMouseDown={onMouseDown} />
              ))}
            </Box>
          )}
        >
          {genresAndTopics.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ErrorBoundary FallbackComponent={errorFallback}>
        <div style={{ width: '100%' }}>
          {loading &&
            <>
              <p>Loading movies...</p>
            </>}
          {!loading && errorLoading &&
            <>
              <p>There was an error loading the movies.</p>
            </>}
          {!loading && !errorLoading &&
            <DataGrid
              rows={movies}
              columns={gridColumnsConfig}
              autoHeight
              rowHeight={120}
              rowsPerPageOptions={[]}
              hideFooterSelectedRowCount
              paginationMode='server'
              sortingMode='server'
              rowCount={total}
              autoPageSize
              sortModel={sortModel}
              onSortModelChange={handleSortModelChange}
              onPageChange={handlePageChange}
            />}
        </div>
      </ErrorBoundary>
    </>
  )
}

export default MoviesList
