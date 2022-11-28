import Cookies from "js-cookie"
import { Toastify } from "../components/Toastify"
import apiClient from "./api"

export default function SessionReducer(state, action) {
  switch (action.type) {
    case 'login':
      sessionStorage.setItem('loggedIn', 'true')
      return true

    case 'logout':
      apiClient({
        method: 'delete',
        url: '/user/sign_out'
      }).then(response => {
        sessionStorage.setItem('loggedIn', 'false')
        Cookies.remove('user_id')
        Cookies.remove('user_username')
        Cookies.remove('user_email')
        Cookies.remove('user_admin')
        Cookies.remove('token-type')
        Cookies.remove('access-token')
        Cookies.remove('client')
        Cookies.remove('uid')
        Cookies.remove('authorization')
      }).catch(error => {
        Toastify('error')
      })
      return false

    default:
      return state.items
  }
}
