import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthProvider'

export const AdminRoute = ({ children }) => {
  const { loggedIn, loggedInUser } = useAuth()

  if (loggedIn && loggedInUser.is_admin === 'true') {
    return children
  }

  return <Navigate to='/' />
}
