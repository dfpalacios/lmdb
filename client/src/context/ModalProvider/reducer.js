import { SHOW_MODAL, CLOSE_MODAL } from './constants'

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_MODAL: {
      return { modal: action.payload }
    }
    case CLOSE_MODAL: {
      return { modal: null }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export default reducer
