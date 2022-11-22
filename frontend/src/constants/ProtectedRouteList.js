import { Lessons } from '../pages/Lessons'
import { Dashboard } from '../pages/Dashboard'
import { ProfileSettings } from '../pages/ProfileSettings'
import { SingleUser } from '../pages/SingleUser'
import { Users } from '../pages/Users'
import { Words } from '../pages/Words'
import { Results } from '../pages/Results'

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
  },
  {
    name: 'Categories',
    url: '/lessons/',
    page: Lessons
  },
  {
    name: 'Words',
    url: '/lessons/start/:id',
    page: Words
  },
  {
    name: 'Words',
    url: '/lessons/result/:id',
    page: Results
  }
]
