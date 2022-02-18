import React from 'react'
import { screen } from '@testing-library/react'
import render from 'testing/functions'
import SigninDialog from './index'

describe('The Signin dialog', () => {
  it('renders component showing login form', () => {
    render(<SigninDialog />, { modalContext: { modal: 'login' } })
    const loginForm = screen.getByText('Login')
    expect(loginForm).toBeInTheDocument()
  })

  it('renders component showing register form', () => {
    render(<SigninDialog />, { modalContext: { modal: 'register' } })
    const loginForm = screen.getByText('Register')
    expect(loginForm).toBeInTheDocument()
  })
})
