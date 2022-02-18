import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import render from 'testing/functions'
import UserMenu from 'components/UserMenu'

describe('The user menu', () => {
  it('shows login and register links if user is not logged', () => {
    render(<UserMenu />)
    const loginLink = screen.getByText('Login')
    expect(loginLink).toBeInTheDocument()
    const registerLink = screen.getByText('Register')
    expect(registerLink).toBeInTheDocument()
  })

  it('shows user name and menu if user is logged', () => {
    render(<UserMenu />, { userContext: { id: 1, name: 'testname', token: '12356890' } })
    const welcomeMessage = screen.getByText(/testname!/i)
    expect(welcomeMessage).toBeInTheDocument()
    const accountMenu = screen.getByLabelText(/account menu/i)
    expect(accountMenu).toBeInTheDocument()
  })

  it('shows login and register links after logout', () => {
    render(<UserMenu />, { userContext: { id: 1, name: 'testname', token: '12356890' } })
    const welcomeMessage = screen.getByText(/testname!/i)
    expect(welcomeMessage).toBeInTheDocument()
    const loginButton = screen.getByRole('button', {
      label: /account menu/i
    })
    fireEvent.click(loginButton)
    const logoutButton = screen.getByRole('menuitem', {
      name: /logout/i
    })
    expect(logoutButton).toBeInTheDocument()
    fireEvent.click(logoutButton)
    const loginLink = screen.getByText('Login')
    expect(loginLink).toBeInTheDocument()
  })
})
