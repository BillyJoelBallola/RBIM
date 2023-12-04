import React from 'react'
import SettingsHeader from './SettingsHeader'

const Account = ({ title, description }) => {
  return (
    <>
      <SettingsHeader title={title} description={description} />
      <div>
        <form className='grid gap-4'>
          <div className='grid sm:grid-cols-2 gap-4'>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder='Username'/>
            </div>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" placeholder='Full Name'/>
            </div>
          </div>
          <div className='mt-2'>
            <span className='text-md font-semibold text-gray-600'>Address</span>
            <div className='grid sm:grid-cols-2 gap-4 mt-2'>
              <div className="form-group">
                <label htmlFor="barangay">Barangay</label>
                <input type="text" id="barangay" placeholder='Barangay'/>
              </div>
              <div className="form-group">
                <label htmlFor="municipal">Municipal</label>
                <input type="text" id="municipal" placeholder='Municipal'/>
              </div>
              <div className="form-group">
                <label htmlFor="province">Province</label>
                <input type="text" id="province" placeholder='Province'/>
              </div>
            </div>
          </div>
          <button className='mt-6 w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>SAVE CHANGES</button>
        </form>
      </div>
    </>
  )
}

export default Account