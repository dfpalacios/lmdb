import React from 'react'

import { Grid } from '@mui/material'
import { useUserStore } from 'context/UserProvider/hooks'
import { useModalStore } from 'context/ModalProvider/hooks'

import logo from 'assets/img/logo_lmdb.png'
import { SHOW_MODAL } from 'context/ModalProvider/constants'
import UserMenu from 'components/UserMenu'
import SearchForm from 'components/SearchForm'

import styles from './header.module.scss'

const Header = () => {
  const [user] = useUserStore()
  const [, modalDispatch] = useModalStore()

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
    <Grid container spacing={2} className={styles.header}>
      <Grid item xs={4} className={styles.logo}>
        <img src={logo} alt='LMDB logo' />
      </Grid>
      <Grid item xs={4}>
        <SearchForm />
      </Grid>
      <Grid item xs={4} className={styles.signinColumn}>
        {!user.id && (
          <ul className={styles.links}>
            <li onClick={showLogin}>
              Login
            </li>
            <li onClick={showRegister}>
              Register
            </li>
          </ul>
        )}
        {user.id &&
          <>
            <span className={styles.welcomeText}>Welcome, <strong>{user.name}!</strong></span>
            <UserMenu user={user} />
          </>}
      </Grid>
    </Grid>
  )
}

export default Header
