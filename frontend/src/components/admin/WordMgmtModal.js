import React, { useMemo, useState } from 'react'
import apiClient from '../../services/api'
import { CategoriesDropdown } from '../CategoriesDropdown'
import { FieldsWithValidation } from '../FieldsWithValidation'
import { PopupModal } from '../PopupModal'
import { Toastify } from '../Toastify'

export const WordMgmtModal = ({ isActive, modalAction, actionType, currentWord, setCurrentWord}) => {
  const [word, setWord] = useState({
    content: '',
    category_id: 0,
  })
  const [errorMessage, setErrorMessage] = useState({
    content: null,
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

    if (window.confirm('Confirm to save category!')) {
      if (word.category_id === 0) {
        Toastify('error', 'Please select a category!')
        return
      }

      apiClient({
        method: 'post',
        url: '/api/v1/words',
        data: {
          word: word
        }
      }).then(resposne => {
        Toastify('success', `Successfully added ${word.content}!`)
        resetModal()
      }).catch(error => {
        Toastify('error', error.resposne.data)
      })
    }
  }

  const resetModal = () => {
    setWord({
      content: '',
      category_id: 0,
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
