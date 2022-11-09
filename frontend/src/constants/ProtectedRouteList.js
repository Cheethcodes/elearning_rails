import { Dashboard } from '../pages/Dashboard'
import { ProfileSettings } from '../pages/ProfileSettings'

export const ProtectedRouteList = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    page: Dashboard
  },
  {
    name: 'Settings',
    url: '/settings',
    page: ProfileSettings
  }
]
