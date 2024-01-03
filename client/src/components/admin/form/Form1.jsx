import React, { useContext, useEffect, useState } from 'react'
import { SurveyFormContext } from '../../../context/SurveyFormContext';
import axios from 'axios';

import { FaArrowRightLong } from "react-icons/fa6";
import Divider from '../../Divider'

const interviewHeader = [
  { name: 'Visit' },
  { name: 'Date of Visit' },
  { name: 'Time Start' },
  { name: 'Time End' },
  { name: 'Result' },
  { name: 'Date of Next Visit' },
  { name: 'Name of Interviewer' },
  { name: 'Name of Supervisor' },
]

const Form1 = ({ navigate }) => {
  const { handleInputChangeForHousehold, handleInputChangeForSurveyForm, household, surveyForm } = useContext(SurveyFormContext)
  const [address, setAddress] = useState([])

  useEffect(() => {
    const fetchAddress = async () => {
      const { data } = await axios.get('/api/address')
      if(data.success){
        const response = await data.data
        setAddress(response);
      }
    }

    fetchAddress()
  }, [])  

  return (
    <div className='py-4 grid gap-6'>
      {/* 1st row */}
      <div className='flex flex-wrap gap-4'>
        <div className="form-group">
          <label htmlFor="household_number">Household No.</label>
          <input 
            type="number" 
            id='household_number' 
            name='household_number' 
            value={household.household_number || ''} 
            onChange={handleInputChangeForHousehold}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Living Type</label>
          <div className='flex items-center gap-8'>
            <div className='flex items-center gap-2'>
              <input 
                type="radio" 
                id='household' 
                name='living_type' 
                value={'household'}
                checked={household.living_type === 'household' ? true : false} 
                onChange={handleInputChangeForHousehold}
              />
              <label htmlFor="household">Household</label>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="radio" 
                id='institutional' 
                name='living_type'  
                value='institutional' 
                checked={household.living_type === 'institutional' ? true : false} 
                onChange={handleInputChangeForHousehold}
              />
              <label htmlFor="institutional" className='whitespace-nowrap'>Institutional Living Quarter</label>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      {/* 2nd row */}
      <div>
        <span className='font-semibold text-gray-700'>A. IDENTIFICATION</span>
        <div className='grid gap-4 mt-4'>
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            <div className="form-group w-full">
              <label htmlFor="respondent_name">Respondent Name</label>
              <input 
                type="text" 
                id='respondent_name' 
                name='respondent_name' 
                value={household.respondent_name || ''} 
                onChange={handleInputChangeForHousehold}
              />
            </div>
            <div className="form-group w-full">
              <label htmlFor="household_head">Household Head</label>
              <input 
                type="text" 
                id='household_head' 
                name='household_head' 
                value={household.household_head || ''} 
                onChange={handleInputChangeForHousehold}
              />
            </div>
            <div className="form-group w-full">
              <label htmlFor="household_member_no">Total No. of Household Member</label>
              <input 
                type="number" 
                id='household_member_no' 
                name='household_member_no' 
                value={household.household_member_no || ''} 
                onChange={handleInputChangeForHousehold}
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            <div className="form-group w-full">
              <label htmlFor="street">Street</label>
              <input 
                type="text" 
                id='street' 
                name='street' 
                value={household.street || ''} 
                onChange={handleInputChangeForHousehold}
              />
            </div>
            <div className="form-group w-full">
              <label htmlFor="unit_no">Unit No.</label>
              <input 
                type="number" 
                id='unit_no' 
                name='unit_no' 
                value={household.unit_no || ''} 
                onChange={handleInputChangeForHousehold}
              />
            </div>
            <div className="form-group w-full">
              <label htmlFor="house_no">House No.</label>
              <input 
                type="number" 
                id='house_no' 
                name='house_no' 
                value={household.house_no || ''} 
                onChange={handleInputChangeForHousehold}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Barangay, Municipal/City, Province</label>
            <select 
              disabled
              name="address" 
              id="address"
              value={household.address || ''} 
              onChange={handleInputChangeForHousehold}
            >
              <option value="">-- select --</option>
              {
                address?.map(address => (
                  <option value={address.id} key={address.id}>{address.barangay}, {address.municipal}, {address.province}</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>
      <Divider />
      {/* 3rd row */}
      <>
        <span className='font-semibold text-gray-700'>A. INTERVIEW INFORMATION</span>
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="inline-block min-w-full">
            <div className="overflow-hidden drop-shadow-md rounded-lg border border-gray-300">
              <table className="min-w-full bg-gray-100">
                <thead className="border-b">
                  <tr>
                    {
                      interviewHeader.map((header, idx) => (
                        <th scope="col" className="border text-sm font-medium text-gray-900 px-6 py-4 text-left" key={idx}>
                          {header.name}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className="bg-white text-sm">
                  {/* 1st Visit */}
                  <tr className='border-b'>
                    <td className="px-2 py-2 whitespace-nowrap border">1st Visit</td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="date" 
                        name='first_visit_date'
                        value={surveyForm.first_visit_date?.toString()?.slice(0, 10) !== '0000-00-00' ? surveyForm.first_visit_date?.toString()?.slice(0, 10) : ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        className='w-full'
                        type="time" 
                        name='first_visit_time_start'
                        value={surveyForm?.first_visit_time_start?.toString()?.slice(11, 22) !== '00:00:00' ? surveyForm.first_visit_time_start : ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        className='w-full'
                        type="time" 
                        name='first_visit_time_end'
                        value={surveyForm.first_visit_time_end.toString().slice(11, 22) !== '00:00:00'  ? surveyForm.first_visit_time_end : ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <select 
                        name="first_visit_result"
                        value={surveyForm.first_visit_result || ''}
                        onChange={handleInputChangeForSurveyForm}
                      >
                        <option value="">select</option>
                        <option value="C">Completed</option>
                        <option value="CB">Callback</option>
                        <option value="R">Refused</option>
                      </select>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="date" 
                        name='first_visit_date_next_visit'
                        value={surveyForm?.first_visit_date_next_visit?.toString()?.slice(0, 10) !== '0000-00-00' ? surveyForm?.first_visit_date_next_visit?.toString()?.slice(0, 10) : ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="text" 
                        name='first_visit_interviewer'
                        value={surveyForm.first_visit_interviewer || ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="text" 
                        name='first_visit_supervisor'
                        value={surveyForm.first_visit_supervisor || ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                  </tr>
                  {/* 2nd Visit */}
                  <tr className='border-b'>
                    <td className="px-2 py-2 whitespace-nowrap border">2nd Visit</td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="date" 
                        name='second_visit_date'
                        value={surveyForm?.second_visit_date?.toString()?.slice(0, 10) !== '0000-00-00' ? surveyForm?.second_visit_date?.toString()?.slice(0, 10) : ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        className='w-full'
                        type="time" 
                        name='second_visit_time_start'
                        value={surveyForm.second_visit_time_start.toString().slice(11, 22) !== '00:00:00'  ? surveyForm.second_visit_time_start : ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="time" 
                        className='w-full'
                        name='second_visit_time_end'
                        value={surveyForm.second_visit_time_end.toString().slice(11, 22) !== '00:00:00' ? surveyForm.second_visit_time_end : ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <select 
                        name="second_visit_result"
                        value={surveyForm.second_visit_result || ''}
                        onChange={handleInputChangeForSurveyForm}
                      >
                        <option value="">select</option>
                        <option value="C">Completed</option>
                        <option value="CB">Callback</option>
                        <option value="R">Refused</option>
                      </select>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="date" 
                        name='second_visit_date_next_visit'
                        value={surveyForm?.second_visit_date_next_visit?.toString()?.slice(0, 10) !== '0000-00-00' ? surveyForm?.second_visit_date_next_visit?.toString()?.slice(0, 10) : ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="text" 
                        name='second_visit_interviewer'
                        value={surveyForm.second_visit_interviewer || ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <input 
                        type="text" 
                        name='second_visit_supervisor'
                        value={surveyForm.second_visit_supervisor || ''}
                        onChange={handleInputChangeForSurveyForm}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
      <Divider />
      {/* 4th row */}
      <div>
        <span className='font-semibold text-gray-700'>C. ENCODING INFORMATION</span>
        <div className='flex flex-col md:flex-row gap-4 md:gap-8 mt-4'>
          <div className="form-group w-full">
            <label htmlFor="date_encoded">Date Encoded</label>
            <input 
              type="date" 
              id='date_encoded' 
              value={surveyForm?.date_encoded?.toString()?.slice(0, 10) !== '0000-00-00' ? surveyForm.date_encoded.toString().slice(0, 10) : ''}
              // onChange={handleInputChangeForSurveyForm}
              disabled
            />
          </div>
          <div className="form-group w-full">
            <label htmlFor="encoder_name">Name and Initial of Encoder</label>
            <input 
              type="text"
              id='encoder_name' 
              value={surveyForm.encoder_name || ''}
              disabled
              // onChange={handleInputChangeForSurveyForm}
            />
          </div>
          <div className="form-group w-full">
            <label htmlFor="supervisor_name">Name of Supervisor</label>
            <input 
              type="text" 
              id='supervisor_name' 
              value={surveyForm.supervisor_name || ''}
              onChange={handleInputChangeForSurveyForm}
              disabled
            />
          </div>
        </div>
      </div>
      <div className='flex justify-end mt-4'>
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form2')}>
          <span>Next</span>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  )
}

export default Form1