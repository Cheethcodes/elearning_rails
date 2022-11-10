import { UserMgmt } from "../pages/admin/UserMgmt";
import { MdOutlinePeopleAlt } from 'react-icons/md'

export const AdminRouteList = [
  {
    name: 'User Management',
    url: '/user-management',
    icon: MdOutlinePeopleAlt,
    page: UserMgmt,
  },
]
