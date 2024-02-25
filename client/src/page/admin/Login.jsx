import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import RBIMBigLogo from "../../assets/RBIM-big-logo.png"
import POPCOMLogoWhite from "../../assets/popcom-logo-white.png"
import RBIMBlackLogo from "../../assets/RBIM-logo-black.png"
import { UserContext } from '../../context/UserContext';
import BgImage from "../../assets/bg-image.png"
import { Toast } from 'primereact/toast';
import axios from "axios"

const Login = () => {
  const navigate = useNavigate()
  const toast = useRef(null)
  const { setUpdate } = useContext(UserContext)
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  })

  const handleInput = (e) => {
    const value = e.target.value
    setLoginForm(current => ({...current, [e.target.name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!loginForm.username || !loginForm.password) {
      return toast.current.show({ 
        severity: 'error', 
        summary: 'Failed', 
        detail: 'Failed to login, fill up all fields' 
      })
    }else{
      try {
        const { data } = await axios.post('/api/login', loginForm)
        if(data.success) {
          window.localStorage.setItem('rbim_system', data?.rbim_token)
          navigate("/rbim/")
          setUpdate("logged-in")
        }else{
          return toast.current.show({
            severity: 'error',
            summary: 'Failed',
            detail: data.message,
          });
        }
      } catch (error) {
        return toast.current.show({
          severity: 'error',
          summary: 'Failed',
          detail: 'An unexpected error occurred. Please try again later.',
        });
      }
    }
  }

  return (
    <>
      <Toast ref={toast}/>
      <div className='w-screen h-screen grid place-items-center bg-gray-100'>
        <div className='bg-white grid md:grid-cols-2 w-[90%] h-[60%] md:w-[80%] md:h-[70%] lg:w-[70%] rounded-lg overflow-hidden shadow-md'>
          <div className='grid px-8 place-items-center'>
            <div className='w-[90%] md:w-[80%]'>
              <img src={RBIMBlackLogo} alt="rbim-black-logo" className='w-[250px] aspect-auto mb-8'/>
              <form onSubmit={handleSubmit} className='grid gap-4'>
                <div className='form-group'>
                  <label htmlFor="username">Username</label>
                  <input type="text" name='username' id='username' placeholder='Username' onChange={handleInput}/>
                </div>
                <div className='form-group'>
                  <label htmlFor="password">Password</label>
                  <input type="password" name='password' id='password' placeholder='Password' onChange={handleInput}/>
                </div>
                {/* <a href="" className='text-sm text-gray-400 text-right'>Forgot Password?</a> */}
                <button type='submit' className='mt-4 rounded-md bg-[#008605] text-white text-sm py-2 font-semibold'>LOGIN</button>
              </form>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='w-full h-full relative'>
              <div className='absolute inset-0 bg-gradient-to-b from-[#004303] to-white/70 z-1'/>
              <img src={BgImage} alt="bg-image" className='w-full h-full object-cover'/>
              <div className='absolute pb-8 grid place-content-center gap-8 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4'>
                <img src={POPCOMLogoWhite} alt="rbim-logo" className='w-[200px] aspect-auto'/>
                <img src={RBIMBigLogo} alt="rbim-logo" className=''/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
