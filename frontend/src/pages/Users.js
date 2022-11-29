import React, { useMemo, useState } from 'react'
import { Toastify } from '../components/Toastify'
import { useAuth } from '../services/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { GetProfile } from '../constants/Profile'

export const Users = () => {
  const { loggedInUser } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  const data = useMemo(() => {
    GetProfile().then(response => {
      setUsers(response)
    }).catch(error => {
      Toastify('error')
    })
  }, [])

  return (
    <div>
      <h4 className='text-lg text-primary font-bold'>Elearning Community</h4>
      <hr className='mt-1 mb-4' />
      <div className='grid grid-cols-4 gap-5'>
        {
          users.length > 1 ?
            users.filter(user => user.id.toString() !== loggedInUser.id).map((filteredUser, index) => {
              return (
                <div key={index} className='flex card p-5 gap-3' onClick={() => navigate(`/users/${filteredUser.id}`)}>
                  <div
                    className='avatar border-2 border-success flex items-center justify-center rounded-full overflow-hidden'
                    style={{
                      backgroundImage: `url(${(filteredUser.avatar.url !== null && filteredUser.avatar.url !== '') ? 'http://localhost:3000' + filteredUser.avatar.url : 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                  <div className='flex flex-col justify-center'>
                    <h4 className='font-medium text-normal text-primary'>{filteredUser.username}</h4>
                    <small className='text-sm'>{filteredUser.is_admin ? 'Instructor' : 'Student'}</small>
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
