import React from 'react'
import { Outlet } from 'react-router-dom'
import { Grid } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import 'assets/styles/app.css'

import Menu from 'parts/Menu'
import Header from 'parts/Header'
import { useModalStore } from 'context/ModalProvider/hooks'
import SigninDialog from 'components/SigninDialog'

const App = () => {
  const [modalState] = useModalStore()

  return (
    <div className='app'>
      <div className={'header-wrapper'}>
        <div className={'container'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Header />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={'menu-wrapper'}>
        <div className={'container'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Menu />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={'body-wrapper'}>
        <div className={'container'}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Outlet />
            </Grid>
          </Grid>
        </div>
      </div>
      {['login', 'register'].includes(modalState.modal) && <SigninDialog />}
    </div >
  )
}

export default App
