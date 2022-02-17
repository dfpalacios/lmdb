import React, { useState } from 'react'
import { DialogContent, DialogTitle, TextField, Button, Grid, CircularProgress } from '@mui/material'
import { postLogin } from 'services/users'
import { useUserStore } from 'context/UserProvider/hooks'
import { LOGIN } from 'context/UserProvider/constants'
import { useModalStore } from 'context/ModalProvider/hooks'
import { CLOSE_MODAL } from 'context/ModalProvider/constants'
import { PropTypes } from 'prop-types'

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
      window.localStorage.setItem('user', JSON.stringify(userData))
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
                <Button variant='contained' color='warning' type='submit'>
                  Submit
                  {loading &&
                    <CircularProgress color='primary' size={15} style={{ marginLeft: '10px' }} thickness={5} />
                  }
                </Button>
                {switchForm &&
                  <Button variant='contained' color='primary' type='button' onClick={switchForm}>
                    Register
                  </Button>}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </>
  )
}

LoginForm.propTypes = {
  switchForm: PropTypes.func
}

export default LoginForm
