import React, { useMemo, useState } from 'react'
import { AdminPanel } from '../../components/AdminPanel'
import { Toastify } from '../../components/Toastify'
import apiClient from '../../services/api'
import { useAuth } from '../../services/AuthProvider'

export const UserMgmt = () => {
  const { loggedInUser } = useAuth()
  const [users, setUsers] = useState([])
  const [update, setUpdate] = useState(true)

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: '/api/v1/users'
    }).then(response => {
      setUsers(response.data)
    }).catch(error => {
      Toastify('error')
    })

    setUpdate(false)
  }, [update])

  const toggleAdminRole = (id, is_admin) => {
    apiClient({
      method: 'patch',
      url: '/api/v1/users/update_role',
      data: {
        user: {
          controls: loggedInUser.is_admin,
          id: id,
          is_admin: !is_admin,
        }
      }
    }).then(response => {
      Toastify('success', 'Successfully updated user!')
      setUpdate(true)
    }).catch(error => {
      Toastify('error')
    })
  }

  return (
    <div>
      <h4 className='text-lg text-primary font-bold'>User Management Console</h4>
      <AdminPanel tableHeaders={['Username', 'Action']} >
        {
          users.length > 1 ?
            users.filter(user => user.id.toString() !== loggedInUser.id).map((filteredUser, index) => {
              return (
                <tr key={index}>
                  <td className={`py-2 px-4${index % 2 === 1 ? ' bg-slate-200' : ''}`}>{filteredUser.username}</td>
                  <td className={`py-2 px-4${index % 2 === 1 ? ' bg-slate-200' : ''}`}>
                    <div className='flex items-center gap-1'>
                      <button
                        type='button'
                        className={`py-2 px-3 text-white border hover:bg-transparent ${filteredUser.is_admin ? 'bg-danger border-danger hover:text-danger' : 'bg-success border-success hover:text-success'}`}
                        onClick={() => toggleAdminRole(filteredUser.id, filteredUser.is_admin)}>
                        {
                          filteredUser.is_admin ? 'Remove instructor privilege' : 'Make instructor'
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan='2'>No users to show</td>
            </tr>
        }
      </AdminPanel>
    </div>
  )
}
