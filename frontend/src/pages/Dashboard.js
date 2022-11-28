import React, { useMemo, useState } from 'react'
import { Toastify } from '../components/Toastify'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'
import { HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineHeart, HiOutlineShare } from 'react-icons/hi2'
import UserAvatar from '../components/UserAvatar'
import { useNavigate } from 'react-router-dom'
import { GetFollowActivityCount } from '../constants/FollowActivity'
import { GetProfile } from '../constants/Profile'

export const Dashboard = () => {
  const { loggedInUser } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [counter, setCounter] = useState({
    followers: 0,
    following: 0,
  })
  const [activities, setActivities] = useState([])

  const dataProfile = useMemo(() => {
    GetProfile(loggedInUser.id).then(response => {
      setProfile(response)
    }).catch(() => {
      Toastify('error')
    })
  }, [])

  const dataCounter = useMemo(() => {
    GetFollowActivityCount(loggedInUser.id).then(response => {
      setCounter(response)
    }).catch(() => {
      Toastify('error')
    })
  }, [])

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: `/api/v1/activities/`
    }).then(response => {
      setActivities(response.data)
    }).catch(error => {
      Toastify('error')
    })
  }, [])

  return (
    <div id='dashbpard'>
      <h4 className='text-lg text-primary font-bold'>Dashboard</h4>
      <hr className='mt-1 mb-4' />
      <div className='flex gap-12'>
        <div id='single-user' className='p-10 bg-white rounded'>
          {
            profile &&
            <div className='pub-profile flex flex-col gap-3'>
              <div>
                <div className='border-2 border-success'>
                  <UserAvatar avatar={profile.avatar.url} className=' avatar' />
                </div>
                <div className='text-center font-medium text-primary'>
                  {profile.username}
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='flex flex-col text-center'>
                  <div className='font-bold'>{counter.followers}</div>
                  <div className='text-sm'>Follower(s)</div>
                </div>
                <div className='flex flex-col text-center'>
                  <div className='font-bold'>{counter.following}</div>
                  <div className='text-sm'>Following</div>
                </div>
              </div>
            </div>
          }
        </div>
        <div className='grow' style={{ maxHeight: '88.75vh' }}>
          <div className='grid gap-5'>
            {
              activities.map((activity, index) => {
                return (
                  <div key={index} className='card pt-3 no-scale overflow-hidden' style={{ cursor: 'default' }}>
                    <div className='flex gap-5 px-5'>
                      <div>
                        <UserAvatar avatar={activity.info.user.avatar.url} className=' feed-avatar rounded-full' />
                      </div>
                      <div className='grow'>
                        <div className='flex flex-col'>
                          {
                            activity.info.user.id.toString() === loggedInUser.id.toString() ?
                              <h3 className='text-md font-medium mb-2'>You</h3> :
                              <h3 className='text-md font-medium mb-2 cursor-pointer' onClick={() => { navigate(`/users/${activity.info.user.id}`) }}>{activity.info.user.username}</h3>
                          }
                          {
                            activity.type === 'lesson' ?
                              <p>Learned <a href={`/lessons/`} className='text-primary font-medium'>{activity.info.category.name}</a> and scored {activity.info.lesson.score} points.</p>
                              :
                              activity.type === 'follow' ?
                                <p>Followed <a href={`/users/${activity.info.followed.id}`} className='text-primary font-medium'>{activity.info.followed.username}</a></p>
                                : ''
                          }
                        </div>

                      </div>
                    </div>
                    <div className='mt-3 flex justify-between'>
                      <div className='text-center grow py-2'>
                        <button className='text-primary text-lg hover:scale-110'>
                          <HiOutlineChatBubbleOvalLeftEllipsis />
                        </button>
                      </div>
                      <div className='text-center grow py-2'>
                        <button className='text-primary text-lg hover:scale-110'>
                          <HiOutlineHeart />
                        </button>
                      </div>
                      <div className='text-center grow py-2'>
                        <button className='text-primary text-lg hover:scale-110'>
                          <HiOutlineShare />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
