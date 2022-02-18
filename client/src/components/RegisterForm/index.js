import React, { useState } from 'react'
import { DialogContent, DialogTitle, TextField, Button, Grid, Alert, AlertTitle, CircularProgress } from '@mui/material'
import { postRegister } from 'services/users'
import { PropTypes } from 'prop-types'

const RegisterForm = ({ switchForm }) => {
  const [registerComplete, setRegisterComplete] = useState(false)
  const [errorRegister, setErrorRegister] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setSubmitted(false)
    setErrorRegister(false)
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    if (formValues.email === '' ||
      formValues.password === '' ||
      formValues.username === '') {
      return false
    }
    setLoading(true)
    postRegister(formValues).then((userData) => {
      setSubmitted(false)
      setLoading(false)
      setRegisterComplete(true)
    }).catch(() => {
      setLoading(false)
      setErrorRegister(true)
    })
  }

  if (registerComplete) {
    return (
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Alert severity='success'>
              <AlertTitle>We&apos;re almost done!</AlertTitle>
              Look in your inbox for the email with the activation link for your account.
            </Alert>
          </Grid>
          {switchForm &&
            <Grid item xs={12}>
              <Button variant='contained' color='secondary' type='button' onClick={switchForm}>
                Back to Login
              </Button>
            </Grid>}
        </Grid>
      </DialogContent>
    )
  }

  return (
    <>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        {errorRegister &&
          <Alert severity='warning'>
            <AlertTitle>Register error</AlertTitle>
            Please check your user info and try again.
          </Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin='dense'
                id='username'
                label='Username'
                type='text'
                name='username'
                value={formValues.username}
                fullWidth
                error={submitted && formValues.username === ''}
                helperText={submitted && formValues.username === '' ? 'Username required' : ''}
                onChange={handleInputChange}
                variant='standard'
              />
            </Grid>

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
                autoFocus
                margin='dense'
                id='name'
                label='Password'
                type='password'
                name='password'
                value={formValues.password}
                error={submitted && formValues.password === ''}
                helperText={submitted && formValues.password === '' ? 'Password required' : ''}
                fullWidth
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
                    Go to Login
                  </Button>}
              </Grid>
            </Grid>

          </Grid>
        </form>
      </DialogContent>
    </>
  )
}

RegisterForm.propTypes = {
  switchForm: PropTypes.func
}

export default RegisterForm
