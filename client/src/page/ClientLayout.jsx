import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/client/Navbar'
import Footer from '../components/client/Footer'

const ClientLayout = () => {
  return (
    <>
      <Navbar />
      <div className='bg-[#f1f1f1] overflow-hidden pt-[100px] pb-[20px] h-screen'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default ClientLayout