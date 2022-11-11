import React, { useState } from 'react'
import { WordMgmtModal } from '../../components/admin/WordMgmtModal'
import { AdminPanel } from '../../components/AdminPanel'
import apiClient from '../../services/api'

export const WordMgmt = () => {
  const [modalActive, setModalActive] = useState(false)
  const [actionType, setActionType] = useState('new')

  const showModal = (type, id) => {
    setActionType(type)
    setModalActive(true)
  }

  return (
    <div>
      <WordMgmtModal
        isActive={modalActive}
        modalAction={setModalActive}
        actionType={actionType} />
      <div className='flex justify-between items-center'>
        <h4 className='text-lg text-primary font-bold'>Words Management Console</h4>
        <button
          className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-2 px-5'
          onClick={() => showModal('new')}>
          Add Word
        </button>
      </div>
    </div>
  )
}
