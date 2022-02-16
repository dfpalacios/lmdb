import { useContext } from 'react'
import { ModalContext } from '.'

export const useModalStore = () => {
  return useContext(ModalContext)
}
