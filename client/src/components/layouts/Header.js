import LoginDialog from 'components/modals/LoginDialog'

import logo from './logo_lmdb.png'
import { Box, Grid } from '@mui/material';
import { useUserStore } from 'context/user/hooks';
import { useModalStore } from 'context/modal/hooks'

import { SHOW_MODAL } from 'context/modal/constants'
import UserMenu from 'components/user/UserMenu';
import SearchForm from 'components/forms/SearchForm';

const Header = () => {
  const [user] = useUserStore()
  const [modalState, modalDispatch] = useModalStore()

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <img src={logo} alt="LMDB logo" />
      </Grid>
      <Grid item xs={4}>
        <SearchForm />
      </Grid>
      <Grid item xs={4}>
        {!user.id && (
          <span onClick={() => {
            modalDispatch({
              type: SHOW_MODAL,
              payload: 'login'
            })
          }}
          >
            Login
          </span>
        )}
        {user.id &&
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <p>Welcome, <strong>{user.name}!</strong></p>
            <UserMenu user={user} />
          </Box>
        }
        {modalState.modal === 'login' && <LoginDialog />}
      </Grid>
    </Grid>
  )
}

export default Header
