import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import RBIMWhiteLogo from '../../assets/RBIM-logo-white.png'
import ClientLogo from '../../assets/client-logo.png'
import { IoMenu } from "react-icons/io5"
import { IoCloseSharp } from "react-icons/io5";
import { NavigationContext } from '../../context/NavigationContext';

const clientLinks = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Events & Programs',
    path: '/events-and-programs'
  },
  {
    name: 'Announcements',
    path: '/announcements'
  },
  {
    name: 'Login',
    path: '/login'
  },
]

const Navbar = () => {
  const { toggleNav, isNavigateOpen } = useContext(NavigationContext)

  return (
    <nav className='fixed z-50 left-0 top-0 right-0 py-4'>
      <div className='side-margin flex items-center justify-between'>
        <Link to={"/"}>
          <img src={ClientLogo} className='w-[200px] aspect-auto' alt="rbim-logo" />
        </Link>
        <button className='block md:hidden p-1 rounded-full hover:bg-[#004303] duration-150' onClick={toggleNav}>
          <IoMenu className='text-white text-2xl'/>
        </button>
        <ul className={`whitespace-nowrap duration-150 absolute ${isNavigateOpen ? 'left-0' : 'left-[1000px]'} right-0 top-0 h-screen p-4 items-center md:left-0 md:p-0 md:h-auto md:relative bg-[#004303] md:bg-transparent flex flex-col md:flex-row gap-4 text-white text-sm`}>
          <div className='flex items-center justify-between mb-8 md:hidden w-full'>
            <Link to={"/"}>
              <img src={ClientLogo} className='w-[190px] aspect-auto' alt="rbim-logo" />
            </Link>
            <button onClick={toggleNav}>
              <IoCloseSharp className='text-white text-2xl'/>
            </button>
          </div>
          {
            clientLinks?.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} onClick={toggleNav}>{link.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar