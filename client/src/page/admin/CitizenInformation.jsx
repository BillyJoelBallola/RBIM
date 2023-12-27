import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/admin/Header'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../components/admin/CustomTable'
import { UserContext } from '../../context/UserContext'
import { barangay } from '../../static/Geography'
import axios from 'axios'

import { MdOutlineEdit } from "react-icons/md";
import { MdOpenInNew } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";

const headers = [
  {
    key: 'respondent_name',
    label: "Respondent Name",
  },
  {
    key: 'address',
    label: "Address",
  },
  {
    key: 'first_visit_date',
    label: "First Visit",
  },
  {
    key: 'second_visit_date',
    label: "Second Visit",
  },
]

// TODO: functions for this table
const CitizenInformation = () => {
  const navigate = useNavigate()
  const [surveyForms, setSurveyForm] = useState([])
  const { loggedUser } = useContext(UserContext)
  const actions = [
    { 
      label: <MdOutlineEdit />, 
      onClick: ({rowData}) => navigate(`/rbim/survey_form/form1/${rowData.survey_form_id}`)
    }, 
    { 
      label: <LuTrash2 />, 
      onClick: ({rowData}) => console.log(rowData)
    }
  ]
  
  useEffect(() => {
    const fetchSurveyForms = async () => {
      const { data } = await axios.get('/api/survey_forms')
      if(data.success){
        const response = data.data
        const filteredSurveyForms = loggedUser?.role !== 'administrator' ? response.filter(data => data.address === loggedUser?.address_id) : response
        setSurveyForm(filteredSurveyForms)
      }
    }

    fetchSurveyForms()
  }, [loggedUser])

  return (
    <>
      <Header pageName={"Citizen Information"} />
      <div className="content">
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex gap-4 items-center flex-wrap'>
            <div className="form-group">
              <label htmlFor="search">Search Name</label>
              <input type="text" id='search' placeholder='Type to search'/>
            </div>
            {/* <div className="form-group">
              <label htmlFor="month">Year</label>
              <input type="month" id="month" />
            </div>
            <div className="form-group">
              <label htmlFor="barangay">Baragay</label>
              <select id="barangay">
                <option value="">Municipal</option>
                {
                  barangay?.map((place, idx) => (
                    <option key={idx} value={place}>{place}</option>
                  ))
                }
              </select>
            </div> */}
          </div>
        </div>
        <div className='my-6'>
          <p className='text-gray-400 mb-4'>Manage citizen information</p>
          <CustomTable headers={headers} data={surveyForms} actions={actions}/>
        </div>
      </div>
    </>
  )
}

export default CitizenInformation