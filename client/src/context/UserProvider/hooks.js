import { useContext } from 'react'
import { UserContext } from '.'

export const useUserStore = () => {
  return useContext(UserContext)
}
