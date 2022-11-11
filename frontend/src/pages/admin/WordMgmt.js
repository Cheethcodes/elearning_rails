import React, { useMemo, useState } from 'react'
import { FaPenAlt } from 'react-icons/fa'
import { WordMgmtModal } from '../../components/admin/WordMgmtModal'
import { AdminPanel } from '../../components/AdminPanel'
import { Toastify } from '../../components/Toastify'
import apiClient from '../../services/api'

export const WordMgmt = () => {
  const [modalActive, setModalActive] = useState(false)
  const [actionType, setActionType] = useState('new')
  const [update, setUpdate] = useState(true)
  const [words, setWords] = useState([])
  const [currentWord, setCurrentWord] = useState(0)

  const showModal = (type, id) => {
    setActionType(type)
    setModalActive(true)
    setCurrentWord(id)
  }

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: '/api/v1/words'
    }).then(response => {
      setWords(response.data)
    }).catch(error => {
      Toastify('error', error.response.data)
    })

    setUpdate(false)
  }, [update])

  return (
    <div>
      <WordMgmtModal
        isActive={modalActive}
        modalAction={setModalActive}
        actionType={actionType}
        currentWord={currentWord}
        setCurrentWord={setCurrentWord} />
      <div className='flex justify-between items-center'>
        <h4 className='text-lg text-primary font-bold'>Words Management Console</h4>
        <button
          className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-2 px-5'
          onClick={() => showModal('new')}>
          Add Word
        </button>
      </div>
      <AdminPanel tableHeaders={['Word', 'Category', 'Action']}>
        {
          words.length > 0 ?
            words.map((word, index) => {
              return (
                <tr key={index}>
                  <td className={`py-2 px-4${index % 2 === 1 ? ' bg-slate-200' : ''}`}>{word.content}</td>
                  <td className={`py-2 px-4${index % 2 === 1 ? ' bg-slate-200' : ''}`}>{word.category.name}</td>
                  <td className={`py-2 px-4${index % 2 === 1 ? ' bg-slate-200' : ''}`}>
                    <div className='flex items-center gap-1'>
                      <button
                        type='button'
                        className={`py-2 px-3 text-white border hover:bg-transparent bg-success border-success hover:text-success`}
                        onClick={() => showModal('update', word.category.id)}>
                        <FaPenAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan='2'>No words to show</td>
            </tr>
        }
      </AdminPanel>
    </div>
  )
}
