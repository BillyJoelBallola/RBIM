import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import PageHeader from '../../components/client/PageHeader'
import Announcement from '../../components/client/Announcement'
import ViewAnnouncement from '../../components/client/ViewAnnouncement'
import CustomDialog from '../../components/client/CustomDialog'
import moment from 'moment'
import axios from 'axios'

const Announcements = () => {
  const { id } = useParams();
  const [announcementData, setAnnouncementData] = useState([])
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [visible, setVisible] = useState(false)
  const [displayCount, setDisplayCount] = useState(5)

  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get('/api/activities/announcements')
      if(data.success){
        setAnnouncementData(data.data)
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
      <PageHeader title={"Announcements"} />
      <div className='side-margin py-12 grid gap-4'>
        {
          id ? <ViewAnnouncement /> : 
          <div className='grid gap-4'>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dicta veritatis atque? Nesciunt accusantium, harum maxime minus earum quod adipisci.</p>
            <div className='flex gap-2'>
              <button className='border border-gray-500 rounded-md py-1 px-4 text-sm bg-gray-500 text-white'>ALL</button>
              <button className='border border-gray-500 rounded-md py-1 px-4 text-sm text-gray-600'>RECENT</button>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              {
                announcementData &&
                announcementData.length > 0 ?
                <Announcement 
                  announcements={announcementData} 
                  display={displayCount} 
                  setSelectedAnnouncement={setSelectedAnnouncement}
                  setVisible={setVisible}
                />
                : <div className='pt-4'>No announcement found.</div>
              }
              {
                announcementData &&
                announcementData.length > 5 &&
                <button className='text-right underline text-gray-500 text-sm' onClick={() => setDisplayCount(current => current + 5)}>view more</button>
              }
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Announcements