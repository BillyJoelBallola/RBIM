import React from 'react'
import SettingsHeader from './SettingsHeader'
import CustomTable from './CustomTable'

const SurveyForm = ({ title, description }) => {
  return (
    <>
      <SettingsHeader title={title} description={description} />
      <div className='grid gap-4 mb-8'>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <select name="" id="question">
            <option value="">-- select questions --</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Question Details</label>
          <div className='bg-gray-100 drop-shadow-md text-gray-600 border rounded-md p-4 grid gap-2'>
            {/* <p className='font-semibold'>A. DEMOGRAPHIC CHARACTERISTICS</p>
            <p>FOR ALL HOUSEHOLD MEMBERS</p>
            <p>NAME SURNAME, FIRST NAME, MIDDLE NAME OR MIDDLE INITIAL</p>
            <p>Q: Who are the members of this household starting from the HH head?</p> */}
            <p>No selected question</p>
          </div>
        </div>
        <div className='grid gap-4'>
          <div className='form-group'>
            <label htmlFor="response">Response</label>
            <input type="text" id='response' placeholder='Response'/>
          </div>
          <CustomTable headers={[{ key: "responses", label: "Responses" }]}/>
        </div>
        <button className='mt-4 w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>SAVE CHANGES</button>
      </div>
    </>
  )
}

export default SurveyForm