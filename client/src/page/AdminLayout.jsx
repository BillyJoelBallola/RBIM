import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/admin/Navbar'
import { NavigationContext } from '../context/NavigationContext'
import MobileNavbar from '../components/admin/MobileNavbar'

const AdminLayout = () => {
  const { isNavigateOpen } = useContext(NavigationContext)

  return (
    <>
      <Navbar />
      <MobileNavbar />
      <div className={`ml-0 ${!isNavigateOpen && 'md:ml-[16rem]'} duration-150`}>
        {/* { isNavigateOpen && <div className='bg-black/20 absolute inset-0 z-10' onClick={toggleNav}/> } */}
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout