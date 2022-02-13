import { createContext, useReducer } from 'react'
import reducer from './reducer'
import initialState from './initialState'

export const UserContext = createContext()
const { Provider } = UserContext

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Provider value={[state, dispatch]}>
      {props.children}
    </Provider>
  )
}

export default UserProvider
