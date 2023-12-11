import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import SettingsHeader from './SettingsHeader'
import CustomDialog from './CustomDialog'
import { Toast } from 'primereact/toast';
import CustomTable from './CustomTable'
import axios from 'axios'

import { MdOutlineEdit } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog'; 

const UserManagement = ({ title, description }) => {
  const toast = useRef(null)
  const { loggedUser } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [address, setAddress] = useState([])
  const [visible, setVisible] = useState(false)
  const [update, setUpdate] = useState(null)
  const [userForm, setUserForm] = useState({
    name: "",
    username: "",
    address_id: "",
    role: "",
  })

  const showToast = (severity, summary, detail) => {
    return toast.current.show({ severity: severity, summary: summary, detail: detail})
  }

  const userHeaders = [{ key: 'name', label: 'Name' }, { key: 'barangay', label: 'Barangay' }, { key: 'role', label: 'Role' }]
  const actions = [{ label: <MdOutlineEdit />, onClick: ({rowData}) => editResponse(rowData) }, { label: <LuTrash2 />, onClick: ({rowData}) => deleteDialog(rowData) }]

  useEffect(() => {
    let API;

    switch (loggedUser?.role) {
      case "secretary":
        API = `/api/user/address/${loggedUser?.address_id}`;
        break;
      case "administrator":
        API = `/api/user/role/health_worker`;
        break;
      default:
        API = null;
    }

    const fetchAllUsers = async () => {
      const { data } = await axios.get(API)
      const filterUsers = data.filter(user => user.username !== loggedUser.username)
      setUsers(filterUsers || [])
    }

    if(loggedUser?.role){
      fetchAllUsers()
    }
    setUpdate(null)
  }, [update, loggedUser])

  useEffect(() => {
    const fetchAddresses = async () => {
      const addressResponse = await axios.get("/api/address")
      setAddress(addressResponse.data || [])
    }
    fetchAddresses()
  }, [])

  useEffect(() => {
    if(loggedUser?.role === "secretary"){
      setUserForm(current => ({
        ...current,
        address_id: loggedUser?.address_id
      }))
    }
  }, [loggedUser])

  const resetUserForm = () => {
    setUserForm({
      name: "",
      username: "",
      address_id: "",
      role: "",
    })
    setVisible(false)
  }

  const handleSubmitUser = async (e) => {
    e.preventDefault()
    try {
      if(userForm.name === '' || userForm.username === '' || userForm.address_id === '' || userForm.role === ''){
        return showToast("error", "Failed", "Fill up all fields")
      }
  
      if(userForm.username.length < 5 || userForm.username.length > 15){
        return showToast("error", "Failed", "Username must be greater than to 5 and less than 15")
      }

      const { data } = await axios.post("/api/user", { ...userForm, password: userForm.username })
      if(data.userId){
        resetUserForm()
        setUpdate("add")  
        return showToast("success", "Success", data.message)
      }else{
        return showToast("error", "Failed", data)
      }
      
    } catch (error) {
      return showToast("error", "Failed", "Internal Server Error")
    }
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    try {
      if(userForm.name === '' || userForm.username === '' || userForm.address_id === '' || userForm.role === ''){
        return showToast("error", "Failed", "Fill up all fields")
      }
  
      if(userForm.username.length < 5 || userForm.username.length > 15){
        return showToast("error", "Failed", "Username must be greater than to 5 and less than 15")
      }

      const { data } = await axios.put("/api/user", { ...userForm, password: userForm.username })
      if(data.user){
        resetUserForm()
        setUpdate("edit")  
        return showToast("success", "Success", data.message)
      }else{
        return showToast("error", "Failed", data)
      }
      
    } catch (error) {
      return showToast("error", "Failed", "Internal Server Error")
    }
  }

  const handleFormInput = (e) => {
    setUserForm(current => ({
      ...current,
      [e.target.name]: e.target.value
    }))
  } 

  const deleteUser = async (rowData) => {
    try {
      const { data } = await axios.delete(`/api/user/${rowData?.id}`)
      if(data){
        showToast("success", "Success", "User deleted successfully")
      }else{
        showToast("error", "Failed", "Failed to delete user")
      }
      setUpdate("delete user")
    } catch (error) {
      return showToast("error", "Failed", "An unexpected error occurred. Please try again later.")
    }
  }

  const deleteDialog = (rowData) => {
    confirmDialog({
      draggable: false,
      message: 'Are you sure you want to delete this user?',
      header: 'Delete User',
      accept: () => deleteUser(rowData)
    });
  };

  const editResponse = (rowData) => {
    const { id, name, username, address_id, role } = rowData
    setUserForm({
      id: id,
      name: name,
      username: username,
      address_id: address_id,
      role: role,
    })
    setVisible(true)
  }

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <SettingsHeader title={title} description={description} />
      <CustomDialog 
        visible={visible} 
        setVisible={setVisible} 
        header={"User"} 
        content={
          <form onSubmit={userForm?.id ? handleEditUser : handleSubmitUser}>
            <div className='grid gap-4'>
              <div className='flex gap-4'>
                <div className="form-group w-full">
                  <label htmlFor="name">Name</label>
                  <input type="text" name='name' id='name' placeholder='Full Name' value={userForm.name} onChange={handleFormInput} />
                </div>
                <div className="form-group basis-3/4">
                  <label htmlFor="username">Username</label>
                  <input type="text" name='username' id='username' placeholder='Username' value={userForm.username} onChange={handleFormInput} />
                </div>
              </div>
              <div className='grid gap-4'>
                <div className="form-group">
                  <label htmlFor="barangay">Barangay</label>
                  <select name="address_id" id="barangay" disabled={loggedUser?.role === "administrator" ? false : true} value={userForm?.address_id} onChange={handleFormInput}>
                    <option value="">-- select barangay --</option>
                    {
                      address &&
                      address?.map((address) => (
                        <option value={address.id} key={address.id}>{address.barangay}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select name="role" id="role" value={userForm.role} onChange={handleFormInput}>
                    <option value="">-- select role --</option>
                    {
                      loggedUser?.role === 'administrator' &&
                      <>
                        <option value="administrator">Administrator</option>
                        <option value="secretary">Barangay Secretary</option>
                      </>
                    }
                    {
                       loggedUser?.role === 'secretary' &&
                       <option value="health_worker">Health Worker</option>
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className='flex justify-end mt-6'>
              <button type='button' onClick={resetUserForm} className='w-min text-sm py-2 px-6 font-semibold'>CANCEL</button>
              <button type='submit' className='w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>{userForm?.id ? 'EDIT' : 'ADD'}</button>
            </div>
          </form>
        }
      />
      <div>
        <div className='flex flex-col md:flex-row justify-between mb-4'>
          <div className="form-group">
            <label htmlFor="search">Search User</label>
            <input type="search" id='search' placeholder='Type of search'/>
          </div>
          <button onClick={() => setVisible(current => !current)} className='mt-6 w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>ADD USER</button>
        </div>
        <CustomTable headers={userHeaders} data={users} actions={actions}/>
      </div>
    </>
  )
}

export default UserManagement