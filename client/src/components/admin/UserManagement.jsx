import React from 'react'
import SettingsHeader from './SettingsHeader'
import CustomTable from './CustomTable'

const userHeaders = [
  { key: 'username', label: 'Username' },
  { key: 'barangay', label: 'Barangay' },
  { key: 'type', label: 'Type' },
]

const UserManagement = ({ title, description }) => {
  return (
    <>
      <SettingsHeader title={title} description={description} />
      <div>
        <div className='flex flex-col md:flex-row justify-between mb-4'>
          <div className="form-group">
            <label htmlFor="search">Search User</label>
            <input type="search" id='search' placeholder='Type of search'/>
          </div>
          <button className='mt-6 w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>ADD USER</button>
        </div>
        <CustomTable headers={userHeaders} data={[]} />
      </div>
    </>
  )
}

export default UserManagement