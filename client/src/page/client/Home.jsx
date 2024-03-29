import React, { useEffect, useState } from 'react'
import Announcement from '../../components/client/Announcement'
import EventProgram from '../../components/client/EventProgram'
import CustomDialog from '../../components/client/CustomDialog'
import HomeBanner from '../../assets/home-banner.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const Home = () => {
  const [eventsAndProgramsData, setEventsAndProgramsData] = useState([])
  const [announcementData, setAnnouncementData] = useState([])
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/events_and_programs')
      if(data.success){
        const info = data?.data?.filter(item => new Date() <= new Date(item.date))
        setEventsAndProgramsData(info || [])
      }
    }

    fetchEventsAndPrograms()
  }, [])


  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/announcements')
      if(data.success){
        const info = data?.data?.filter(item => new Date() <= new Date(item.date))
        setAnnouncementData(info || [])
      }
    }

    fetchEventsAndPrograms()
  }, [])

  const resetForm = () => {
    setSelectedAnnouncement(null)
  }

  return (
    <>
      <CustomDialog
        header={'Announcement'}
        resetForm={resetForm}
        visible={visible}
        setVisible={setVisible} 
        classStyle={'w-[90%] md:w-[80%] lg:w-[60%]'}
        content={(
          <div>
            <h2 className='font-semibold text-lg'>{selectedAnnouncement?.title}</h2>
            <div className='text-gray-600 text-sm mb-6'>
              <span>{selectedAnnouncement?.address_barangay} • {moment(selectedAnnouncement?.date).format("ll")}</span>
            </div>
            <div className='text-sm tiptap' dangerouslySetInnerHTML={{ __html: selectedAnnouncement?.content }} />
          </div>
        )}
      />
      <div className='side-margin h-auto'>
        <div className='relative mb-8'>
          <div className='overflow-hidden rounded-2xl md:h-[300px]'>
            <img src={HomeBanner} alt="banner" className='object-cover'/>
          </div>
          <div className='absolute text-center text-white grid md:gap-2 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'>
            <span className='text-lg md:text-3xl leading-5 md:leading-9 font-bold'>Discover • Engage • <span className='whitespace-nowrap'>Stay Informed</span></span>
            <span className='text-xs leading-3 md:text-[.9rem]'>Your source for Events, Programs, and Announcements</span>
          </div>
        </div>
        <div className="grid mt-4">
          <div className='w-full h-fit flex flex-col justify-between'>
            <div className='font-bold text-xl'>  
              <span>EVENTS AND PROGRAMS</span>
            </div>
            <div className='w-full h-[1.2px] bg-black my-4'/>
            <div className='grid md:grid-cols-2 gap-4'>
              {
                eventsAndProgramsData &&
                eventsAndProgramsData.length > 0 ?
                <EventProgram eventsAndPrograms={eventsAndProgramsData} display={3}/>
                : <div>No upcoming events and programs found.</div>
              }
          </div>
          {
            eventsAndProgramsData &&
            eventsAndProgramsData.length > 4 &&
            <Link to={"/events-and-programs"} className='underline mt-2 text-right text-gray-500 text-sm'>view all</Link>
          }
        </div>
          <div className='mt-8'>
            <div className='font-bold text-xl'>  
              <span>ANNOUNCEMENTS</span>
            </div>
            <div className='w-full h-[1.2px] bg-black my-4'/>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {
                announcementData &&
                announcementData?.length > 0 ?
                <Announcement announcements={announcementData} display={3} setSelectedAnnouncement={setSelectedAnnouncement} setVisible={setVisible}/>
                : <div>No recent announcements found.</div>
              }
            </div>
            {
              announcementData && 
              announcementData?.length > 3 &&
              <Link to={"/announcements"} className='underline mt-2 text-right text-gray-500 text-sm'>view all</Link>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home