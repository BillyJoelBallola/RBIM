import React from 'react'

const PageHeader = ({ title }) => {
  return (
    <div className='fixed left-0 right-0 top-0 h-[80px] drop-shadow-sm'>
      <div className='h-full w-full grid place-items-center page-header'>
        {/* <h1 className='text-white absolute bottom-14 text-2xl md:text-4xl font-serif'>{title}</h1> */}
      </div>
      <div className='bg-white border border-x-0 border-t-0'>
        <h1 className='font-semibold side-margin text-lg md:text-xl py-2 font-serif'>{title}</h1>
      </div>
    </div>
  )
}

export default PageHeader