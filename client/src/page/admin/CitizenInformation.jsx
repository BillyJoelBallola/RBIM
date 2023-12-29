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
    key: 'date_encoded',
    label: "Date Encoded",
  }
]

const CitizenInformation = () => {
  const navigate = useNavigate()
  const [surveyForms, setSurveyForm] = useState([])
  const [query, setQuery] = useState('')
  const [monthYear, setMonthYear] = useState('')
  const [barangayFilter, setBarangayFilter] = useState('');
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

  const filteredData = surveyForms.filter(item => {
    const matchesName = item.respondent_name.toLowerCase().includes(query.toLowerCase());
    const matchesMonthYear = item.date_encoded.toString().substring(0, 7) === monthYear.toString();
    // const matchesBarangay = item.address === barangayFilter;

    return matchesName && matchesMonthYear;
  })

  return (
    <>
      <Header pageName={"Citizen Information"} />
      <div className="content">
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex gap-4 items-center flex-wrap'>
            <div className="form-group">
              <label htmlFor="search">Search</label>
              <input type="search" id='search' placeholder='Search respondent name' value={query} onChange={(e) => setQuery(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="month">Month/Year</label>
              <input type="month" id="month" value={monthYear} onChange={(e) => setMonthYear(e.target.value)}/>
            </div>
            {/* {
              loggedUser?.role === 'administrator' &&
              <div className="form-group">
                <label htmlFor="barangay">Baragay</label>
                <select id="barangay" value={barangayFilter} onChange={(e) => setBarangayFilter(e.target.value)}>
                  <option value="">Municipal</option>
                  {
                    barangay?.map((place, idx) => (
                      <option key={idx} value={place}>{place}</option>
                    ))
                  }
                </select>
              </div>
            }  */}
          </div>
        </div>
        <div className='my-6'>
          <p className='text-gray-400 mb-4'>Manage citizen information</p>
          <CustomTable headers={headers} data={filteredData} actions={actions}/>
        </div>
      </div>
    </>
  )
}

export default CitizenInformation