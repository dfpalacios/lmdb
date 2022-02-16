import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserStore } from 'context/UserProvider/hooks'
import { PropTypes } from 'prop-types'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user] = useUserStore()

  return user.id ? <Outlet /> : <Navigate to='/' />
}

ProtectedRoute.propTypes = {
  component: PropTypes.object
}

export default ProtectedRoute
