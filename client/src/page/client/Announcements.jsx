import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Announcement from '../../components/client/Announcement'
import ViewAnnouncement from '../../components/client/ViewAnnouncement'
import CustomDialog from '../../components/client/CustomDialog'
import moment from 'moment'
import axios from 'axios'

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
        const recent = data?.data?.filter(item => new Date() < new Date(item.date))
        setAnnouncementData(data.data || [])
        setRecentAnnouncementData(recent || [])
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
            <h2 className='font-semibold text-lg text-black'>{selectedAnnouncement?.title}</h2>
            <div className='text-black text-sm mb-6'>
              <span>{selectedAnnouncement?.address_barangay} • {moment(selectedAnnouncement?.date).format("ll")}</span><br />
              <span className='text-xs'>Posted {moment(selectedAnnouncement?.date_posted).startOf('hour').fromNow()}</span>
            </div>
            <div className='text-sm tiptap text-black' dangerouslySetInnerHTML={{ __html: selectedAnnouncement?.content }} />
          </div>
        )}
      />
      <div className={`side-margin ${announcementData?.length <= 3 || recentAnnouncementData?.length <= 3 ? 'h-screen' : 'h-auto'}`}>
        {
          id ? <ViewAnnouncement /> : 
          <div className='grid'>
            <p className='text-sm text-justify text-black'>
              Welcome to our <span className='text-[#008056] font-semibold'>Announcements</span> page! Discover the latest updates on events, programs, and initiatives in Magdalena. From festivals to municipal news, stay informed and connected. Check back for the latest updates and be part of our vibrant community!
            </p>
            <div className='w-full h-[1.2px] bg-black my-4'/>
            <div className='flex gap-2'>
            <button className={`border border-black rounded-md py-1 px-4 text-sm ${activeTab === 1 ? 'text-white bg-black' : 'bg-transparent text-black'}`} onClick={() => setActiveTab(1)}>ALL</button>
              <button className={`border border-black rounded-md py-1 px-4 text-sm ${activeTab === 2 ? 'text-white bg-black' : 'bg-transparent text-black'}`} onClick={() => setActiveTab(2)}>RECENT</button>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
              {
                activeTab === 1 ?
                announcementData?.length > 0 
                ? <Announcement 
                  announcements={announcementData} 
                  display={displayCount} 
                  setSelectedAnnouncement={setSelectedAnnouncement}
                  setVisible={setVisible}
                />
                : <div>No announcement found.</div>
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
                : <div>No recent announcement found.</div>
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