import { Dashboard } from '../pages/Dashboard'
import { ProfileSettings } from '../pages/ProfileSettings'
import { SingleUser } from '../pages/SingleUser'
import { Users } from '../pages/Users'

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
  },
  {
    name: 'Users',
    url: '/users',
    page: Users
  },
  {
    name: 'Single User',
    url: '/users/:id',
    page: SingleUser
  }
]
