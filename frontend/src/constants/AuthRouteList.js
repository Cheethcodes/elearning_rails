import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

export const AuthRouteList = [
  {
    name: 'Login',
    url: '/',
    page: Login
  },
  {
    name: 'Register',
    url: '/register',
    page: Register
  },
]
