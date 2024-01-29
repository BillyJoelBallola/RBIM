import React, { useContext, useEffect } from 'react'
import { RiMenu2Fill } from "react-icons/ri"
import { NavigationContext } from '../../context/NavigationContext'
import { UserContext } from '../../context/UserContext'
import { useNavigate, Link } from 'react-router-dom'

const Header = ({ pageName }) => {
  const navigate = useNavigate()
  const { loggedUser } = useContext(UserContext)
  const { toggleNav, isNavigateOpen } = useContext(NavigationContext)

  useEffect(() => {
    window.cookieStore.get('rbim_token')
      .then(({ value }) => {
        if(!value) navigate("/login");
      })
      .catch((err) => {
        navigate("/login");
      })
  }, [])

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
        <Link to={"/rbim/settings"} className='flex items-center gap-2 bg-transparent hover:bg-gray-100 px-2 py-1 rounded-lg'>
          <div>
            <span className='hidden md:block text-sm font-semibold'>{loggedUser?.name}</span>
            <span className='hidden md:block text-xs text-right -mt-1'>{loggedUser?.role}</span>
          </div>
          <div className='w-8 grid place-items-center aspect-square rounded-full bg-gray-500 text-white text-lg font-semibold'>{loggedUser?.name?.split('')[0].toUpperCase()}</div>
        </Link>
      </div>
    </header>
  )
}

export default Header