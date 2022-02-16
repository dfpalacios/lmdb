import React from 'react'
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import 'styles/App.scss'

import Menu from 'components/layouts/Menu'
import Header from 'components/layouts/Header'

const App = () => {
  return (
    <div className='App'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={2}>
          <Menu />
        </Grid>
        <Grid item xs={10}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
