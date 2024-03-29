import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import RBIMWhiteLogo from '../../assets/RBIM-logo-white.png'
import POPCOMGoldLogo from '../../assets/popcom-logo-gold.png'

const Footer = () => {
  const currentYear = new Date()

  return (
    <footer className='footer h-[450px] md:h-[250px] py-8 text-black shadow-[0px_40px_40px_rgba(0, 0, 0, 1.5)] relative'>
      <div className='absolute top-10 bottom-10 left-0 right-0 z-20'>
        <ul className='side-margin flex flex-col text-center md:text-left gap-6 md:flex-row justify-around text-sm text-white'>
          <li className='grid gap-2 font-semibold'>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
          </li>
          <li className='grid gap-2 font-semibold'>
            <Link to={"/events-and-programs"}>Events and Programs</Link>
            <Link to={"/announcements"}>Announcement</Link>
          </li>
          <li className='grid gap-2 place-items-center'>
            <div className='flex items-center gap-2'>
              <Link to={"https://www.facebook.com/profile.php?id=61556714338484"} target='_blank'><FaFacebook className='text-lg'/></Link>
              <Link to={"mailto:capstoneprojectbw05@gmail.com"}><IoIosMail className='text-2xl'/></Link>
            </div>
            <span>Stay Connected</span>
          </li>
        </ul>
        <hr className='side-margin my-6'/>
        <div className="side-margin flex flex-col items-center gap-4 md:flex-row justify-around">
          <img src={RBIMWhiteLogo} className="w-[180px] aspect-auto" alt="rbim-logo" />
          <img src={POPCOMGoldLogo} className="w-[150px] aspect-auto" alt="popcom-logo" />
        </div>
        <div className='side-margin text-center mt-6'>
          <span className='text-white text-xs'>Copyright © {currentYear.getFullYear()} • Municipal of Magdalena</span>
        </div>
      </div>
      <div className='footer-bg-color absolute inset-0 z-10'/>
    </footer> 
  )
}

export default Footer