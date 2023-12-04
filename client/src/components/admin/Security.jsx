import React from 'react'
import SettingsHeader from './SettingsHeader'

const Security = ({ title, description }) => {
  return (
    <>
      <SettingsHeader title={title} description={description} />
      <div>
        <form className='grid gap-4'>
          <div className='grid sm:grid-cols-2 gap-4'>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" placeholder='Current Password'/>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" placeholder='New Password'/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder='Confirm Password'/>
            </div>
          </div>
          <button className='mt-6 w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>SAVE CHANGES</button>
        </form>
      </div>
    </>
  )
}

export default Security