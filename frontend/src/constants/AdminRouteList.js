import { UserMgmt } from "../pages/admin/UserMgmt";
import { MdBookOnline, MdOutlinePeopleAlt } from 'react-icons/md'
import { CategoryMgmt } from "../pages/admin/CategoryMgmt";

export const AdminRouteList = [
  {
    name: 'User Management',
    url: '/user-management',
    icon: MdOutlinePeopleAlt,
    page: UserMgmt,
  },
  {
    name: 'Category Management',
    url: '/category-management',
    icon: MdBookOnline,
    page: CategoryMgmt,
  },
]
