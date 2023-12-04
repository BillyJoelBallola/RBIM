import React from 'react'
import { useParams } from "react-router-dom"
import PageHeader from '../../components/client/PageHeader'
import Announcement from '../../components/client/Announcement'
import ViewAnnouncement from '../../components/client/ViewAnnouncement'

const announcementData = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur',
    date: new Date(),
    link: "/announcements/1"
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur',
    date: new Date(),
    link: "/announcements/2"
  }
]

const Announcements = () => {
  const { id } = useParams();

  return (
    <>
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
              <Announcement announcements={announcementData}/>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Announcements