import React from 'react'
import moment from 'moment/moment'

import { truncate } from '../../helper/truncate'

const Announcement = ({ announcements, display, setSelectedAnnouncement, setVisible}) => {

  const type = (data) => {
    let returnType = ''
    const type = Number(data)
    if(type === 1){
      returnType = 'Event'
    }else if(type === 2){
      returnType = 'Program'
    }else if(type === 3){
      returnType = 'Announcement'
    }

    return returnType
  }

  return (
    <>
      {
        announcements?.length > 0 ?
        announcements.slice(0, display).map((announcement, idx) => (
          <div key={idx} className='py-2 bg-white px-4 border border-gray-300 rounded-lg h-fit'>
            <button 
              className='text-left'
              onClick={() => {
                setSelectedAnnouncement(announcement)
                setVisible(true)
              }}
            >
              <h4 className='font-semibold'>{truncate(announcement.title, 50)}</h4>
              <div className='text-sm tiptap' dangerouslySetInnerHTML={{ __html: truncate(announcement.content, 100) }} />
              <div className='flex items-center text-gray-500 gap-2 text-xs mt-1'>
                <span>{type(announcement.type)} • {announcement.address_barangay} • Posted {moment(announcement.date_posted).startOf('hour').fromNow()}</span>
              </div>
            </button>
          </div>
        )) :
        <div className='px-4 py-2 bg-white'>No announcement found.</div>
      }
    </>
  )
}

export default Announcement