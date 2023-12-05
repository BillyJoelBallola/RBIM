import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import RBIMWhiteLogo from '../../assets/RBIM-logo-black.png'
import POPCOMGoldLogo from '../../assets/popcom-logo-gold.png'

const Footer = () => {
  return (
    <footer className='py-8 bg-white text-black shadow-[0px_40px_40px_rgba(0, 0, 0, 1.5)] border border-x-0 border-y-0'>
      <ul className='side-margin flex flex-col text-center md:text-left gap-6 md:flex-row justify-around text-sm text-gray-600'>
        <li className='grid gap-2 font-semibold'>
          <Link>Home</Link>
          <Link>About</Link>
        </li>
        <li className='grid gap-2 font-semibold'>
          <Link>Events and Programs</Link>
          <Link>Announcement</Link>
        </li>
        <li className='grid gap-2 place-items-center'>
          <div className='flex items-center gap-2'>
            <Link><FaFacebook className='text-lg'/></Link>
            <Link><IoIosMail className='text-2xl'/></Link>
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
        <small className='text-gray-400'>Copyright © 2023 • Registry of Inhabitants and Migrants</small>
      </div>
    </footer> 
  )
}

export default Footer