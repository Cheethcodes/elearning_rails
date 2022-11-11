import React, { useMemo, useState } from 'react'
import apiClient from '../services/api'
import { Toastify } from './Toastify'

export const CategoriesDropdown = ({id, list, action, currentValue}) => {
  const [categories, setCategories] = useState([])

  const data = useMemo(() => {
    apiClient({
      method: 'get',
      url: '/api/v1/categories'
    }).then(response => {
      setCategories(response.data)
    }).catch(error => {
      Toastify('error', error.response.data)
    })
  }, [])

  return (
    <select id={id} onChange={action} value={currentValue} className='border border-slate-300'>
      <option value='0' disabled={true}>---</option>
      {
        categories.map((category, index) => {
          return (
            <option key={index} value={category.id}>{category.name}</option>
          )
        })
      }
    </select>
  )
}
