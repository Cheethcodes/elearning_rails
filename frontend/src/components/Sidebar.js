import React, { useMemo, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { useAuth } from '../services/AuthProvider'
import { BsGear, BsHouseDoor } from 'react-icons/bs'
import { TbBook2, TbDashboard, TbUser } from 'react-icons/tb'
import UserAvatar from './UserAvatar'
import apiClient from '../services/api'
import { Toastify } from './Toastify'
import { AdminRouteList } from '../constants/AdminRouteList'

export const Sidebar = () => {
  const { loggedInUser, profileUpdate } = useAuth()
  const [avatar, setAvatar] = useState(null)

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: `/api/v1/users/${loggedInUser.id}`
    }).then(response => {
      setAvatar((response.data.avatar !== null && response.data.avatar !== '') ? response.data.avatar.url : null)
    }).catch(error => {
      Toastify('error', error.reponse.data)
    })
  }, [profileUpdate])

  return (
    <div id='sidebar' className='flex justify-between flex-col sticky'>
      <div className='menu flex flex-col grow gap-7 pt-4 px-5'>
        <div className='flex justify-between items-center'>
          <a href='/dashboard' style={{ padding: '0' }}>SITE LOGO</a>
          <button style={{ padding: '0' }}>
            <GiHamburgerMenu />
          </button>
        </div>
        <div>
          <ul className='flex flex-col gap-4'>
            <li className='flex items-center gap-4'>
              <TbDashboard className='text-lg' />
              <a href='/dashboard' className='block' style={{ padding: '0' }}>Dashboard</a>
            </li>
            <li className='flex items-center gap-4'>
              <TbUser className='text-lg' />
              <a href='/users' className='block' style={{ padding: '0' }}>Community</a>
            </li>
            <li className='flex items-center gap-4'>
              <TbBook2 className='text-lg' />
              <a href='/lessons' className='block' style={{ padding: '0' }}>Lessons</a>
            </li>
            {
              loggedInUser.is_admin === 'true' ?
                AdminRouteList.map((item, index) => {
                  return (
                    <li key={index} className='flex items-center gap-4'>
                      <item.icon className='text-lg' />
                      <a href={item.url} className='block' style={{ padding: '0' }}>{item.name}</a>
                    </li>
                  )
                })

                :
                <></>
            }
            <li className='flex items-center gap-4'>
              <BsGear className='text-lg' />
              <a href='/settings' className='block' style={{ padding: '0' }}>Settings</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex justify-between items-center px-5 py-4 bottom-container'>
        <div className='user-status flex items-center gap-3'>
          <div className='avatar rounded border-2 border-success'>
            <UserAvatar avatar={avatar} />
          </div>
          <div>
            <h6 className='font-medium'>{loggedInUser.username}</h6>
            <h6 className='text-sm'>{loggedInUser.is_admin === 'true' ? 'Instructor' : 'Student'}</h6>
          </div>
        </div>
        <button style={{ padding: '0' }}>
          <AiOutlinePoweroff className='text-lg font-bold' />
        </button>
      </div>
    </div>
  )
}
