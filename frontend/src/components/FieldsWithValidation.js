import React from 'react'

export const FieldsWithValidation = ({ type, id, placeholder, onChangeAction, value, required, errorMessage, className }) => {
  return (
    <div className='flex flex-col gap-1'>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`w-full py-2 px-5 outline-0 bg-white${className}`}
        onChange={onChangeAction}
        value={value}
        required={required}
        autoComplete='off' />
      <div style={{ height: '10px', lineHeight: '1rem' }}>
        {
          errorMessage &&
          <small className='text-danger text-sm' style={{ lineHeight: '1rem' }}>{placeholder + ' ' + errorMessage}</small>
        }
      </div>
    </div >
  )
}
