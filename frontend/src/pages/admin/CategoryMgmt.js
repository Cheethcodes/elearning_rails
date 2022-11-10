import React, { useState } from 'react'
import { CategoryMgmtModal } from './CategoryMgmtModal'

export const CategoryMgmt = () => {
  const [modalActive, setModalActive] = useState(false)
  const [actionType, setActionType] = useState('new')

  const showModal = (type) => {
    setActionType(type)
    setModalActive(true)
  }

  return (
    <div>
      <CategoryMgmtModal isActive={modalActive} modalAction={setModalActive} actionType={actionType} />
      <div className='flex justify-between items-center'>
        <h4 className='text-lg text-primary font-bold'>Category Management Console</h4>
        <button
          className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-2 px-5'
          onClick={() => showModal('new')}>
          Add Category
        </button>
      </div>
      <hr className='mt-1 mb-4' />
      <div className='console-container'>
      </div>
    </div>
  )
}
