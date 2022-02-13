import { useContext } from 'react'
import { ModalContext } from './ModalProvider'

export const useModalStore = () => {
  return useContext(ModalContext)
}
