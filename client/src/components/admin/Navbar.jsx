import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import RBIMWhiteLogo from '../../assets/RBIM-logo-white.png'
import POPCOMWhiteLogo from '../../assets/popcom-logo-white.png'
import { operationLinks } from '../../static/NavLinks'
import { NavigationContext } from '../../context/NavigationContext'
import { UserContext } from '../../context/UserContext'
import CustomDialog from './CustomDialog'

const Navbar = () => {
  const navigate = useNavigate()
  const { isNavigateOpen } = useContext(NavigationContext);
  const { setLoggedUser, setToken } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [dialogData, setDialogData] = useState({
    header: '',
    content: ''
  })

  const logout = () => {
    window.localStorage.removeItem('rbim_token')
    setToken(null)
    setLoggedUser(null)
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
                  </NavLink> :
                  <>
                    <div className='mx-auto my-4 w-[85%] h-[1.5px] bg-white/10' />
                    <button
                      className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6"
                      onClick={() => logout()}
                    >
                      {link.icon}
                      {link.label}
                    </button>
                  </>
                }
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