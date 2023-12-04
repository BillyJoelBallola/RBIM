import React, { useContext } from 'react'
import { RiMenu2Fill } from "react-icons/ri"
import { NavigationContext } from '../../context/NavigationContext'

const Header = ({ pageName }) => {
  const { toggleNav, isNavigateOpen } = useContext(NavigationContext)
  const username = "Capstone, Project"

  return (
    <header>
      <div className={`border border-x-0 border-t-0 shadow-sm py-4 px-6 bg-white flex items-center justify-between fixed top-0 right-0 left-0 ${!isNavigateOpen && 'md:left-[16rem]'} z-40 duration-150`}>
        <div className='flex items-center gap-2'>
          <button onClick={toggleNav} className='hover:bg-[#008605] hover:text-white duration-150 rounded-full p-1'>
            <RiMenu2Fill className='text-lg'/>
          </button>
          <span className='font-semibold'>
            {pageName}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='hidden md:block text-sm'>{username}</span>
          <div className='w-8 grid place-items-center aspect-square rounded-full bg-gray-500 text-white'>CP</div>
        </div>
      </div>
    </header>
  )
}

export default Header