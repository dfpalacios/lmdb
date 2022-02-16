import React, { useEffect, useState } from 'react'
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Rating, Select } from '@mui/material'
import { getMovies } from 'services/movies'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

const genresAndTopics = [
  'Action',
  'Animation',
  'Adventure',
  'Biography',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller'
]

const columns = [
  {
    field: 'rank',
    headerName: 'Rank',
    minWidth: 200,
    disableColumnMenu: true,
    disableColumnReorder: true,
    disableReorder: true
  },
  {
    field: 'title',
    headerName: 'Title',
    minWidth: 200,
    disableColumnMenu: true,
    disableColumnReorder: true,
    disableReorder: true,
    renderCell: (params) =>
      <>
        <Link to={`/movie/${params.value.id}`}>
          {params.value.title}
        </Link>
      </>
  },
  {
    field: 'image',
    headerName: 'Image',
    minWidth: 200,
    disableColumnMenu: true,
    disableColumnReorder: true,
    disableReorder: true,
    sortable: false,
    renderCell: (params) => (
      params.value.src
        ? <img height='80' src={`${params.value.src}`} alt={params.value.alt} />
        : (
          <Box sx={{
            height: '80px',
            width: '54px',
            backgroundColor: '#ccc',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            <span>N/A</span>
          </Box>
        )
    )
  },
  {
    field: 'rating',
    headerName: 'Score',
    minWidth: 200,
    disableColumnMenu: true,
    disableColumnReorder: true,
    disableReorder: true,
    renderCell: (params) => (params.value
      ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div><Rating value={params.value / 2} precision={0.5} readOnly /></div>
          <div>({params.value})</div>
        </div>
      )
      : <div>No rating available</div>
    )
  },
  {
    field: 'genres',
    headerName: 'Genres & Topics',
    minWidth: 200,
    disableColumnMenu: true,
    disableColumnReorder: true,
    disableReorder: true,
    sortable: false,
    renderCell: (params) =>
      <ul>
        {params.value.map((genre) => (<li key={genre}>{genre}</li>))}
      </ul>
  }
]

const MoviesList = () => {
  const [movies, setMovies] = useState(null)
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
    })
  }

  useEffect(loadMovies, [page, sortModel, genresFilter])

  if (!movies) {
    return <p>Loading</p>
  }

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
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

      <div style={{ width: '100%' }}>
        <DataGrid
          rows={movies}
          columns={columns}
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
        />
      </div>
    </>
  )
}

export default MoviesList
