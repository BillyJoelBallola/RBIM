import React, { useContext, useState } from 'react'
import RBIMWhiteLogo from '../../assets/RBIM-logo-white.png'
import POPCOMWhiteLogo from '../../assets/popcom-logo-white.png'
import { NavigationContext } from '../../context/NavigationContext'
import { operationLinks } from '../../static/NavLinks'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { IoCloseSharp } from "react-icons/io5";
import CustomDialog from './CustomDialog'

const MobileNavbar = () => {
  const navigate = useNavigate()
  const { toggleNav, isNavigateOpen } = useContext(NavigationContext)
  const { setLoggedUser, setToken } = useContext(UserContext)

  const logout = () => {
    window.localStorage.removeItem('rbim_token')
    setToken(null)
    setLoggedUser(null)
    navigate("/login")
  }

  return (
    <>
      <nav className={`block md:hidden fixed navbar top-0 bottom-0 z-50 ${isNavigateOpen ? 'right-0 left-0' : '-left-[1000px]'} duration-150 drop-shadow-2xl`}>
        <div className='p-4 flex items-center justify-between'>
          <img src={RBIMWhiteLogo} alt="rbim-logo" className='w-[190px] aspect-auto'/>
          <button onClick={toggleNav}><IoCloseSharp className='text-white text-2xl'/></button>
        </div>
        <ul className=''>
          <div className='px-4 font-bold text-white mt-6 mb-4'>Operations</div>
          {
            operationLinks?.map((link, idx) => (
              <li key={idx}>
                {
                  link.path ?
                  <button
                    className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleNav()
                      navigate(link.path)
                    }}
                  >
                    {link.icon}
                    {link.label}
                  </button> :
                  <>
                    <div className='mx-auto my-4 w-[85%] h-[1.5px] bg-white/10' />
                    <button
                      className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6"
                      onClick={() => logout()}
                    >
                      {link.icon}
                      {link.label}
                    </button>
                  </>
                }
              </li>
            ))
          }
        </ul>
        <div className='grid place-items-center py-4 absolute bottom-0 w-full'>
          <img src={POPCOMWhiteLogo} alt="rbim-logo" className='w-[150px] aspect-auto'/>
        </div>
      </nav>
    </>
  )
}

export default MobileNavbar