import React from 'react'
import SigninDialog from 'components/SigninDialog'

import { Box, Grid } from '@mui/material'
import { useUserStore } from 'context/UserProvider/hooks'
import { useModalStore } from 'context/ModalProvider/hooks'

import logo from 'assets/img/logo_lmdb.png'
import { SHOW_MODAL } from 'context/ModalProvider/constants'
import UserMenu from 'components/UserMenu'
import SearchForm from 'components/SearchForm'

const Header = () => {
  const [user] = useUserStore()
  const [modalState, modalDispatch] = useModalStore()

  const showLogin = () => {
    modalDispatch({
      type: SHOW_MODAL,
      payload: 'login'
    })
  }

  const showRegister = () => {
    modalDispatch({
      type: SHOW_MODAL,
      payload: 'register'
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <img src={logo} alt='LMDB logo' />
      </Grid>
      <Grid item xs={4}>
        <SearchForm />
      </Grid>
      <Grid item xs={4}>
        {!user.id && (
          <>
            <span onClick={showLogin}>
              Login
            </span>

            <span onClick={showRegister}>
              Register
            </span>
          </>
        )}
        {user.id &&
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <p>Welcome, <strong>{user.name}!</strong></p>
            <UserMenu user={user} />
          </Box>}
        {['login', 'register'].includes(modalState.modal) && <SigninDialog />}
      </Grid>
    </Grid>
  )
}

export default Header
