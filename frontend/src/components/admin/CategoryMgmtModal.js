import React, { useMemo, useState } from 'react'
import { FieldsWithValidation } from '../FieldsWithValidation'
import { Toastify } from '../Toastify'
import apiClient from '../../services/api'
import { PopupModal } from '../PopupModal'
import { GetCategories } from '../../constants/Categories'

export const CategoryMgmtModal = ({ isActive, modalAction, actionType, currentCategory, setCurrentCategory, updateDataAction }) => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
  })

  const data = useMemo(() => {
    if (actionType === 'update' && currentCategory !== 0) {
      GetCategories(currentCategory).then(response => {
        setCategory({
          name: response.name,
          description: (response.description && response.description) || ''
        })
      }).catch(response => {
        Toastify('error')
      })
    }
  }, [currentCategory])

  const handleOnChange = (e) => {
    setCategory({
      ...category,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (window.confirm('Confirm to save category!')) {
      apiClient({
        method: actionType === 'update' ? 'patch' : 'post',
        url: actionType === 'update' ? `/api/v1/categories/${currentCategory}` : '/api/v1/categories',
        data: {
          category: category
        }
      }).then(resposne => {
        Toastify('success', `Successfully ${actionType === 'update' ? 'updated' : 'added'} ${category.name}!`)
        updateDataAction(true)
        resetModal()
      }).catch(error => {
        Toastify('error')
      })
    }
  }

  const resetModal = () => {
    setCategory({
      name: '',
      description: '',
    })

    setCurrentCategory(0)
    modalAction(false)
  }

  return (
    <PopupModal
      isActive={isActive}
      title={actionType === 'update' ? category.name : 'New Lesson'}
      closeAction={resetModal}>
      <form onSubmit={handleSubmit} className='flex flex-col grow'>
        <div className='flex flex-col gap-4 grow'>
          <FieldsWithValidation
            type='text'
            id='name'
            placeholder='Title'
            className=' border border-slate-300'
            onChangeAction={handleOnChange}
            value={category.name}
            required={true} />
          <textarea id='description' onChange={handleOnChange} value={category.description} placeholder='Description' className='w-full py-2 px-5 outline-0 bg-white border border-slate-300' />
        </div>
        <div className='mt-4 flex justify-end'>
          <button
            type='submit'
            className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-3 px-5'
            style={{ width: '180px' }}>
            {`${actionType === 'update' ? 'Update Lesson' : 'Save Lesson'}`}
          </button>
        </div>
      </form>
    </PopupModal>
  )
}
