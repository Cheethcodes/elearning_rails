import Cookies from 'js-cookie'
import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCustomReducer from '../hooks/useCustomReducer'
import SessionReducer from './SessionReducer'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useCustomReducer(SessionReducer, sessionStorage.getItem('loggedIn') === 'true' || false)
  const [loggedInUser, setLoggedInUser] = useState({
    id: Cookies.get('user_id') ? Cookies.get('user_id') : '',
    username: Cookies.get('user_username') ? Cookies.get('user_username') : '',
    email: Cookies.get('user_email') ? Cookies.get('user_email') : '',
    is_admin: Cookies.get('user_admin') ? Cookies.get('user_admin') : 'false',
  })
  const [profileUpdate, setProfileUpdate] = useState(true)

  const login = async () => {
    const data = await setLoggedIn({
      type: "login",
    })
  }

  const logout = async () => {
    const data = await setLoggedIn({
        type: 'logout'
    })

    setLoggedInUser({
        id: '',
        username: '',
        email: '',
        is_admin: 'false',
    })

    navigate('/')
}

  const value = useMemo(() => ({
    login,
    logout,
    loggedIn,
    loggedInUser,
    setLoggedInUser,
    profileUpdate,
    setProfileUpdate,
  }), [loggedIn, loggedInUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
