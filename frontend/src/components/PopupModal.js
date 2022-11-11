import React from 'react'
import { FaTimes } from 'react-icons/fa'

export const PopupModal = ({ isActive, title, children, closeAction }) => {
  return (
    <div className={`modal ${isActive ? 'block' : 'hidden'}`}>
      <div className='form px-10 py-6 bg-white absolute rounded-lg flex flex-col'>
        <div className='flex justify-between'>
          <h4 className='text-md text-primary font-bold'>{title}</h4>
          <button className='close-icon text-lg text-danger' onClick={closeAction}><FaTimes className='font-bold' /></button>
        </div>
        <hr className='mt-1 mb-4' />
        {children}
      </div>
    </div>
  )
}
