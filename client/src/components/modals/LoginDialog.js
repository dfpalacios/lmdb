import { Dialog } from '@mui/material'
import LoginForm from 'components/forms/LoginForm'
import RegisterForm from 'components/forms/RegisterForm'
import { CLOSE_MODAL } from 'context/modal/constants'
import { useModalStore } from 'context/modal/hooks'
import { useState } from 'react'

const LoginDialog = () => {
  const [, modalDispatch] = useModalStore()
  const [open, setOpen] = useState(true)
  const [form, setForm] = useState('login')

  const handleClose = () => {
    setOpen(false)
    modalDispatch({ type: CLOSE_MODAL })
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='dialog-login'
    >
      {form === 'login' && <LoginForm switchForm={() => setForm('register')} />}
      {form === 'register' && <RegisterForm switchForm={() => setForm('login')} />}
    </Dialog>
  )
}

export default LoginDialog
