import { useState } from 'react'
import { DialogContent, DialogTitle, TextField, Button, Grid, CircularProgress } from '@mui/material'
import { postLogin } from 'services/users';
import { useUserStore } from 'context/user/hooks';
import { LOGIN } from './../../context/user/constants';
import { useModalStore } from 'context/modal/hooks';
import { CLOSE_MODAL } from 'context/modal/constants';

const LoginForm = ({ switchForm }) => {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const [, modalDispatch] = useModalStore()
  const [, userDispatch] = useUserStore()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    postLogin(formValues).then((userData) => {
      setLoading(false)
      userDispatch({ type: LOGIN, payload: userData })
      window.localStorage.setItem('user', JSON.stringify(userData));
      modalDispatch({ type: CLOSE_MODAL })
    })
  }

  return (
    <>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin='dense'
                id='email'
                label='Email Address'
                type='text'
                name='email'
                value={formValues.email}
                fullWidth
                required
                onChange={handleInputChange}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label='Password'
                type='password'
                name='password'
                value={formValues.password}
                fullWidth
                required
                onChange={handleInputChange}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent='space-between'>
                <Button variant='contained' color='primary' type='submit'>
                  Submit {loading && <CircularProgress />}
                </Button>
                <Button variant='contained' color='secondary' type='button' onClick={switchForm}>
                  Register
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </>
  )
}

export default LoginForm
