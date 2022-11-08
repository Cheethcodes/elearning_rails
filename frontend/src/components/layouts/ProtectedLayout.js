import React from 'react'
import { Sidebar } from '../Sidebar'

export const ProtectedLayout = ({ children }) => {
  return (
    <div className='relative flex'>
      <Sidebar />
      <div className='px-10 py-4 grow'>
        {children}
      </div>
    </div>
  )
}
