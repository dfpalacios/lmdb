import React from 'react'
import { Grid } from '@mui/material'
import logo from 'assets/img/logo_lmdb.png'
import UserMenu from 'components/UserMenu'
import SearchForm from 'components/SearchForm'
import styles from './header.module.scss'

const Header = () => {
  return (
    <Grid container spacing={2} className={styles.header}>
      <Grid item xs={4} className={styles.logo}>
        <img src={logo} alt='LMDB logo' />
      </Grid>
      <Grid item xs={4}>
        <SearchForm />
      </Grid>
      <Grid item xs={4} className={styles.signinColumn}>
        <UserMenu />
      </Grid>
    </Grid>
  )
}

export default Header
