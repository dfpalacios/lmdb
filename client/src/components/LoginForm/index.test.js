import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import render from 'testing/functions'
import LoginForm from 'components/LoginForm'

import axios from 'axios'

jest.mock('axios')

describe('The login form', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<LoginForm />)
  })

  const submitForm = () => {
    const loginButton = screen.getByRole('button', {
      name: /submit/i
    })
    fireEvent.click(loginButton)
  }

  it('renders without crashing', () => {
    const loginForm = screen.getByText(/Login/i)
    expect(loginForm).toBeInTheDocument()
  })

  it('fails if it is submitted with empty data', () => {
    submitForm()
    const errorEmailText = screen.getByText(/email required/i)
    expect(errorEmailText).toBeInTheDocument()
    const errorPasswordText = screen.getByText(/password required/i)
    expect(errorPasswordText).toBeInTheDocument()
  })

  it('fails if only email is submitted', () => {
    const emailField = screen.getByLabelText(/email address/i)
    fireEvent.change(emailField, { target: { value: 'test@test.com' } })
    submitForm()

    const errorEmailText = screen.queryByText(/email required/i)
    expect(errorEmailText).toBeNull()
    const errorPasswordText = screen.getByText(/password required/i)
    expect(errorPasswordText).toBeInTheDocument()
  })

  it('fails if only password is submitted', () => {
    const passwordField = screen.getByLabelText('Password')
    fireEvent.change(passwordField, { target: { value: '12345' } })
    submitForm()

    const errorPasswordText = screen.queryByText(/password required/i)
    expect(errorPasswordText).toBeNull()
    const errorEmailText = screen.getByText(/email required/i)
    expect(errorEmailText).toBeInTheDocument()
  })

  it('submits invalid info and shows error', async () => {
    const emailField = screen.getByLabelText(/email address/i)
    fireEvent.change(emailField, { target: { value: 'test@test.com' } })
    const passwordField = screen.getByLabelText('Password')
    fireEvent.change(passwordField, { target: { value: '12345' } })

    axios.post.mockImplementationOnce(() => Promise.reject(new Error('Bad credentials')))
    await waitFor(() => submitForm())

    const errorLoginText = screen.queryByText(/login error/i)
    expect(errorLoginText).toBeInTheDocument()
  })

  it('submits valid info and closes', async () => {
    const emailField = screen.getByLabelText(/email address/i)
    fireEvent.change(emailField, { target: { value: 'test@test.com' } })
    const passwordField = screen.getByLabelText('Password')
    fireEvent.change(passwordField, { target: { value: '12345' } })

    const loggedUser = {
      id: 1,
      name: 'test user',
      token: 'abcdefghijk',
      email: 'test@test.com'
    }

    axios.post.mockImplementationOnce(() => Promise.resolve(loggedUser))

    await waitFor(() => submitForm())
    const errorLoginText = screen.queryByText(/login error/i)
    expect(errorLoginText).toBeNull()
  })
})
