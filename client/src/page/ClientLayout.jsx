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
      {/* <Messenger /> */}
      <div className='bg-white overflow-hidden pt-[95px] pb-[40px] client-container'>
        <Outlet />
      </div>  
      <Footer />
    </>
  )
}

export default ClientLayout