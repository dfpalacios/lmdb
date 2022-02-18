import React, { useEffect, useState } from 'react'

import { Dialog } from '@mui/material'
import LoginForm from 'components/LoginForm'
import RegisterForm from 'components/RegisterForm'
import { CLOSE_MODAL } from 'context/ModalProvider/constants'
import { useModalStore } from 'context/ModalProvider/hooks'

const SigninDialog = () => {
  const [modalStatus, modalDispatch] = useModalStore()
  const [open, setOpen] = useState(true)
  const [form, setForm] = useState(modalStatus.modal)

  const handleClose = () => {
    modalDispatch({ type: CLOSE_MODAL })
  }

  useEffect(() => {
    if (modalStatus.modal === null) {
      setOpen(false)
    }
  }, [modalStatus])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='dialog-login'
      >
        {form === 'login' && <LoginForm switchForm={() => setForm('register')} />}
        {form === 'register' && <RegisterForm switchForm={() => setForm('login')} />}
      </Dialog>
    </>
  )
}

export default SigninDialog
