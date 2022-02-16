import React, { useState } from 'react'
import { DialogContent, DialogTitle, TextField, Button, Grid, Alert, AlertTitle, CircularProgress } from '@mui/material'
import { postRegister } from 'services/users'
import { PropTypes } from 'prop-types'

const RegisterForm = ({ switchForm }) => {
  const [registerComplete, setRegisterComplete] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: ''
  })

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
    postRegister(formValues).then((userData) => {
      setLoading(false)
      setRegisterComplete(true)
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
            </Grid>
          }
        </Grid>
      </DialogContent>
    )
  }

  return (
    <>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
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
                required
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
                {switchForm &&
                  <Button variant='contained' color='secondary' type='button' onClick={switchForm}>
                    Go to Login
                  </Button>
                }
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
