import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SettingsHeader from './SettingsHeader'
import { Toast } from 'primereact/toast'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'

const Security = ({ title, description }) => {
  const toast = useRef(null)
  const navigate = useNavigate()
  const { loggedUser, setUpdate } = useContext(UserContext)
  const [securityForm, setSecurityForm] = useState({
    id: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const showToast = (severity, summary, detail) => {
    return toast.current.show({ severity: severity, summary: summary, detail: detail})
  }

  const resetForm = () => {
    setSecurityForm({
      id: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  useEffect(() => {
    if(loggedUser){
      setSecurityForm(current => ({
        ...current,
        id: loggedUser.id
      }))
    }
  }, [loggedUser])

  const handleInput = (e) => {
    setSecurityForm(current => ({
      ...current,
      [e.target.name]: e.target.value
    }))
  } 

  const saveChanges = async (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem('rbim_token')
    try {
      if(securityForm.currentPassword === '' || securityForm.newPassword === '' || securityForm.confirmPassword === ''){
        return showToast("error", "Failed", "Fill up all fields")
      }

      if(securityForm.confirmPassword !== securityForm.newPassword){
        return showToast("error", "Failed", "Password did not match")
      }

      if(securityForm.newPassword.length < 5){
        return showToast("error", "Failed", "Password must be 5 characters or more")
      }

      const { data } = await axios.put("/api/user/security", { accountData: securityForm, rbim_token: token })
      if(data.success){
        setUpdate("update")  
        resetForm()
        showToast("success", "Success", data.message + ". You are require to re-loggin to the system")
        setTimeout(() => {
          axios.post("/api/logout")
          navigate("/login")
        }, [2000])
      }else{
        return showToast("error", "Failed", data.message)
      }

    } catch (error) {
      return showToast("error", "Failed", "Internal Server Error")
    }
  }
  
  return (
    <>
      <Toast ref={toast} />
      <SettingsHeader title={title} description={description} />
      <div>
        <form className='grid gap-4' onSubmit={saveChanges}>
          <div className='grid sm:grid-cols-2 gap-4'>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" name='currentPassword' id="currentPassword" placeholder='Current Password' value={securityForm.currentPassword} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" name='newPassword' id="newPassword" placeholder='New Password' value={securityForm.newPassword} onChange={handleInput} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name='confirmPassword' id="confirmPassword" placeholder='Confirm Password' value={securityForm.confirmPassword} onChange={handleInput} />
            </div>
          </div>
          <button className='mt-6 w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>SAVE CHANGES</button>
        </form>
      </div>
    </>
  )
}

export default Security