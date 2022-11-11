import { UserMgmt } from "../pages/admin/UserMgmt";
import { MdAdd, MdBookOnline, MdOutlinePeopleAlt } from 'react-icons/md'
import { CategoryMgmt } from "../pages/admin/CategoryMgmt";
import { WordMgmt } from "../pages/admin/WordMgmt";

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
  {
    name: 'Word Management',
    url: '/word-management',
    icon: MdAdd,
    page: WordMgmt,
  },
]
