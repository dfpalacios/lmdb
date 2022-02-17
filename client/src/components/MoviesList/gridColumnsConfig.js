
import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Rating } from '@mui/material'
import styles from './moviesList.module.scss'

const gridColumnsConfig = [
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
        <Link to={`/movie/${params.value.id}`} className={styles.link}>
          {params.value.title}
        </Link>
      </>
  },
  {
    field: 'image',
    headerName: 'Image',
    minWidth: 100,
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
    minWidth: 250,
    disableColumnMenu: true,
    disableColumnReorder: true,
    disableReorder: true,
    sortable: false,
    renderCell: (params) =>
      <ul className={styles.genres}>
        {params.value.map((genre) => (<li key={genre}>{genre}</li>))}
      </ul>
  }
]

export default gridColumnsConfig
