import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import PageHeader from '../../components/client/PageHeader'
import Announcement from '../../components/client/Announcement'
import ViewAnnouncement from '../../components/client/ViewAnnouncement'
import CustomDialog from '../../components/client/CustomDialog'
import moment from 'moment'
import axios from 'axios'
import Divider from '../../components/Divider'

const Announcements = () => {
  const { id } = useParams();
  const [announcementData, setAnnouncementData] = useState([])
  const [recentAnnouncementData, setRecentAnnouncementData] = useState([])
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [visible, setVisible] = useState(false)
  const [displayCount, setDisplayCount] = useState(6)
  const [activeTab, setActiveTab] = useState(2)

  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/announcements')
      if(data.success){
        const recent = data.data.filter(item => new Date() < new Date(item.date))
        setAnnouncementData(data.data)
        setRecentAnnouncementData(recent)
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
              <span>{selectedAnnouncement?.address_barangay} • {moment(selectedAnnouncement?.date).format("ll")}</span><br />
              <span className='text-xs'>Posted {moment(selectedAnnouncement?.date_posted).startOf('hour').fromNow()}</span>
            </div>
            <div className='text-sm tiptap' dangerouslySetInnerHTML={{ __html: selectedAnnouncement?.content }} />
          </div>
        )}
      />
      <PageHeader title={"Announcements"} />
      <div className='side-margin py-12 grid gap-4'>
        {
          id ? <ViewAnnouncement /> : 
          <div className='grid gap-4'>
            <p className='text-sm text-justify text-gray-600'>
              Welcome to the <span className='text-[#008056] font-semibold'>Announcements</span> page! Here you will discover the most recent updates, news, and relevant announcements about events, programs, and initiatives in the Municipality of Magdalena. From upcoming festivals and community events to important municipal announcements and project updates, this page is your one-stop shop for staying informed and connected to the lifeblood of our thriving town. Check back periodically for the most latest news, and join us in enjoying the various tapestry of experiences that make Magdalena a really unique place to live and visit.
            </p>
            <Divider />
            <div className='flex gap-2'>
            <button className={`border border-gray-500 rounded-md py-1 px-4 text-sm ${activeTab === 1 ? 'text-white bg-gray-500' : 'bg-transparent text-gray-500'}`} onClick={() => setActiveTab(1)}>ALL</button>
              <button className={`border border-gray-500 rounded-md py-1 px-4 text-sm ${activeTab === 2 ? 'text-white bg-gray-500' : 'bg-transparent text-gray-500'}`} onClick={() => setActiveTab(2)}>RECENT</button>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {
                activeTab === 1 ?
                announcementData?.length > 0 
                ? <Announcement 
                  announcements={announcementData} 
                  display={displayCount} 
                  setSelectedAnnouncement={setSelectedAnnouncement}
                  setVisible={setVisible}
                />
                : <div className='pt-4'>No announcement found.</div>
                : <></>
              }
              {
                activeTab === 2 ?
                recentAnnouncementData?.length > 0 
                ? <Announcement 
                  announcements={recentAnnouncementData} 
                  display={displayCount} 
                  setSelectedAnnouncement={setSelectedAnnouncement}
                  setVisible={setVisible}
                />
                : <div className='pt-4'>No recent announcement found.</div>
                : <></>
              }
              {
                activeTab === 1
                ? announcementData?.length > 6 &&
                <button className='text-right underline text-gray-500 text-sm' onClick={() => setDisplayCount(current => current + 6)}>view more</button>
                : <></>
              }
              {
                activeTab === 2
                ? recentAnnouncementData?.length > 6 &&
                <button className='text-right underline text-gray-500 text-sm' onClick={() => setDisplayCount(current => current + 6)}>view more</button>
                : <></>
              }
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Announcements