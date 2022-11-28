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
  const [choices, setChoices] = useState({
    choice_1: {
      id: null,
      content: '',
      correct: false,
    },
    choice_2: {
      id: null,
      content: '',
      correct: false,
    },
    choice_3: {
      id: null,
      content: '',
      correct: false,
    },
    choice_4: {
      id: null,
      content: '',
      correct: false,
    },
  })

  const data = useMemo(() => {
    if (actionType === 'update' && currentWord !== 0) {
      apiClient({
        method: 'get',
        url: `/api/v1/words/${currentWord}`,
      }).then(response => {
        setWord(response.data)
        setChoices({
          choice_1: {
            id: response.data.choices[0].id,
            content: response.data.choices[0].content,
            correct: response.data.choices[0].correct,
          },
          choice_2: {
            id: response.data.choices[1].id,
            content: response.data.choices[1].content,
            correct: response.data.choices[1].correct,
          },
          choice_3: {
            id: response.data.choices[2].id,
            content: response.data.choices[2].content,
            correct: response.data.choices[2].correct,
          },
          choice_4: {
            id: response.data.choices[3].id,
            content: response.data.choices[3].content,
            correct: response.data.choices[3].correct,
          },
        })
      }).catch(error => {
        Toastify('error')
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
        Toastify('error')
        return
      }

      apiClient({
        method: actionType === 'update' ? 'patch' : 'post',
        url: actionType === 'update' ? `/api/v1/words/${currentWord}` : '/api/v1/words',
        data: {
          word: {
            content: word.content,
            category_id: word.category_id,
            choices_attributes: [choices.choice_1, choices.choice_2, choices.choice_3, choices.choice_4]
          }
        }
      }).then(resposne => {
        Toastify('success', `Successfully ${actionType === 'update' ? 'updated' : 'added'} ${word.content}!`)
        updateDataAction(true)
        resetModal()
      }).catch(error => {
        Toastify('error')
      })
    }
  }

  const handleChoiceChange = (e) => {
    setChoices({
      ...choices,
      [e.target.getAttribute('data-target')]: {
        ...choices[e.target.getAttribute('data-target')],
        content: e.target.value
      }
    })
  }

  const handleCorrectChoiceChnage = (e) => {
    const newState = {
      choice_1: {
        id: choices.choice_1.id,
        content: choices.choice_1.content,
        correct: e.target.getAttribute('data-target') === 'choice_1' ? true : false,
      },
      choice_2: {
        id: choices.choice_2.id,
        content: choices.choice_2.content,
        correct: e.target.getAttribute('data-target') === 'choice_2' ? true : false,
      },
      choice_3: {
        id: choices.choice_3.id,
        content: choices.choice_3.content,
        correct: e.target.getAttribute('data-target') === 'choice_3' ? true : false,
      },
      choice_4: {
        id: choices.choice_4.id,
        content: choices.choice_4.content,
        correct: e.target.getAttribute('data-target') === 'choice_4' ? true : false,
      },
    }

    setChoices(newState)
  }

  const resetModal = () => {
    setWord({
      content: '',
      category_id: 0,
    })

    setChoices({
      choice_1: {
        id: null,
        content: '',
        correct: false,
      },
      choice_2: {
        id: null,
        content: '',
        correct: false,
      },
      choice_3: {
        id: null,
        content: '',
        correct: false,
      },
      choice_4: {
        id: null,
        content: '',
        correct: false,
      },
    })

    setCurrentWord(0)
    modalAction(false)
  }

  return (
    <PopupModal
      isActive={isActive}
      title={actionType === 'update' ? word.content : 'New Word'}
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
            required={true} />
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
                {
                  Object.keys(choices).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <input type='text' data-target={`choice_${index + 1}`} placeholder={`Choice ${index + 1}`} className='border border-slate-300' onChange={handleChoiceChange} value={choices[item].content} required={true} />
                        </td>
                        <td className='p-1 pl-2'>
                          <div className='flex'>
                            <input type='checkbox' data-target={`choice_${index + 1}`} onChange={handleCorrectChoiceChnage} checked={choices[item].correct} />
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
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
