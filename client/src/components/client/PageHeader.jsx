import React from 'react'

const PageHeader = ({ title }) => {
  return (
    <div className='fixed left-0 right-0 top-0 h-[80px] drop-shadow-sm z-40'>
      <div className='h-full w-full grid place-items-center page-header' />
      <div className='bg-white border border-x-0 border-t-0'>
        <h1 className='font-semibold side-margin text-lg md:text-xl py-2 font-serif'>{title}</h1>
      </div>
    </div>
  )
}

export default PageHeader