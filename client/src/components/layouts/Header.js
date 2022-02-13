import { Link } from 'react-router-dom'

import { useModalStore } from 'context/modal/hooks'
import { SHOW_MODAL } from 'context/modal/constants'
import LoginDialog from 'components/modals/LoginDialog'

const Header = () => {
  const [modalState, modalDispatch] = useModalStore()

  return (
    <>
      <p>Header</p>
      <Link to="/">Home</Link>
      <Link to="/about">About us</Link>
      <Link to="/box-office">BoxOffice</Link>
      <p onClick={() => {
        modalDispatch({
          type: SHOW_MODAL,
          payload: 'login'
        })
      }}
      >
        Login
      </p>
      {modalState.modal === 'login' && <LoginDialog />}
    </>
  )
}

export default Header
