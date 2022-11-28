import React, { useMemo, useState } from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ComingSoonNotification } from '../components/ComingSoonNotification'
import { Toastify } from '../components/Toastify'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

export const Lessons = () => {
  const { loggedInUser } = useAuth()
  const [filter, setFilter] = useState(0)
  const [categories, setCategories] = useState([])
  const [filteredCategory, setFilteredCategory] = useState([])
  const navigate = useNavigate()

  const getCategory = useMemo(() => {
    apiClient({
      method: 'get',
      url: `/api/v1/users/${loggedInUser.id}/show_lessons`
    }).then(response => {
      setCategories(response.data)
      setFilteredCategory(response.data)
    }).catch(error => {
      Toastify('error')
    })
  }, [])

  const changeFilter = (filter) => {
    if (filter) {
      let categoryList = categories.filter(category => filter === 'learned' ? category.has_answered === true : category.has_answered === false)
      setFilter(filter === 'learned' ? 1 : 2)
      setFilteredCategory(categoryList)
    }
    else {
      setFilter(0)
      setFilteredCategory(categories)
    }
  }

  const handleStartLesson = (wordsCount, id, name, hasAnswered) => {
    if (wordsCount > 0) {
      if (hasAnswered) {
        navigate(`/lessons/result/${id}`)
        return
      }
      else {
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
        }).catch(error => {
          Toastify('error')
        })
      }
    }
    else {
      Toastify('warning', `Category - ${name} is still unavailable at the moment.`)
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h4 className='text-lg text-primary font-bold'>Lessons</h4>
        <ul className='flex items-center gap-1'>
          <li>
            <button
              className={`${filter === 0 ? 'bg-primary text-white' : 'text-primary'} border border-primary py-2 px-5`}
              onClick={() => changeFilter()}>All
            </button>
          </li>
          <li>
            <button
              className={`${filter === 1 ? 'bg-primary text-white' : 'text-primary'} border border-primary py-2 px-5`}
              onClick={() => changeFilter('learned')}>Learned
            </button>
          </li>
          <li>
            <button
              className={`${filter === 2 ? 'bg-primary text-white' : 'text-primary'} border border-primary py-2 px-5`}
              onClick={() => changeFilter('not learned')}>Not Learned
            </button>
          </li>
        </ul>
      </div>
      <hr className='mt-1 mb-4' />
      <div className='mb-4 py-2 px-4 bg-primary text-white rounded'>
        <p>Select from a list of lessons below to begin with.</p>
      </div>
      {
        categories.length > 0 ?
          <div className='grid grid-cols-4 gap-x-5 gap-y-3'>
            {
              filteredCategory.map((category, index) => {
                return (
                  <div key={index} className='card flex flex-col p-5' onClick={() => handleStartLesson(category.words.length, category.info.id, category.info.name, category.has_answered)}>
                    <div>
                      <h5 className='text-md font-medium text-primary'>{category.info.name}</h5>
                      <hr className='mt-1 mb-4' />
                    </div>
                    <div className='grow'>
                      <p>{category.info.description}</p>
                    </div>
                    <div className='flex justify-end gap-2 items-center mt-4 text-primary text-lg'>
                      {
                        category.has_answered ?
                          <a href={``}>Show Results</a>
                          :
                          <FaArrowCircleRight />
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
          :
          <ComingSoonNotification>
            {
              loggedInUser.is_admin === 'true' ?
                <a className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-2 px-5' href='/category-management'>Add Lesson</a>
                :
                <></>
            }
          </ComingSoonNotification>
      }
    </div>
  )
}
