import { useState } from 'react'
import { DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material'

const LoginForm = ({ switchForm }) => {
  const [formValues, setFormValues] = useState({
    username: '',
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
                id='username'
                label='Email Address or Username'
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
                  Submit
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
