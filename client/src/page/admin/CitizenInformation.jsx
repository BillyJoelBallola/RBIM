import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/admin/Header'
import { useNavigate } from 'react-router-dom'
import CustomTable from '../../components/admin/CustomTable'
import { UserContext } from '../../context/UserContext'
import CustomDialog from '../../components/admin/CustomDialog'
import { barangay } from '../../static/Geography'
import axios from 'axios'

import { MdOutlineEdit } from "react-icons/md";
import { LuArchive } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { MdOpenInNew } from "react-icons/md";

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

const individualHeaders = [
  {
    key: 'household_number',
    label: "Household No.",
  },
  {
    key: 'Q1',
    label: "Name",
  }
]

const CitizenInformation = () => {
  const navigate = useNavigate()
  const [surveyForms, setSurveyForm] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [query, setQuery] = useState('')
  const [monthYear, setMonthYear] = useState('')
  const [individualQuery, setIndividualQuery] = useState('')
  const [visible, setVisible] = useState(false)
  const [barangayFilter, setBarangayFilter] = useState('0');
  const { loggedUser } = useContext(UserContext)
  const actions = [
    { 
      label: <MdOutlineEdit className='text-lg'/>, 
      onClick: ({rowData}) => navigate(`/rbim/survey_form/form1/${rowData.survey_form_id}`)
    }, 
    { 
      label: <LuArchive className='text-lg'/>, 
      onClick: ({rowData}) => console.log(rowData.id)
    }
  ]

  const individualActions = [
    { 
      label: <MdOpenInNew className='text-lg'/>, 
      onClick: ({rowData}) => navigate(`/rbim/individual_form/${rowData.id}`)
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

    const fetchIndividuals = async () => {
      const { data } = await axios.get('/api/individuals')
      if(data.success){
        const response = data.data
        const filteredIndividuals = loggedUser?.role !== 'administrator' ? response.filter(data => data.address === loggedUser?.address_id) : response
        setIndividuals(filteredIndividuals)
      }
    }

    fetchIndividuals()
    fetchSurveyForms()
  }, [loggedUser])

  const filteredData = surveyForms.filter(item => {
    const matchesName = item.respondent_name.toLowerCase().includes(query.toLowerCase());
    const matchesMonthYear = item.date_encoded.toString().substring(0, 7) === monthYear.toString();
    const matchesBarangay = barangayFilter.toString() === '0' || item.address.toString() === barangayFilter;
    
    return matchesName && matchesMonthYear && matchesBarangay;
  })

  function filterArrayByQuery(array, query) {
    if (!query) {
      return [];
    }

    const filteredData = array.filter(item => {
      return item?.Q1?.toLowerCase()?.includes(query?.toLowerCase());
    });

    return filteredData.length > 0 ? filteredData : [];
  }

  const filterIndividualData = filterArrayByQuery(individuals, individualQuery)
  
  return (
    <>
      <CustomDialog
        header={'Individual Records'}
        visible={visible}
        setVisible={setVisible} 
        classStyle={'w-[90%] md:w-[80%] lg:w-[60%] max-h-[80%]'}
        content={(
          <div>
            <div className='mb-4'>
              <div className="form-group">
                <label htmlFor="individual_search">Search</label>
                <input type="text" id='individual_search' placeholder='Search name' value={individualQuery} onChange={e => setIndividualQuery(e.target.value)}/>
              </div>
            </div>
            <div className='overflow-auto'>
              <CustomTable  
                headers={individualHeaders} 
                actions={individualActions}
                data={filterIndividualData} 
              />
            </div>
          </div>
        )}
      />
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
            {
              loggedUser?.role === 'administrator' &&
              <div className="form-group">
                <label htmlFor="barangay">Location</label>
                <select id="barangay" value={barangayFilter} onChange={(e) => setBarangayFilter(e.target.value)}>
                  <option value={'0'}>Municipal</option>
                  {
                    barangay?.map((place, idx) => (
                      <option key={idx} value={idx + 1}>{place}</option>
                    ))
                  }
                </select>
              </div>
            } 
          </div>
          <button 
            className='self-end flex items-center gap-1 bg-gray-200 hover:bg-gray-300 duration-150 text-gray-600 py-1 px-2 rounded-full border'
            onClick={() => setVisible(true)}
          >
            <IoSearch className='text-lg' />
            <span className='text-sm'>Search Individual</span>
          </button>
        </div>
        <div className='my-6'>
          <p className='text-gray-400 mb-4'>
            Manage citizen information.
            { filteredData.length > 0 ? <span className='text-gray-600'>{` [${filteredData.length}] Filtered Records` }</span> : <></> }  
          </p>
          <CustomTable headers={headers} data={filteredData} actions={actions}/>
        </div>
      </div>
    </>
  )
}

export default CitizenInformation