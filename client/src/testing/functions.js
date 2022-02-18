import { render } from '@testing-library/react'

import React from 'react'

import ModalProvider from 'context/ModalProvider'
import UserProvider from 'context/UserProvider'
import { BrowserRouter } from 'react-router-dom'

const renderWithProviders = (ui, contexts) => {
  const modalContextValue = contexts?.modalContext
  const userContextValue = contexts?.userContext

  return render(
    <UserProvider value={userContextValue}>
      <ModalProvider value={modalContextValue}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </ModalProvider>
    </UserProvider>
  )
}

export default renderWithProviders
