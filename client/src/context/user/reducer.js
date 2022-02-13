import { LOGIN, REFRESH_TOKEN, LOGOUT } from './constants'
import initialState from './initialState'

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return action.payload
    }
    case REFRESH_TOKEN: {
      return {
        ...state.user,
        ...action.payload
      }
    }
    case LOGOUT: {
      return initialState
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default reducer
