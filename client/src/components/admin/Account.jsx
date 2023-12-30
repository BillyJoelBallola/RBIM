import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import SettingsHeader from './SettingsHeader'
import { Toast } from 'primereact/toast';
import axios from 'axios'

const Account = ({ title, description }) => {
  const toast = useRef(null)
  const [address, setAddress] = useState([])
  const { loggedUser, setUpdate } = useContext(UserContext)
  const [accountForm, setAccountForm] = useState({
    id: "",
    name: "",
    username: "",
    address_id: ""
  })

  useEffect(() => {
    if(loggedUser){
      setAccountForm({
        id: loggedUser.id,
        name: loggedUser.name,
        username: loggedUser.username,
        address_id: loggedUser.address_id
      })
    }
  }, [loggedUser])

  useEffect(() => {
    const fetchAddresses = async () => {
      const { data } = await axios.get("/api/address")
      setAddress(data.success ? data.data : [])
    }
    fetchAddresses()
  }, [])

  const handleInput = (e) => {
    setAccountForm(current => ({
      ...current,
      [e.target.name]: e.target.value
    }))
  } 

  const showToast = (severity, summary, detail) => {
    return toast.current.show({ severity: severity, summary: summary, detail: detail})
  }

  const saveChanges = async (e) => {
    e.preventDefault()
    try {
      if(accountForm.name === '' || accountForm.username === '' || accountForm.address_id === ''){
        return showToast("error", "Failed", "Fill up all fields")
      }
  
      const { data } = await axios.put("/api/user/account", accountForm)
      if(data.success){
        setUpdate("update")  
        return showToast("success", "Success", data.message)
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
              <label htmlFor="name">Full Name</label>
              <input type="text" name='name' id="name" placeholder='Full Name' value={accountForm.name} onChange={handleInput}/>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name='username' id="username" placeholder='Username' value={accountForm.username} onChange={handleInput}/>
            </div>
          </div>
          <div className='mt-2'>
            <span className='text-md font-semibold text-gray-600'>Address</span>
            <div className="form-group mt-2">
              <label htmlFor="barangay">Barangay, Municipal, Province</label>
              <select name="address_id" id="barangay" value={accountForm.address_id} onChange={handleInput} disabled={loggedUser?.role !== 'administrator' && true}>
                <option value="">-- select barangay --</option>
                {
                  address &&
                  address?.map((address) => (
                    <option value={address.id} key={address.id}>{address.barangay}, {address.municipal}, {address.province}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <button className='mt-6 w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>SAVE CHANGES</button>
        </form>
      </div>
    </>
  )
}

export default Account