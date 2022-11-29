import React, { useState } from 'react'
import { SaveAnswer } from '../constants/Answers'
import { Toastify } from './Toastify'

export const WordPagination = ({ lessonId, currentWord, setAnswers }) => {
  const [hansAnswered, setHasAnswered] = useState(false)

  const handleSubmit = (choiceId) => {
    let data = {
      answer: {
        lesson_id: lessonId,
        word_id: currentWord.id,
        choice_id: choiceId
      }
    }

    SaveAnswer('new', data).then(response => {
      setAnswers(currentData => [...currentData, {
        word_id: currentWord.id,
        choice_id: choiceId
      }])
    }).catch(response => {
      Toastify('error')
    })
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
                        <div className={`card p-5 flex items-center justify-center${choice.correct ? ' bg-primary text-white' : ''}`} style={{ minHeight: '150px' }}>
                          <h4>{choice.content}</h4>
                        </div>
                        :
                        <div
                          className='card p-5 flex items-center justify-center hover:bg-success_light' style={{ minHeight: '150px' }}
                          onClick={() => handleSubmit(choice.id)}>
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
