import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toastify } from '../components/Toastify'
import { WordPagination } from '../components/WordPagination'
import apiClient from '../services/api'

export const Words = () => {
  const { id } = useParams()
  const [category, setCategory] = useState({
    name: ''
  })
  const [words, setWords] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 1

  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const [currentWord, setCurrentWord] = words.slice(indexOfFirstRecord, indexOfLastRecord)
  const navigate = useNavigate()

  const wordDate = useMemo(() => {
    apiClient({
      method: 'get',
      url: `/api/v1/categories/${id}`
    }).then(response => {
      setCategory(response.data)
    }).catch(error => {
      Toastify('error', error.response.data)
    })
  }, [])

  const wordList = useMemo(() => {
    apiClient({
      method: 'get',
      url: `/api/v1/categories/${id}/show_words`
    }).then(response => {
      setWords(response.data)
    }).catch(error => {
      Toastify('error', error.response.data)
    })
  }, [])

  const changeWord = () => {
    if (currentPage === words.length) {
      navigate(`/categories/${id}/results`)
    }
    else {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h4 className='text-lg text-primary font-bold'>Quiz | {category.name}</h4>
        <div>
          {
            words.length > 0 ?
              <>
                {currentPage} of {words.length}
              </>
              :
              <>...</>
          }
        </div>
      </div>
      <hr className='mt-1 mb-4' />
      {
        words.length > 0 ?
          <WordPagination currentWord={currentWord} changeWord={changeWord} />
          :
          <div className='relative' style={{ height: '88.75vh' }}>
            <div className='absolute text-center' style={{ top: '50%', left : '50%', transform: 'translate(-50%, -50%)' }}>
              <h5 className='font-bold text-2xl mb-4'>COMING SOON!</h5>
              <a className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-3 px-5 block' href='/lessons'>Back to Lessons</a>
            </div>
          </div>
      }
    </div>
  )
}
