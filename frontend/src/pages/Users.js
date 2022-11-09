import React, { useMemo, useState } from 'react'
import { Toastify } from '../components/Toastify'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

export const Users = () => {
  const { loggedInUser } = useAuth()
  const [users, setUsers] = useState([])

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: '/api/v1/users'
    }).then(response => {
      setUsers(response.data)
      console.log(response.data)
    }).catch(error => {
      Toastify('error', error.response.data)
    })
  }, [])

  return (
    <div>
      <h4 className='text-lg text-primary font-bold'>Elearning Community</h4>
      <hr className='my-1' />
      <div className='grid grid-cols-3'>
        {
          users.length > 1 ?
            users.filter(user => user.id.toString() !== loggedInUser.id).map((filteredIUser, index) => {
              console.log(filteredIUser)
              return (
                <div key={index} className='flex card p-5 gap-3'>
                  <div
                    className='avatar border-2 border-success flex items-center justify-center rounded-full overflow-hidden'
                    style={{
                      backgroundImage: `url(${(filteredIUser.avatar.url !== null && filteredIUser.avatar.url !== '') ? 'http://localhost:3000' + filteredIUser.avatar.url : 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                  <div>
                    <h4 className='font-medium text-normal text-primary'>{filteredIUser.username}</h4>
                    <small className='text-sm'>{filteredIUser.is_admin ? 'Instructor' : 'Student'}</small>
                  </div>
                </div>
              )
            })
            :
            <>
              <h4 className='font-bold text-md'>No users to show</h4>
            </>
        }
      </div>
    </div>
  )
}
