import React, { useMemo, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { FieldsWithValidation } from './FieldsWithValidation'
import { Toastify } from './Toastify'
import apiClient from '../services/api'

export const CategoryMgmtModal = ({ isActive, modalAction, actionType, currentCategory, setCurrentCategory, updateDataAction }) => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    name: null,
    description: null
  })

  const data = useMemo(() => {
    if (actionType === 'update' && currentCategory !== 0) {
      apiClient({
        method: 'get',
        url: `/api/v1/categories/${currentCategory}`,
      }).then(resposne => {
        setCategory({
          name: resposne.data.name,
          description: (resposne.data.description && resposne.data.description) || ''
        })
      }).catch(error => {
        Toastify('error', error.resposne.data)
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
        Toastify('error', error.resposne.data)
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
    <div className={`modal ${isActive ? 'block' : 'hidden'}`}>
      <div className='form px-10 py-6 bg-white absolute rounded-lg flex flex-col'>
        <div className='flex justify-between'>
          <h4 className='text-md text-primary font-bold'>{actionType === 'update' ? category.name : 'New Category'}</h4>
          <button className='close-icon text-lg text-danger' onClick={() => resetModal()}><FaTimes className='font-bold' /></button>
        </div>
        <hr className='mt-1 mb-4' />
        <form onSubmit={handleSubmit} className='flex flex-col grow'>
          <div className='flex flex-col gap-4 grow'>
            <FieldsWithValidation
              type='text'
              id='name'
              placeholder='Title'
              className=' border border-slate-300'
              onChangeAction={handleOnChange}
              value={category.name}
              required={true}
              errorMessage={errorMessage.name} />
            <textarea id='description' onChange={handleOnChange} value={category.description} placeholder='Description' className='w-full py-2 px-5 outline-0 bg-white border border-slate-300' />
          </div>
          <div className='mt-4 flex justify-end'>
            <input
              type='submit'
              className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-3 px-5'
              style={{ width: '180px' }}
              value={`${actionType === 'update' ? 'Update Category' : 'Save Category'}`} />
          </div>
        </form>
      </div>
    </div>
  )
}
