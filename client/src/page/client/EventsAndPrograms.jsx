import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import EventProgram from '../../components/client/EventProgram'
import ViewEventsAndProgram from '../../components/client/ViewEventsAndProgram';
import moment from 'moment';
import axios from 'axios';

const EventsAndPrograms = () => {
  const { id } = useParams();
  const currentDate = new Date()
  const year = currentDate.getFullYear().toString()
  const month = moment(currentDate).format('l')[0]
  const formattedMonth = month.toString().length === 1 ? "0" + month.toString() : ''
  const [eventsAndProgramsData, setEventsAndProgramsData] = useState([])
  const [upcomingEventsAndProgramsData, setUpcomingEventsAndProgramsData] = useState([])
  const [displayCount, setDisplayCount] = useState(6)
  const [activeTab, setActiveTab] = useState(2)
  const [category, setCategory] = useState(3)
  const [monthYear, setMonthYear] = useState(year + "-" + formattedMonth)
  const [heightClass, setHeightClass] = useState('')

  useEffect(() => {
    const currentDate = new Date()
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/events_and_programs')
      if(data.success){
        const upcoming = data?.data?.filter(item => currentDate <= new Date(item.date))
        setEventsAndProgramsData(data?.data || [])
        setUpcomingEventsAndProgramsData(upcoming || [])
      }
    }

    fetchEventsAndPrograms()
  }, [])
  
  const filteredEventsAndProgramsData = Number(category) === 3
    ? eventsAndProgramsData?.filter(item => item.date.toString().substring(0, 7) === monthYear.toString()) 
    : eventsAndProgramsData?.filter(item => item.date.toString().substring(0, 7) === monthYear.toString() && Number(item.type) === Number(category))
  const filteredUpcomingEventsAndProgramsData = Number(category) === 3 
    ? upcomingEventsAndProgramsData
    : upcomingEventsAndProgramsData?.filter(item => Number(item.type) === Number(category))
  
  useEffect(() => {
    if(activeTab === 1){
      setHeightClass(filteredEventsAndProgramsData?.length <= 2 ? 'h-screen' : 'h-auto') 
    }else if(activeTab === 2){
      setHeightClass(filteredUpcomingEventsAndProgramsData?.length <= 2 ? 'h-screen' : 'h-auto') 
    }
  }, [activeTab])


  return (
    <>
      {
        id ?
        <div className='side-margin'>
          <ViewEventsAndProgram />
        </div> :
        <div className={`side-margin ${heightClass}`}>
          <div className='grid'>
            <p className='text-sm text-justify text-black'>            
              Explore Magdalena's diverse <span className='text-[#008056] font-semibold'>Events and Programs</span>! From cultural festivals to educational workshops, there's something for everyone. Stay tuned for updates and join us in celebrating our vibrant community!  
            </p>
            <div className='w-full h-[1.2px] bg-black my-4'/>
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <div className='flex gap-2'>
                <button className={`border border-black rounded-md py-1 px-4 text-sm ${activeTab === 1 ? 'text-white bg-black' : 'bg-transparent text-black'}`} onClick={() => setActiveTab(1)}>ALL</button>
                <button className={`border border-black rounded-md py-1 px-4 text-sm ${activeTab === 2 ? 'text-white bg-black' : 'bg-transparent text-black'}`} onClick={() => setActiveTab(2)}>UPCOMING</button>
              </div>
              <div className='flex gap-2'>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="1">Events</option>
                  <option value="2">Programs</option>
                  <option value="3">All</option>
                </select>
                {
                  activeTab === 1 &&
                  <input type="month" value={monthYear} onChange={e => setMonthYear(e.target.value)}/>
                }
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-4 mt-4'>
              {
                activeTab === 1 ?
                filteredEventsAndProgramsData?.length > 0 
                ? <EventProgram eventsAndPrograms={filteredEventsAndProgramsData} display={displayCount}/>
                : <div>No events and programs found.</div>
                : <></>
              }
              {
                activeTab === 2 ?
                filteredUpcomingEventsAndProgramsData?.length > 0 
                ? <EventProgram eventsAndPrograms={filteredUpcomingEventsAndProgramsData} display={displayCount}/>
                : <div>No events and programs found.</div>
                : <></>
              }
            </div>
            {
              activeTab === 1 
              ? filteredEventsAndProgramsData?.length > 6  &&
              <button className='text-right underline text-gray-500 text-sm' onClick={() => setDisplayCount(current => current + 6)}>view more</button>
              : <></>
            }
            {
              activeTab === 2
              ? filteredUpcomingEventsAndProgramsData?.length > 6  &&
              <button className='text-right underline text-gray-500 text-sm' onClick={() => setDisplayCount(current => current + 6)}>view more</button>
              : <></>
            }
          </div>
        </div>
      }
    </>
  )
}

export default EventsAndPrograms