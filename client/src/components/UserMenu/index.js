import React, { useState } from 'react'
import { Menu, MenuItem, Box, IconButton, Tooltip, Avatar } from '@mui/material'
import { LOGOUT } from 'context/UserProvider/constants'
import { useUserStore } from 'context/UserProvider/hooks'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

const UserMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [, userDispatch] = useUserStore()

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    userDispatch({ type: LOGOUT })
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{user.name[0]}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Link to='/profile'>
            My account
          </Link>
        </MenuItem>
        <MenuItem onClick={logout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

UserMenu.propTypes = {
  user: PropTypes.object
}

export default UserMenu
