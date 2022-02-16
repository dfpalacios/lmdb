import { LOGIN, REFRESH_TOKEN, LOGOUT } from './constants'

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
      return {
        id: null,
        name: null,
        token: null,
        refreshToken: null
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default reducer
