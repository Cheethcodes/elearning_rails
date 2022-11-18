import React, { useEffect, useState } from 'react'
import { useAuth } from '../services/AuthProvider'

export const WordPagination = ({ currentWord, changeWord }) => {
  const { loggedInUser } = useAuth()
  const [hansAnswered, setHasAnswered] = useState(false)
  const [answer, setAnswer] = useState(null)

  useEffect(() => {

  }, [currentWord])

  const handleAnswerChange = () => {
    changeWord()
  }

  return (
    <>
      {
        currentWord &&
        <div>
          <h5 className='font-bold text-lg mb-5 text-center'>{currentWord.content}</h5>
          <div className='grid grid-cols-2 gap-6'>
            {
              currentWord.choices.map((choice, index) => {
                return (
                  <React.Fragment key={index}>
                    {
                      hansAnswered ?
                        <div
                          className={`card p-5 flex items-center justify-center${choice.correct ? ' bg-primary text-white' : ''}`} style={{ minHeight: '150px' }}>
                          <h4>{choice.content}</h4>
                        </div>
                        :
                        <div
                          className='card p-5 flex items-center justify-center hover:bg-success_light' style={{ minHeight: '150px' }}
                          onClick={() => handleAnswerChange()}>
                          <h4>{choice.content}</h4>
                        </div>
                    }
                  </React.Fragment>
                )
              })
            }
          </div>
        </div>
      }
    </>
  )
}
