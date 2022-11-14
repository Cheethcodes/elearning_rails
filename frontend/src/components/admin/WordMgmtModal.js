import React, { useMemo, useState } from 'react'
import apiClient from '../../services/api'
import { CategoriesDropdown } from '../CategoriesDropdown'
import { FieldsWithValidation } from '../FieldsWithValidation'
import { PopupModal } from '../PopupModal'
import { Toastify } from '../Toastify'

export const WordMgmtModal = ({ isActive, modalAction, actionType, currentWord, setCurrentWord, updateDataAction }) => {
  const [word, setWord] = useState({
    content: '',
    category_id: 0,
  })
  const [errorMessage, setErrorMessage] = useState({
    content: null,
  })
  const [choices, setChoices] = useState({
    choice_1: {
      content: '',
      correct: false
    },
    choice_2: {
      content: '',
      correct: false
    },
    choice_3: {
      content: '',
      correct: false
    },
    choice_4: {
      content: '',
      correct: false
    },
  })

  const data = useMemo(() => {
    if (actionType === 'update' && currentWord !== 0) {
      apiClient({
        method: 'get',
        url: `/api/v1/words/${currentWord}`,
      }).then(response => {
        setWord(response.data)
      }).catch(error => {
        Toastify('error', error.resposne.data)
      })
    }
  }, [currentWord])

  const handleOnChange = (e) => {
    setWord({
      ...word,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (window.confirm('Confirm to save word!')) {
      if (word.category_id === 0) {
        Toastify('error', 'Please select a category!')
        return
      }

      apiClient({
        method: actionType === 'update' ? 'patch' : 'post',
        url: actionType === 'update' ? `/api/v1/words/${currentWord}` : '/api/v1/words',
        data: {
          word: {
            content: word.content,
            category_id: word.category_id,
            choices: JSON.stringify([choices.choice_1, choices.choice_2, choices.choice_3, choices.choice_4])
          }
        }
      }).then(resposne => {
        console.log(resposne.data)
        Toastify('success', `Successfully ${actionType === 'update' ? 'updated' : 'added'} ${word.content}!`)
        updateDataAction(true)
        resetModal()
      }).catch(error => {
        Toastify('error', error.response.data)
      })
    }
  }

  const handleAnswerContent = (e, type) => {
    if (type === 'correct') {
      const newState = {
        choice_1: {
          content: type === 'content' && e.target.getAttribute('data-target') === 'choice_1' ? e.target.value : choices.choice_1.content,
          correct: type === 'correct' && e.target.getAttribute('data-target') === 'choice_1' ? true : false,
        },
        choice_2: {
          content: type === 'content' && e.target.getAttribute('data-target') === 'choice_2' ? e.target.value : choices.choice_2.content,
          correct: type === 'correct' && e.target.getAttribute('data-target') === 'choice_2' ? true : false,
        },
        choice_3: {
          content: type === 'content' && e.target.getAttribute('data-target') === 'choice_3' ? e.target.value : choices.choice_3.content,
          correct: type === 'correct' && e.target.getAttribute('data-target') === 'choice_3' ? true : false,
        },
        choice_4: {
          content: type === 'content' && e.target.getAttribute('data-target') === 'choice_4' ? e.target.value : choices.choice_4.content,
          correct: type === 'correct' && e.target.getAttribute('data-target') === 'choice_4' ? true : false,
        },
      }

      setChoices(newState)
      return
    }

    setChoices({
      ...choices,
      [e.target.getAttribute('data-target')]: {
        ...choices[e.target.getAttribute('data-target')],
        [type]: type === 'correct' ? e.target.checked : e.target.value
      }
    })
  }

  const resetModal = () => {
    setWord({
      content: '',
      category_id: 0,
    })

    setChoices({
      choice_1: {
        content: '',
        correct: false
      },
      choice_2: {
        content: '',
        correct: false
      },
      choice_3: {
        content: '',
        correct: false
      },
      choice_4: {
        content: '',
        correct: false
      },
    })

    setCurrentWord(0)
    modalAction(false)
  }
  return (
    <PopupModal
      isActive={isActive}
      title={actionType === 'update' ? word.content : 'New Category'}
      closeAction={resetModal}>
      <form onSubmit={handleSubmit} className='flex flex-col grow'>
        <div className='flex flex-col gap-4 grow'>
          <FieldsWithValidation
            type='text'
            id='content'
            placeholder='Word'
            className=' border border-slate-300'
            onChangeAction={handleOnChange}
            value={word.content}
            required={true}
            errorMessage={errorMessage.content} />
          <CategoriesDropdown
            id='category_id'
            action={handleOnChange}
            currentValue={word.category_id} />
          <div className='border border-slate p-2'>
            <table>
              <tbody>
                <tr>
                  <td className='p-1'>Choices</td>
                  <td className='p-1 pl-2'>Set as correct answer</td>
                </tr>
                <tr>
                  <td className='p-1'>
                    <input type='text' data-target='choice_1' placeholder='Choice 1' className='border border-slate-300' onChange={(e) => handleAnswerContent(e, 'content')} value={choices.choice_1.content} required={true} />
                  </td>
                  <td className='p-1 pl-2'>
                    <div className='flex'>
                      <input type='checkbox' data-target='choice_1' onChange={(e) => handleAnswerContent(e, 'correct')} checked={choices.choice_1.correct} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='p-1'>
                    <input type='text' data-target='choice_2' placeholder='Choice 2' className='border border-slate-300' onChange={(e) => handleAnswerContent(e, 'content')} value={choices.choice_2.content} required={true} />
                  </td>
                  <td className='p-1 pl-2'>
                    <div className='flex'>
                      <input type='checkbox' data-target='choice_2' onChange={(e) => handleAnswerContent(e, 'correct')} checked={choices.choice_2.correct} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='p-1'>
                    <input type='text' data-target='choice_3' placeholder='Choice 3' className='border border-slate-300' onChange={(e) => handleAnswerContent(e, 'content')} value={choices.choice_3.content} required={true} />
                  </td>
                  <td className='p-1 pl-2'>
                    <div className='flex'>
                      <input type='checkbox' data-target='choice_3' onChange={(e) => handleAnswerContent(e, 'correct')} checked={choices.choice_3.correct} />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='p-1'>
                    <input type='text' data-target='choice_4' placeholder='Choice 4' className='border border-slate-300' onChange={(e) => handleAnswerContent(e, 'content')} value={choices.choice_4.content} required={true} />
                  </td>
                  <td className='p-1 pl-2'>
                    <div className='flex'>
                      <input type='checkbox' data-target='choice_4' onChange={(e) => handleAnswerContent(e, 'correct')} checked={choices.choice_4.correct} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='mt-4 flex justify-end'>
          <button
            type='submit'
            className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-3 px-5'
            style={{ width: '180px' }}>
            {`${actionType === 'update' ? 'Update Word' : 'Save Word'}`}
          </button>
        </div>
      </form>
    </PopupModal>
  )
}
