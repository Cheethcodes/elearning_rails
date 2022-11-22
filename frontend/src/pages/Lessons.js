import React, { useMemo, useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Toastify } from '../components/Toastify'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

export const Lessons = () => {
  const { loggedInUser } = useAuth()
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: '/api/v1/categories'
    }).then(response => {
      setCategories(response.data)
    }).catch(error => {
      Toastify('error', error.response.data)
    })
  }, [])

  const handleStartLesson = (id) => {
    apiClient({
      method: 'post',
      url: '/api/v1/lessons',
      data: {
        lesson: {
          user_id: loggedInUser.id,
          category_id: id,
          score: 0
        }
      }
    }).then(response => {
      navigate(`/lessons/start/${id}`)
    })
    .catch(error => {
      Toastify('error', error.response.data)
    })
  }

  return (
    <div>
      <h4 className='text-lg text-primary font-bold'>Lessons</h4>
      <hr className='mt-1 mb-4' />
      <div className='mb-4 py-2 px-4 bg-primary text-white rounded'>
        <p>Select from a list of lessons below to begin with.</p>
      </div>
      <div className='grid grid-cols-4 gap-x-5 gap-y-3'>
        {
          categories.map((category, index) => {
            return (
              <div key={index} className='card flex flex-col p-5' onClick={() => handleStartLesson(category.id)}>
                <div>
                  <h5 className='text-md font-medium text-primary'>{category.name}</h5>
                  <hr className='mt-1 mb-4' />
                </div>
                <div className='grow'>
                  <p>{category.description}</p>
                </div>
                <div className='flex justify-end gap-2 items-center mt-4 text-primary text-lg'>
                  <FaArrowCircleRight />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
