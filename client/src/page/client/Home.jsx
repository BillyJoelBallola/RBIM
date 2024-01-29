import React, { useEffect, useState } from 'react'
import Announcement from '../../components/client/Announcement'
import EventProgram from '../../components/client/EventProgram'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/client/PageHeader'
import axios from 'axios'
import CustomDialog from '../../components/client/CustomDialog'
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
        const info = data?.data?.filter(item => new Date(item.date) > new Date())
        setEventsAndProgramsData(info)
      }
    }

    fetchEventsAndPrograms()
  }, [])


  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/announcements')
      if(data.success){
        const info = data?.data?.filter(item => new Date(item.date) > new Date())
        setAnnouncementData(info)
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
      <PageHeader title={"Municipal of Magdalena"}/>
      <div className='side-margin py-12'>
        <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, perspiciatis.</p>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className='w-full h-fit flex flex-col justify-between'>
            <div className='font-bold text-lg mb-2'>
              <span className='text-gray-500'>EVENTS AND PROGRAMS</span>
            </div>
            <div className='grid gap-4'>
              {
                eventsAndProgramsData &&
                eventsAndProgramsData.length > 0 ?
                <EventProgram eventsAndPrograms={eventsAndProgramsData} display={3}/>
                : <div>No events and programs found.</div>
              }
            </div>
            {
              eventsAndProgramsData &&
              eventsAndProgramsData.length > 0 &&
              <Link to={"/events-and-programs"} className='underline mt-2 text-right text-gray-500 text-sm'>view all</Link>
            }
          </div>
          <div className='md:basis-2/3 h-fit w-full flex flex-col'>
            <div className='font-bold text-lg mb-2'>
              <span className='text-gray-500'>ANNOUNCEMENTS</span>
            </div>
            <div className='grid gap-4'>
              {
                announcementData &&
                announcementData.length > 0 ?
                <Announcement announcements={announcementData} display={3} setSelectedAnnouncement={setSelectedAnnouncement} setVisible={setVisible}/>
                : <div>No announcements found.</div>
              }
            </div>
            {
              announcementData && 
              announcementData.length > 0 &&
              <Link to={"/announcements"} className='underline mt-2 text-right text-gray-500 text-sm'>view all</Link>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home