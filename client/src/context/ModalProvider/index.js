import React, { createContext, useReducer } from 'react'
import reducer from './reducer'
import initialState from './initialState'
import { PropTypes } from 'prop-types'

export const ModalContext = createContext()
const { Provider } = ModalContext

const ModalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Provider value={[state, dispatch]}>
      {props.children}
    </Provider>
  )
}

ModalProvider.propTypes = {
  children: PropTypes.any
}

export default ModalProvider
