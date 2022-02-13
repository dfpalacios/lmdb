import { useContext } from 'react'
import { UserContext } from './UserProvider'

export const useUserStore = () => {
  return useContext(UserContext)
}
