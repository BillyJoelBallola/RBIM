import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/client/PageHeader'
import EventProgram from '../../components/client/EventProgram'
import ViewEventsAndProgram from '../../components/client/ViewEventsAndProgram';
import Divider from '../../components/Divider';
import axios from 'axios';

const EventsAndPrograms = () => {
  const { id } = useParams();
  const [eventsAndProgramsData, setEventsAndProgramsData] = useState([])
  const [upcomingEventsAndProgramsData, setUpcomingEventsAndProgramsData] = useState([])
  const [displayCount, setDisplayCount] = useState(6)
  const [activeTab, setActiveTab] = useState(2)

  useEffect(() => {
    const currentDate = new Date()
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/events_and_programs')
      if(data.success){
        const upcoming = data?.data?.filter(item => currentDate <= new Date(item.date))
        setEventsAndProgramsData(data?.data)
        setUpcomingEventsAndProgramsData(upcoming)
      }
    }

    fetchEventsAndPrograms()
  }, [])

  return (
    <div className='side-margin grid gap-4'>
      {
        id ? <ViewEventsAndProgram /> :
        <div className='grid'>
          <p className='text-sm text-justify text-black'>            
            Explore Magdalena's diverse <span className='text-[#008056] font-semibold'>events and programs</span>! From cultural festivals to educational workshops, there's something for everyone. Stay tuned for updates and join us in celebrating our vibrant community!  
          </p>
          <div className='w-full h-[1.2px] bg-black my-4'/>
          <div className='flex gap-2'>
            <button className={`border border-black rounded-md py-1 px-4 text-sm ${activeTab === 1 ? 'text-white bg-black' : 'bg-transparent text-black'}`} onClick={() => setActiveTab(1)}>ALL</button>
            <button className={`border border-black rounded-md py-1 px-4 text-sm ${activeTab === 2 ? 'text-white bg-black' : 'bg-transparent text-black'}`} onClick={() => setActiveTab(2)}>UPCOMING</button>
          </div>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            {
              activeTab === 1 ?
              eventsAndProgramsData?.length > 0 
              ? <EventProgram eventsAndPrograms={eventsAndProgramsData} display={displayCount}/>
              : <div className='pt-4'>No events and programs found.</div>
              : <></>
            }
            {
              activeTab === 2 ?
              upcomingEventsAndProgramsData?.length > 0 
              ? <EventProgram eventsAndPrograms={upcomingEventsAndProgramsData} display={displayCount}/>
              : <div className='pt-4'>No events and programs found.</div>
              : <></>
            }
          </div>
          {
            activeTab === 1 
            ? eventsAndProgramsData?.length > 6  &&
            <button className='text-right underline text-gray-500 text-sm' onClick={() => setDisplayCount(current => current + 6)}>view more</button>
            : <></>
          }
          {
            activeTab === 2
            ? upcomingEventsAndProgramsData?.length > 6  &&
            <button className='text-right underline text-gray-500 text-sm' onClick={() => setDisplayCount(current => current + 6)}>view more</button>
            : <></>
          }
        </div>
      }
    </div>
  )
}

export default EventsAndPrograms