import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/client/PageHeader'
import EventProgram from '../../components/client/EventProgram'
import ViewEventsAndProgram from '../../components/client/ViewEventsAndProgram';
import axios from 'axios';

const EventsAndPrograms = () => {
  const { id } = useParams();
  const [eventsAndProgramsData, setEventsAndProgramsData] = useState([])
  const [upcomingEventsAndProgramsData, setUpcomingEventsAndProgramsData] = useState([])
  const [displayCount, setDisplayCount] = useState(6)
  const [activeTab, setActiveTab] = useState(2)

  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/events_and_programs')
      if(data.success){
        const upcoming = data?.data?.filter(item => new Date() < new Date(item.date))
        setEventsAndProgramsData(data.data)
        setUpcomingEventsAndProgramsData(upcoming)
      }
    }

    fetchEventsAndPrograms()
  }, [])

  return (
    <>
      <PageHeader title={"Events and Programs"} />
      <div className='side-margin py-12 grid gap-4'>
        {
          id ? <ViewEventsAndProgram /> :
          <div className='grid gap-4'>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dicta veritatis atque? Nesciunt accusantium, harum maxime minus earum quod adipisci.</p>
            <div className='flex gap-2'>
              <button className={`border border-gray-500 rounded-md py-1 px-4 text-sm ${activeTab === 1 ? 'text-white bg-gray-500' : 'bg-transparent text-gray-500'}`} onClick={() => setActiveTab(1)}>ALL</button>
              <button className={`border border-gray-500 rounded-md py-1 px-4 text-sm ${activeTab === 2 ? 'text-white bg-gray-500' : 'bg-transparent text-gray-500'}`} onClick={() => setActiveTab(2)}>UPCOMING</button>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
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
    </>
  )
}

export default EventsAndPrograms