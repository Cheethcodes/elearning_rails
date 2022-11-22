import React, { useMemo, useState } from 'react'
import { GetCategories } from '../constants/Categories'
import { Toastify } from './Toastify'

export const CategoriesDropdown = ({id, action, currentValue}) => {
  const [categories, setCategories] = useState([])

  const getCategory = useMemo(() => {
    GetCategories().then(response => {
      setCategories(response)
    }).catch(response => {
      Toastify('error', response.response.status + ' ' + response.response.statusText)
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
