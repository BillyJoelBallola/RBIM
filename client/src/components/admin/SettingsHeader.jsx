import React from 'react'

const SettingsHeader = ({ title, description }) => {
  return (
    <div className='grid gap-1 mb-6'>
      <h3 className='text-2xl font-semibold'>{title}</h3>
      <p className='text-gray-500'>{description}</p>
    </div>
  )
}

export default SettingsHeader