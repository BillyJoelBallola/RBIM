import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/admin/Header'
import CustomTable from '../../components/admin/CustomTable'
import { barangay } from '../../static/Geography'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { LiaTrashAlt } from "react-icons/lia";
import { MdOutlineEdit } from "react-icons/md";
import { Toast } from 'primereact/toast'
import CustomDialog from '../../components/admin/CustomDialog'

const headers = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "address_barangay",
    label: "Address",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "type",
    label: "Type",
  }
]

const Activities = () => {
  const year = new Date().getFullYear().toString()
  const month = new Date().getMonth()
  const formattedMonth = month.toString().length === 1 ? "0" + month.toString() : ''
  const toast = useRef(null)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [activities, setActivities] = useState([])
  const [selectedData, setSelectedData] = useState(null)
  const [query, setQuery] = useState('')
  const [type, setType] = useState('1')
  const [monthYear, setMonthYear] = useState(year + "-" + formattedMonth)
  const [barangayFilter, setBarangayFilter] = useState('Municipal')
  const [action, setAction] = useState('')

  useEffect(() => {
    const fetchAllActivities = async () => {
      const { data } = await axios.get("/api/activities")
      if(data.success){
        setActivities(data.data)
      }
    }

    fetchAllActivities()
    setAction('')
  }, [action])

  const showToast = (severity, summary, detail) => {
    return toast.current.show({ severity: severity, summary: summary, detail: detail})
  }

  const actions = [
    { 
      label: <MdOutlineEdit className='text-lg'/>, 
      onClick: ({rowData}) => navigate(`/rbim/activity_form/${rowData.id}`)
    }, 
    { 
      label: <LiaTrashAlt className='text-lg'/>, 
      onClick: ({rowData}) => {
        setVisible(true)
        setSelectedData(rowData)
      }
    }
  ]

  const deleteActivity = async () => {
    if(selectedData){
      const { data } = await axios.delete(`/api/activity/${selectedData?.id}`)
      if(data.success){
        setVisible(false)
        setSelectedData(null)
        setAction('delete')
        return showToast('success', 'Success', data.message)
      }else{
        setVisible(false)
        setSelectedData(null)
        return showToast('error', 'Failed', 'Failed to delete selected activity')
      }
    }else{
      return showToast('error', 'Failed', 'Select activity to delete')
    }
  }

  const filteredData = activities?.filter(item => {
    const matchesName = item.title.toLowerCase().includes(query.toLowerCase());
    const matchesMonthYear = item.date.toString().substring(0, 7) === monthYear.toString();
    const matchesBarangay = item.address_barangay.toString() === barangayFilter;
    const matchesType = item.type === type;
    
    return matchesMonthYear && matchesName && matchesBarangay && matchesType;
  })

  const footerContent = (
    <div className='flex justify-end'>
        <button className='px-6 py-2 rounded-md bg-transparent' onClick={() => setVisible(false)}>No</button>
        <button 
            className='px-6 py-2 rounded-md bg-[#008605] text-white' 
            onClick={() => deleteActivity()}
        >
            Yes
        </button>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <CustomDialog
        header={'Delete'}
        visible={visible}
        setVisible={setVisible} 
        footer={footerContent}
        classStyle={'w-[90%] md:w-[60%] lg:w-[40%]'}
        content={(
            <p>Are you sure you want to delete this activity?</p>
        )}
      />
      <Header pageName={"Activities"} />
      <div className="content">
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex gap-4 items-center flex-wrap'>
            <div className="form-group w-full md:w-auto">
              <label htmlFor="search">Search</label>
              <input type="text" id='search' placeholder='Search by title' value={query} onChange={e => setQuery(e.target.value)}/>
            </div>
            <div className="form-group w-full md:w-auto">
              <label htmlFor="month">Month/Year</label>
              <input type="month" id="month" value={monthYear} onChange={(e) => setMonthYear(e.target.value)}/>
            </div>
            <div className="form-group w-full md:w-auto">
              <label htmlFor="barangay">Location</label>
              <select id="barangay" value={barangayFilter} onChange={(e) => setBarangayFilter(e.target.value)}>
                <option value="Municipal">Municipal</option>
                {
                  barangay?.map((place, idx) => (
                    <option key={idx} value={place}>{place}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group w-full md:w-auto">
              <label htmlFor="type">Type</label>
              <select id="type" value={type} onChange={e => setType(e.target.value)}>
                <option value="1">Events</option>
                <option value="2">Programs</option>
                <option value="3">Announcements</option>
              </select>
            </div>
          </div>
          <Link to={'/rbim/activity_form'} className='self-end rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>ADD NEW</Link>
        </div>
        <div className='my-6'>
          <CustomTable limit={7} description={'Filter, view, add, edit, delete events and programs.'} headers={headers} data={filteredData} actions={actions}/>
        </div>
      </div>
    </>
  )
}

export default Activities