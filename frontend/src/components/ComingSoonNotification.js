import React from 'react'

export const ComingSoonNotification = ({ children }) => (
  <div className='relative' style={{ height: '88.75vh' }}>
    <div className='absolute text-center' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h5 className='font-bold text-2xl mb-4'>COMING SOON!</h5>
      {children}
    </div>
  </div>
)
