import { createContext, useReducer } from 'react'
import reducer from './reducer'
import initialState from './initialState'

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

export default ModalProvider
