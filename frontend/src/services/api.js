import axios from 'axios'
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_RAILS_API}`,
  headers: {
    common: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Content-Type': 'application/json; charset=utf-8',
      "X-Frame-Options": "SAMEORIGIN",
      "X-XSS-Protection": "0",
      "X-Content-Type-Options": "nosniff",
      "X-Download-Options": "noopen",
      "X-Permitted-Cross-Domain-Policies": "none",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  },
  mode: 'cors',
  credentials: 'include'
})

apiClient.interceptors.request.use(function (config) {
  const accessToken = Cookies.get('access-token')
  const tokenType = Cookies.get('token-type')
  const client = Cookies.get('client')
  const uid = Cookies.get('uid')
  const authorization = Cookies.get('authorization')

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
  config.headers['access-token'] = accessToken ? accessToken : ''
  config.headers['token-type'] = tokenType ? tokenType : ''
  config.headers['client'] = client ? client : ''
  config.headers['uid'] = uid ? uid : ''
  config.headers['authorization'] = authorization ? authorization : ''

  return config
})

export default apiClient
