import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import styles from './menu.module.scss'

const Menu = () => {
  const location = useLocation()

  const getMenuClass = (pathname) => (location.pathname === pathname ? styles.active : '')

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li><Link to='/' className={getMenuClass('/')}>Home</Link></li>
        <li><Link to='/about' className={getMenuClass('/about')}> About us</Link></li>
        <li><Link to='/box-office' className={getMenuClass('/box-office')}> BoxOffice</Link></li>
      </ul>
    </nav>
  )
}

export default Menu
