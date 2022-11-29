import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Toastify } from '../components/Toastify'
import { GetCategories } from '../constants/Categories'
import apiClient from '../services/api'
import { useAuth } from '../services/AuthProvider'

export const Results = () => {
  const { id } = useParams()
  const { loggedInUser } = useAuth()
  const [lessonInfo, setLessonInfo] = useState(null)
  const [category, setCategory] = useState(null)

  const data = useMemo(() => {
    apiClient({
      method: 'post',
      url: `/api/v1/lessons/show_results`,
      data: {
        lesson: {
          user_id: loggedInUser.id,
          category_id: id
        }
      }
    }).then(response => {
      setLessonInfo(response.data)
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

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h4 className='text-lg text-primary font-bold'>Results | {category && category.name}</h4>
        <a href='/lessons' className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-2 px-5'>Back to Lessons</a>
      </div>
      <hr className='mt-1 mb-4' />
      <div className='grid grid-cols-3' style={{ height: '88.75vh' }}>
        <div className='flex justify-center items-center'>
          {
            lessonInfo !== null ?
              <div className='flex flex-col items-center'>
                <h4 className='text-xl font-bold mb-5'>YOU HAVE COMPLETED THE LESSON!</h4>
                <div className={`flex items-center justify-center rounded-full text-white font-bold text-4xl ${(lessonInfo.score / lessonInfo.total >= 0.5) ? 'bg-success' : 'bg-danger'}`} style={{ height: '200px', width: '200px' }}>
                  {lessonInfo.score} / {lessonInfo.total}
                </div>
              </div>
              :
              <h4 className='text-lg font-bold'>No information for this lesson found</h4>
          }
        </div>
        <div className='col-span-2 border rounded-lg overflow-hidden'>
          <table className='w-full'>
            <tbody>
              <tr>
              <td className='px-3 py-2 font-medium text-medium text-white bg-primary'>Word</td>
                <td className='px-3 py-2 font-medium text-medium text-white bg-primary'>Correct Answer</td>
                <td className='px-3 py-2 font-medium text-medium text-white bg-primary'>Your Answer</td>
                <td className='px-3 py-2 font-medium text-medium text-white bg-primary'></td>
              </tr>
              {
                lessonInfo &&
                lessonInfo.answers.map((answer, index) => {
                  return (
                    <tr key={index}>
                      <td className={`px-3 py-2${index%2 === 1 ? ' bg-slate-300' : ''}`}>{answer.word.content}</td>
                      <td className={`px-3 py-2${index%2 === 1 ? ' bg-slate-300' : ''}`}>{answer.correct_answer.content}</td>
                      <td className={`px-3 py-2${index%2 === 1 ? ' bg-slate-300' : ''}`}>{answer.user_choice.content}</td>
                      <td className={`px-3 py-2${index%2 === 1 ? ' bg-slate-300' : ''} font-medium ${answer.user_choice.correct ? 'text-success' : 'text-danger'}`}>{answer.user_choice.correct ? 'Correct' : 'Incorrect'}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
