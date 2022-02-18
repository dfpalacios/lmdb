import React from 'react'
import { screen } from '@testing-library/react'
import render from 'testing/functions'
import App from './App'

describe('The app', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('renders without crashing', () => {
    const logoElement = screen.getByAltText(/LMDB logo/i)
    expect(logoElement).toBeInTheDocument()
  })

  it('shows login and register link', () => {
    const loginElement = screen.getByText(/login/i)
    expect(loginElement).toBeInTheDocument()
    const registerElement = screen.getByText(/register/i)
    expect(registerElement).toBeInTheDocument()
  })

  it('shows navbar', () => {
    const navElement = screen.getByText(/home/i)
    expect(navElement).toBeInTheDocument()
  })

  it('shows search form', () => {
    const searchFormElement = screen.getByLabelText(/search a movie/i)
    expect(searchFormElement).toBeInTheDocument()
  })
})
