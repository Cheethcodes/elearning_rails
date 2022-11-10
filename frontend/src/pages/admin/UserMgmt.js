import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toastify } from '../../components/Toastify'
import apiClient from '../../services/api'
import { useAuth } from '../../services/AuthProvider'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'

export const UserMgmt = () => {
  const { loggedInUser } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [update, setUpdate] = useState(true)

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: '/api/v1/users'
    }).then(response => {
      setUsers(response.data)
    }).catch(error => {
      Toastify('error', error.response.data)
    })

    setUpdate(false)
  }, [update])

  const toggleAdminRole = () => {
  }

  return (
    <div>
      <h4 className='text-lg text-primary font-bold'>User Management Console</h4>
      <hr className='mt-1 mb-4' />
      <div className='console-container'>
        <table className='w-full'>
          <tbody>
            <tr className='sticky top-0'>
              <td className='font-medium py-2 px-4 bg-primary text-white'>Username</td>
              <td className='font-medium py-2 px-4 bg-primary text-white'>Action</td>
            </tr>
            {
              users.length > 1 ?
                users.filter(user => user.id.toString() !== loggedInUser.id).map((filteredUser, index) => {
                  return (
                    <tr key={index}>
                      <td className={`py-2 px-4${index%2 === 1 ? ' bg-slate-200' : ''}`}>{filteredUser.username}</td>
                      <td className={`py-2 px-4${index%2 === 1 ? ' bg-slate-200' : ''}`}>
                        <div className='flex items-center gap-1'>
                          <button
                            type='button'
                            className={`py-1 px-4 text-white border hover:bg-transparent ${filteredUser.is_admin ? 'bg-danger border-danger hover:text-danger' : 'bg-success border-success hover:text-success'}`}
                            onClick={() => toggleAdminRole(filteredUser.id)}>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}
