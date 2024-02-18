import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/client/PageHeader'
import EventProgram from '../../components/client/EventProgram'
import ViewEventsAndProgram from '../../components/client/ViewEventsAndProgram';
import axios from 'axios';
import Divider from '../../components/Divider';

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
            <p className='text-sm text-justify text-gray-500'>              
              Welcome to the <span className='text-[#008056] font-semibold'>Events and Programs</span> page! The Municipality of Magdalena offers a diverse range of cultural, educational, and recreational opportunities. Everyone may find something to enjoy, from exciting festivals honoring our rich heritage to engaging workshops and programs aimed to inspire and educate. Whether you're a resident looking for local activities or a visitor eager to discover our community's lively energy, our carefully curated collection of events and programs is sure to capture your interest and enrich your experience. Stay tuned for regular updates, and join us in celebrating the wide range of activities that make Magdalena an exciting place of activity and interaction.
            </p>
            <Divider />
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