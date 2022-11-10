import React from 'react'

export const AdminPanel = ({ children, tableHeaders }) => (
  <>
    <hr className='mt-1 mb-4' />
    <div className='console-container'>
      <div className='table-container overflow-x-scroll' style={{ maxHeight: '88.75vh' }}>
        <table className='w-full'>
          <tbody>
            <tr className='sticky top-0'>
              {
                tableHeaders.map((item, index) => {
                  return (
                    <td key={index} className='font-medium py-2 px-4 bg-primary text-white'>{item}</td>
                  )
                })
              }
            </tr>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  </>
)
