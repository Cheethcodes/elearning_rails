import React, { useMemo, useState } from 'react'
import { Toastify } from '../../components/Toastify'
import apiClient from '../../services/api'
import { CategoryMgmtModal } from '../../components/admin/CategoryMgmtModal'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { AdminPanel } from '../../components/AdminPanel'

export const CategoryMgmt = () => {
  const [modalActive, setModalActive] = useState(false)
  const [actionType, setActionType] = useState('new')
  const [update, setUpdate] = useState(true)
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState(0)

  const showModal = (type, id) => {
    setActionType(type)
    setModalActive(true)
    setCurrentCategory(id)
  }

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: '/api/v1/categories'
    }).then(response => {
      setCategories(response.data)
    }).catch(error => {
      Toastify('error', error.response.data)
    })

    setUpdate(false)
  }, [update])

  const handleDelete = (id, name) => {
    if (window.confirm(`Confirm to delete ${name}.`)) {
      apiClient({
        method: 'delete',
        url: `/api/v1/categories/${id}`
      }).then(response => {
        Toastify('success', `Successfully deleted ${name}!`)
        setUpdate(true)
      }).catch(error => {
        Toastify('error', error.response.data)
      })
    }
  }

  return (
    <div>
      <CategoryMgmtModal
        isActive={modalActive}
        modalAction={setModalActive}
        actionType={actionType}
        currentCategory={currentCategory}
        updateDataAction={setUpdate}
        setCurrentCategory={setCurrentCategory} />
      <div className='flex justify-between items-center'>
        <h4 className='text-lg text-primary font-bold'>Categories Management Console</h4>
        <button
          className='bg-primary hover:bg-transparent text-white hover:text-primary border border-primary py-2 px-5'
          onClick={() => showModal('new')}>
          Add Category
        </button>
      </div>
      <AdminPanel tableHeaders={['Title', 'Action']}>
        {
          categories.length > 0 ?
            categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td className={`py-2 px-4${index % 2 === 1 ? ' bg-slate-200' : ''}`}>{category.name}</td>
                  <td className={`py-2 px-4${index % 2 === 1 ? ' bg-slate-200' : ''}`}>
                    <div className='flex items-center gap-1'>
                      <button
                        type='button'
                        className={`py-2 px-3 text-white border hover:bg-transparent bg-success border-success hover:text-success`}
                        onClick={() => showModal('update', category.id)}>
                        <FaPenAlt />
                      </button>
                      <button
                        type='button'
                        className={`py-2 px-3 text-white border hover:bg-transparent bg-danger border-danger hover:text-danger`}
                        onClick={() => handleDelete(category.id, category.name)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
            :
            <tr>
              <td colSpan='2'>No categories to show</td>
            </tr>
        }
      </AdminPanel>
    </div>
  )
}
