import React, { Fragment, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'

import Header from '../../components/admin/Header'
import PieMigrant from '../../components/admin/graphs/PieMigrant'
import PieEmployment from '../../components/admin/graphs/PieEmployment'
import PieSeniorCitizen from '../../components/admin/graphs/PieSeniorCitizen'
import LineMigrant from '../../components/admin/graphs/LineMigrant'
import EventAndProgram from '../../components/admin/EventAndProgram'
import Announcement from '../../components/admin/Announcement'

const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033]

const Dashboard = () => {
  const currentDate = new Date()
  const { loggedUser } = useContext(UserContext)
  const [filteredIndividuals, setFilteredIndividuals] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [address, setAddress] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(0)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [yearRange, setYearRange] = useState(5)
  const [activities, setActivities] = useState({
    eventsAndPrograms: [],
    announcements: []
  })

  useEffect(() => {
    const fetchIndividualData = async () => {
      const { data } = await axios.get('/api/individuals')
      if(data.success){
        const response = data?.data?.filter(item => new Date(item.date_encoded).getFullYear() === currentDate.getFullYear())
        setFilteredIndividuals(response)
        setIndividuals(data?.data)
      }
    }

    fetchIndividualData()
  }, [])

  useEffect(() => {
    const fetchAddresses = async () => {
      const { data } = await axios.get('/api/address')
      if(data.success){
        setAddress(data.data)
      }
    }

    if(address.length === 0){
      fetchAddresses()
    }
  }, [address])

  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/events_and_programs')
      if(data.success){
        const info = data?.data?.filter(item => new Date(item.date) > new Date())
        const filteredInfo = loggedUser?.role !== 'administrator' ? info?.filter(item => item.address === loggedUser?.address_id) : info
        setActivities(current => ({...current, eventsAndPrograms: filteredInfo }))
      }
    }

    fetchEventsAndPrograms()
  }, [loggedUser])

  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/announcements')
      if(data.success){
        const info = data?.data?.filter(item => new Date(item.date) > new Date())
        const filteredInfo = loggedUser?.role !== 'administrator' ? info?.filter(item => item.address === loggedUser?.address_id) : info
        setActivities(current => ({...current, announcements: filteredInfo }))
      }
    }

    fetchEventsAndPrograms()
  }, [loggedUser])

  return (
    <>
      <Header pageName={'Dashboard'} />
      <div className='content pb-8'>
        <div className='grid gap-8'>
          <div className='w-full grid gap-8'>
            {/* pie */}
            <div className='shadow-sm rounded-lg p-5 grid gap-4 border'>
              <div className='flex items-center justify-between'>
                <span className='text-xl font-bold'>Population Distribution</span>
                <div className='flex flex-wrap gap-2 items-center'>
                  <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                    {
                      years.map((item, idx) => (
                        <option value={item} key={idx}>{item}</option>
                      ))
                    }
                  </select>
                  <select value={selectedAddress} onChange={e => setSelectedAddress(e.target.value)}>
                    <option value="0">Municipal</option>
                    {
                      address.length > 0 &&
                      address.map(item => (
                        <option value={item.id} key={item.id}>{item.barangay}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className='flex flex-wrap gap-8 justify-center'>
                <PieMigrant data={filteredIndividuals} address={address} selectedAddress={selectedAddress} selectedYear={selectedYear}/>
                <PieEmployment data={filteredIndividuals} address={address} selectedAddress={selectedAddress} selectedYear={selectedYear}/>
                <PieSeniorCitizen data={filteredIndividuals} address={address} selectedAddress={selectedAddress} selectedYear={selectedYear}/>
              </div>
            </div>
            {/* lines */}
            <div className='shadow-sm rounded-lg p-5 grid gap-4 border'>
              <div className='flex items-center justify-between'>
                <span className='text-xl font-bold'>Population Trends</span>
                <select value={yearRange} onChange={e => setYearRange(e.target.value)}>
                  <option value={5}>5 Years</option>
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                </select>
              </div>
              <div className='max-w-[99%]'>
                <LineMigrant yearRange={yearRange} data={individuals} />
              </div>
            </div>
            {/* activities */}
            <div className='grid gap-8'>
              <div className='relative shadow-sm rounded-lg overflow-hidden p-5 grid gap-4 border h-fit'>
                <span className='text-xl font-bold'>Recent Announcements</span>
                <div className='grid gap-4'>
                  {
                    activities &&
                    activities?.announcements?.length > 0 
                    ? activities?.announcements?.slice(0, 2).map(item => (
                      <Fragment key={item.id}>
                        <Announcement title={item.title} content={item.content}/>
                      </Fragment>
                    )) 
                    : <span className='text-gray-500'>No recent announcements</span>
                  }
                  {
                    activities &&
                    activities?.announcements?.length > 2
                    ? <div className='absolute h-32 bottom-0 left-0 right-0 bg-gradient-to-t from-white' />
                    : <></>
                  }
                </div>
              </div>
              <div className='relative shadow-sm rounded-lg p-5 grid gap-4 border h-fit'>
                <span className='text-xl font-bold'>Upcoming Events & Programs</span>
                <div className='grid gap-4'>
                  {
                    activities &&
                    activities?.eventsAndPrograms?.length > 0 
                    ? activities?.eventsAndPrograms?.slice(0, 2).map(item => (
                      <Fragment key={item.id}>
                        <EventAndProgram title={item.title} content={item.content} image={item.image}/>
                      </Fragment>
                    )) 
                    : <span className='text-gray-500'>No upcoming events and programs</span>
                  }
                  {
                    activities &&
                    activities?.eventsAndPrograms?.length > 2 
                    ? <div className='absolute h-32 bottom-0 left-0 right-0 bg-gradient-to-t from-white' />
                    : <></>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard