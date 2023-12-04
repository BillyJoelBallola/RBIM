import React from 'react'
import Header from '../../components/admin/Header'

const Dashboard = () => {
  return (
    <>
      <Header pageName={'Dashboard'} />
      <div className='content'>
        <div className='grid md:grid-cols-3 gap-4 h-[200px]'>
          <div className='bg-gray-200 rounded-lg'></div>
          <div className='bg-gray-200 rounded-lg'></div>
          <div className='bg-gray-200 rounded-lg'></div>
        </div>
      </div>
    </>
  )
}

export default Dashboard