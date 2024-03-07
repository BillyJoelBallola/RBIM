import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ClientLogoBlack from '../../assets/client-logo-black.png'
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed z-50 left-0 top-0 right-0 py-4 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className='side-margin flex items-center justify-between'>
        <Link to={"/"}>
          <img src={ClientLogoBlack} className='w-[200px] aspect-auto' alt="rbim-logo" />
        </Link>
        <button className='block md:hidden p-1 rounded-full hover:bg-[#004303] duration-150' onClick={toggleNav}>
          <IoMenu className='text-black text-2xl'/>
        </button>
        <ul className={`whitespace-nowrap duration-150 absolute ${isNavigateOpen ? 'left-0' : 'left-[1000px]'} right-0 top-0 h-screen p-4 items-center md:left-0 md:p-0 md:h-auto md:relative mobile-nav flex flex-col md:flex-row gap-4 text-white text-sm`}>
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
              <li key={idx} className='text-white md:text-black font-semibold'>
                {
                  link.name !== 'Login' 
                  ? <Link to={link.path} onClick={toggleNav}>{link.name}</Link>
                  : <Link className='md:hover:bg-[#008605]/60 md:duration-150 md:py-1 md:px-3 md:bg-[#008605] text-white rounded-lg' to={link.path} onClick={() => {}}>{link.name}</Link>
                }
              </li>
          ))
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar