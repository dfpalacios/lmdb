import React, { useState } from 'react'
import { Alert, AlertTitle, DialogContent, DialogTitle, TextField, Button, Grid, CircularProgress } from '@mui/material'
import { postLogin } from 'services/users'
import { useUserStore } from 'context/UserProvider/hooks'
import { LOGIN } from 'context/UserProvider/constants'
import { useModalStore } from 'context/ModalProvider/hooks'
import { CLOSE_MODAL } from 'context/ModalProvider/constants'
import { PropTypes } from 'prop-types'

const LoginForm = ({ switchForm }) => {
  const [loading, setLoading] = useState(false)
  const [errorLogin, setErrorLogin] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const [, modalDispatch] = useModalStore()
  const [, userDispatch] = useUserStore()

  const handleInputChange = (e) => {
    setSubmitted(false)
    setErrorLogin(false)
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (formValues.email === '' || formValues.password === '') {
      return false
    }
    setLoading(true)
    postLogin(formValues).then((userData) => {
      setSubmitted(false)
      setLoading(false)
      userDispatch({ type: LOGIN, payload: userData })
      window.localStorage.setItem('user', JSON.stringify(userData))
      modalDispatch({ type: CLOSE_MODAL })
    }).catch(() => {
      setLoading(false)
      setErrorLogin(true)
    })
  }

  return (
    <>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        {errorLogin &&
          <Alert severity='warning'>
            <AlertTitle>Login error</AlertTitle>
            Check your email and password and try again.
          </Alert>}
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
                error={submitted && formValues.email === ''}
                helperText={submitted && formValues.email === '' ? 'Email required' : ''}
                onChange={handleInputChange}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin='dense'
                id='password'
                label='Password'
                type='password'
                name='password'
                value={formValues.password}
                fullWidth
                error={submitted && formValues.password === ''}
                helperText={submitted && formValues.password === '' ? 'Password required' : ''}
                onChange={handleInputChange}
                variant='standard'
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent='space-between'>
                <Button variant='contained' color='warning' type='submit'>
                  Submit
                  {loading &&
                    <CircularProgress color='primary' size={15} style={{ marginLeft: '10px' }} thickness={5} />}
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
