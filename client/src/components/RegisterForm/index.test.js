import React from 'react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import render from 'testing/functions'
import RegisterForm from 'components/RegisterForm'

import axios from 'axios'

jest.mock('axios')

describe('The register form', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<RegisterForm />)
  })

  const submitForm = () => {
    const registerButton = screen.getByRole('button', {
      name: /submit/i
    })
    fireEvent.click(registerButton)
  }

  it('renders without crashing', () => {
    const registerForm = screen.getByText(/Register/i)
    expect(registerForm).toBeInTheDocument()
  })

  it('fails if it is submitted with empty data', () => {
    submitForm()
    const errorUsernameText = screen.getByText(/username required/i)
    expect(errorUsernameText).toBeInTheDocument()
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
    const errorUsernameText = screen.getByText(/username required/i)
    expect(errorUsernameText).toBeInTheDocument()
    const errorPasswordText = screen.getByText(/password required/i)
    expect(errorPasswordText).toBeInTheDocument()
  })

  it('fails if only password is submitted', () => {
    const passwordField = screen.getByLabelText('Password')
    fireEvent.change(passwordField, { target: { value: '12345' } })
    submitForm()

    const errorPasswordText = screen.queryByText(/password required/i)
    expect(errorPasswordText).toBeNull()
    const errorUsernameText = screen.getByText(/username required/i)
    expect(errorUsernameText).toBeInTheDocument()
    const errorEmailText = screen.getByText(/email required/i)
    expect(errorEmailText).toBeInTheDocument()
  })

  it('fails if only username is submitted', () => {
    const passwordField = screen.getByLabelText('Username')
    fireEvent.change(passwordField, { target: { value: 'abcd' } })
    submitForm()

    const errorPasswordText = screen.queryByText(/username required/i)
    expect(errorPasswordText).toBeNull()
    const errorUsernameText = screen.getByText(/password required/i)
    expect(errorUsernameText).toBeInTheDocument()
    const errorEmailText = screen.getByText(/email required/i)
    expect(errorEmailText).toBeInTheDocument()
  })

  it('submits invalid info and shows error', async () => {
    const emailField = screen.getByLabelText(/email address/i)
    fireEvent.change(emailField, { target: { value: 'test@test.com' } })
    const passwordField = screen.getByLabelText('Password')
    fireEvent.change(passwordField, { target: { value: '12345' } })
    const usernameField = screen.getByLabelText('Username')
    fireEvent.change(usernameField, { target: { value: 'abcde' } })

    axios.post.mockImplementationOnce(() => Promise.reject(new Error('Register error')))
    await waitFor(() => submitForm())

    const errorRegisterText = screen.queryByText(/register error/i)
    expect(errorRegisterText).toBeInTheDocument()
  })

  it('submits valid info and closes', async () => {
    const emailField = screen.getByLabelText(/email address/i)
    fireEvent.change(emailField, { target: { value: 'test@test.com' } })
    const passwordField = screen.getByLabelText('Password')
    fireEvent.change(passwordField, { target: { value: '12345' } })
    const usernameField = screen.getByLabelText('Username')
    fireEvent.change(usernameField, { target: { value: 'abcde' } })

    axios.post.mockImplementationOnce(() => Promise.resolve({}))

    await waitFor(() => submitForm())
    const errorLoginText = screen.queryByText(/look in your inbox for the email/i)
    expect(errorLoginText).toBeInTheDocument()
  })
})
