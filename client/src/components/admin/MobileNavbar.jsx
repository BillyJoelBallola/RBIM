import React, { useContext } from 'react'
import RBIMWhiteLogo from '../../assets/RBIM-logo-white.png'
import POPCOMWhiteLogo from '../../assets/popcom-logo-white.png'
import { NavigationContext } from '../../context/NavigationContext'
import { operationLinks, moreLinks } from '../../static/NavLinks'
import { IoCloseSharp } from "react-icons/io5";
import { NavLink } from 'react-router-dom'

const MobileNavbar = () => {
  const { toggleNav, isNavigateOpen } = useContext(NavigationContext)

  return (
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
                <NavLink onClick={toggleNav} to={link.path} className="text-sm flex gap-2 items-center text-white duration-150 bg-transparent py-2 px-6 hover:bg-[#004303]">
                  {link.icon}
                  {link.label}
                </NavLink>
                :
                <button onClick={toggleNav} className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6">
                  {link.icon}
                  {link.label}
                </button>
              }
            </li>
          ))
        }
        <div className='px-4 font-bold text-white mt-8 mb-4'>More</div>
      
          {
            moreLinks?.map((link, idx) => (
              <li key={idx}>
                <button onClick={toggleNav} className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6">
                  {link.icon}
                  {link.label}
                </button>
              </li>
            ))
          }
      </ul>
      <div className='grid place-items-center py-4 absolute bottom-0 w-full'>
        <img src={POPCOMWhiteLogo} alt="rbim-logo" className='w-[150px] aspect-auto'/>
      </div>
    </nav>
  )
}

export default MobileNavbar