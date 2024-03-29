import React, { useContext, useEffect, useRef, useState } from 'react'
import CustomTable from '../../components/admin/CustomTable'
import CustomDialog from '../../components/admin/CustomDialog'
import { UserContext } from '../../context/UserContext'
import Header from '../../components/admin/Header'
import { barangay } from '../../static/Geography'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

import { Toast } from 'primereact/toast'
import { MdOutlineEdit } from "react-icons/md";
import { LuArchive } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { MdOpenInNew } from "react-icons/md";

const headers = [
  {
    key: 'household_head',
    label: "Household Head",
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
  const currentDate = new Date()
  const year = currentDate.getFullYear().toString()
  const month = moment(currentDate).format('l')[0]
  const formattedMonth = month.toString().length === 1 ? "0" + month.toString() : ''
  const navigate = useNavigate()
  const toast = useRef(null)
  const [surveyForms, setSurveyForm] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [query, setQuery] = useState('')
  const [monthYear, setMonthYear] = useState(year + "-" + formattedMonth)
  const [individualQuery, setIndividualQuery] = useState('')
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [archiveVisible, setArchiveVisible] = useState(false)
  const [barangayFilter, setBarangayFilter] = useState('0');  
  const { loggedUser } = useContext(UserContext)
  const actions = [
    { 
      label: <MdOutlineEdit className='text-lg'/>, 
      onClick: ({rowData}) => navigate(`/rbim/survey_form/form1/${rowData?.survey_form_id}`)
    }, 
    { 
      label: <LuArchive className='text-lg'/>, 
      onClick: ({rowData}) => {
        setArchiveVisible(true)
        setSelectedData(rowData?.survey_form_id)
      }
    }
  ]

  const individualActions = [
    { 
      label: <MdOpenInNew className='text-lg'/>, 
      onClick: ({rowData}) => navigate(`/rbim/individual_form/${rowData?.id}`)
    }
  ] 

  const showToast = (severity, summary, detail) => {
    return toast.current.show({ severity: severity, summary: summary, detail: detail})
  }
  
  useEffect(() => {
    const fetchSurveyForms = async () => {
      const { data } = await axios.get('/api/survey_forms')
      if (data?.success) {
        const response = data?.data
        const filteredSurveyForms = !loggedUser?.role?.includes('administrator')
          ? response?.filter(data => (data.address === loggedUser?.address_id && data?.status !== 2))
          : response?.filter(data => data.status !== 2)
        setSurveyForm(filteredSurveyForms)
      }
    }
    
    const fetchIndividuals = async () => {
      const { data } = await axios.get('/api/individuals')
      if(data?.success){
        const response = data?.data
        const filteredIndividuals = !loggedUser?.role?.includes('administrator') 
          ? response?.filter(data => (data.address === loggedUser?.address_id && data?.status !== 2)) 
          : response?.filter(data => data?.status !== 2)
        setIndividuals(filteredIndividuals)
      }
    }
    
    if(loggedUser){
      fetchIndividuals()
      fetchSurveyForms()
    }

    setAction(null)
  }, [loggedUser, action])

  const updateStatus = async () => {
    if(selectedData){
      const { data } = await axios.put('/api/update_status', { status: 2, id: selectedData })
      if(data.success){
        setArchiveVisible(false)
        setAction('delete')
        setSelectedData(null)
        return showToast('success', 'Success', 'Survey form archive successfully')
      }else{
        setArchiveVisible(false)
        setSelectedData(null)
        return showToast('error', 'Failed', 'Failed to archive selected survey form')
      }
    }else{
      return showToast('error', 'Failed', 'Select survey form to archive')
    }
  }

  const footerContent = (
    <div className='flex justify-end'>
        <button 
          className='px-6 py-2 rounded-md bg-transparent' 
          onClick={() => {
            setSelectedData(null)
            setArchiveVisible(false)
          }}>No</button>
        <button 
            className='px-6 py-2 rounded-md bg-[#008605] text-white' 
            onClick={() => updateStatus()}
        >
            Yes
        </button>
    </div>
  );

  const filteredData = surveyForms?.filter(item => {
    const matchesName = item.respondent_name.toLowerCase().includes(query.toLowerCase());
    const matchesMonthYear = item.date_encoded.toString().substring(0, 7) === monthYear.toString();
    const matchesBarangay = barangayFilter.toString() === '0' || item.address.toString() === barangayFilter;
    
    return matchesName && matchesMonthYear && matchesBarangay;
  })

  function filterArrayByQuery(array, query) {
    if (!query) {
      return [];
    }

    const indiData = array.filter(item => {
      const matchesMonthYear = item.date_encoded.toString().substring(0, 7) === monthYear.toString();
      const data = item?.Q1?.toLowerCase()?.includes(query?.toLowerCase());
      return data && matchesMonthYear
    }); 

    return indiData.length > 0 ? indiData : [];
  }

  const filterIndividualData = filterArrayByQuery(individuals, individualQuery)
  
  return (
    <>
      <Toast ref={toast} />
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
                limit={3}
                headers={individualHeaders} 
                actions={individualActions}
                data={filterIndividualData} 
              />
            </div>
          </div>
        )}
      />
      <CustomDialog
        header={'Archive'}
        resetForm={() => setSelectedData(null)}
        visible={archiveVisible}
        setVisible={setArchiveVisible} 
        footer={footerContent}
        classStyle={'w-[90%] md:w-[80%] lg:w-[60%] max-h-[80%]'}
        content={(
          <p>Are you sure you want to archive this survey form? Once it is archived, it cannot be restored. You will need to contact your system administrator for any concerns.</p>
        )}
      />
      <Header pageName={"Citizen Information"} />
      <div className="content">
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex gap-4 items-center flex-wrap'>
            {
              monthYear !== '' &&
              <div className="form-group w-full md:w-auto">
                <label htmlFor="search">Search</label>
                <input type="search" id='search' placeholder='Search respondent name' value={query} onChange={(e) => setQuery(e.target.value)}/>
              </div>
            }
            <div className="form-group w-full md:w-auto">
              <label htmlFor="month">Month/Year</label>
              <input type="month" id="month" value={monthYear} onChange={(e) => setMonthYear(e.target.value)}/>
            </div>
            {
              loggedUser?.role === 'administrator' &&
              <div className="form-group w-full md:w-auto">
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
            onClick={() => {
              monthYear === '' 
              ? showToast('error', 'Failed', 'Select month and year') 
              : setVisible(true)
            }}
          >
            <IoSearch className='text-lg' />
            <span className='text-sm'>Search Individual</span>
          </button>
        </div>
        <div className='my-6'>
          <CustomTable limit={7} description={'Manage citizen information.'} headers={headers} data={filteredData} actions={actions}/>
        </div>
      </div>
    </>
  )
}

export default CitizenInformation