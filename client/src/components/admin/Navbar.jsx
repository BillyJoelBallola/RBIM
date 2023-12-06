import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import RBIMWhiteLogo from '../../assets/RBIM-logo-white.png'
import POPCOMWhiteLogo from '../../assets/popcom-logo-white.png'
import { operationLinks, moreLinks } from '../../static/NavLinks'
import { NavigationContext } from '../../context/NavigationContext'
import CustomDialog from './CustomDialog'
import axios from 'axios'

const Navbar = () => {
  const navigate = useNavigate()
  const { isNavigateOpen } = useContext(NavigationContext);
  const [visible, setVisible] = useState(false);
  const [dialogData, setDialogData] = useState({
    header: '',
    content: ''
  })

  const setDialogContent = (idx) => {
      switch (idx) {
        case 0:
          return setDialogData({
            header: 'About RBIM',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          });
        case 1:
          return setDialogData({
            header: 'Frequently Ask Questions',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          });
      } 
  }

  const logout = () => {
    axios.post('/api/logout');
    navigate("/login")
  }

  return (
    <>
      <CustomDialog visible={visible} setVisible={setVisible} header={dialogData.header} content={dialogData.content}/>
      <nav className={`navbar z-20 w-[16rem] fixed bottom-0 top-0 -left-80 ${!isNavigateOpen && 'md:left-0'} shadow-2xl duration-150`}>
        <div className='grid place-items-center py-4'>
          <img src={RBIMWhiteLogo} alt="rbim-logo" className='w-[190px] aspect-auto'/>
        </div>
        <ul>
          <div className='px-4 font-bold text-white mt-6 mb-4'>Operations</div>
          {
            operationLinks?.map((link, idx) => (
              <li key={idx}>
                {
                  link.path ?  
                  <NavLink to={link.path} className="text-sm flex gap-2 items-center text-white duration-150 bg-transparent py-2 px-6 hover:bg-[#004303]">
                    {link.icon}
                    {link.label}
                  </NavLink>
                  :
                  <button onClick={logout} className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6">
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
                  <button 
                    onClick={() => {
                      setVisible(current => !current)
                      setDialogContent(idx);
                    }} 
                    className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6">
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
    </>
  )
}

export default Navbar