import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/client/Navbar'
import Footer from '../components/client/Footer'
import Messenger from '../components/client/Messenger'

const ClientLayout = () => {
  document.title = 'Magdalena Community Hub'
  
  return (
    <>
      <Navbar />
      <Messenger />
      <div className='bg-[#f1f1f1] overflow-hidden pt-[100px] pb-[10px] h-full'>
        <Outlet />
      </div>  
      <Footer />
    </>
  )
}

export default ClientLayout