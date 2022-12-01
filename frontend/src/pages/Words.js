import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ComingSoonNotification } from '../components/ComingSoonNotification'
import { Toastify } from '../components/Toastify'
import { WordPagination } from '../components/WordPagination'
import { GetCategories } from '../constants/Categories'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

export const Words = () => {
  const { loggedInUser } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState({
    name: ''
  })
  const [words, setWords] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 1
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const [currentWord, setCurrentWord] = words.slice(indexOfFirstRecord, indexOfLastRecord)
  const [answers, setAnswers] = useState([])
  const [lessonId, setLessonId] = useState(0)

  const lessonData = useMemo(() => {
    apiClient({
      method: 'post',
      url: `/api/v1/lessons/show_lesson_info`,
      data: {
        lesson: {
          user_id: loggedInUser.id,
          category_id: id
        }
      }
    }).then(response => {
      setLessonId(response.data.id)
    }).catch(error => {
      Toastify('error')
    })
  }, [])

  const getCategory = useMemo(() => {
    GetCategories(id).then(response => {
      setCategory(response)
    }).catch(response => {
      Toastify('error')
    })
  }, [])

  const wordList = useMemo(() => {
    apiClient({
      method: 'get',
      url: `/api/v1/categories/${id}/show_words`
    }).then(response => {
      setWords(response.data)
    }).catch(error => {
      Toastify('error')
    })
  }, [])

  const changeWord = () => {
    if (currentPage === words.length) {
      navigate(`/lessons/result/${id}`)
    }
    else {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if (answers.length > 0) {
      changeWord()
    }
  }, [answers])

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h4 className='text-lg text-primary font-bold'>Quiz | {category.name}</h4>
        <div>{words.length > 0 ? `${currentPage} of ${words.length}` : '...'}</div>
      </div>
      <hr className='mt-1 mb-4' />
      {
        words.length > 0 ?
          <WordPagination
            userId={loggedInUser.id}
            lessonId={lessonId}
            currentWord={currentWord}
            setAnswers={setAnswers}
            lastIndex={words[words.length - 1]} />
          :
          <ComingSoonNotification>
            <div className='grid grid-cols-2 gap-1'>
              <a className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-3 px-5 block' href='/lessons'>Back to Lessons</a>
              {
                loggedInUser.is_admin === 'true' ?
                  <a className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-2 px-5 flex items-center justify-center' href='/word-management'>Add Word</a>
                  :
                  <></>
              }
            </div>
          </ComingSoonNotification>
      }
    </div>
  )
}
