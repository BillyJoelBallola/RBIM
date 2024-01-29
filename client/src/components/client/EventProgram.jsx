import React from 'react'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'

import { truncate } from '../../helper/truncate'

const EventProgram = ({ eventsAndPrograms, display }) => {
  return (
    <>
      {
        eventsAndPrograms?.length > 0 ?
        eventsAndPrograms.slice(0, display).map((eventProg, idx) => (
          <div className='py-2 bg-white px-4 border rounded-lg h-fit' key={idx}>
            <Link to={`/events-and-programs/${eventProg.id}`}>
              <div className='h-[150px] md:h-[250px] bg-gray-300 mb-3 flex items-center justify-center rounded-lg overflow-hidden'>
                <div className='w-full aspect-ratio'>
                  <img className='object-fit object-center' src={`http://localhost:4000/${eventProg?.image?.slice(1, -1) + eventProg?.image?.slice(-1)}`} alt="image" />
                </div>
              </div>
              <h4 className='font-semibold'>{truncate(eventProg.title, 50)}</h4>
              <div className='text-sm text-gray-500 tiptap' dangerouslySetInnerHTML={{ __html: truncate(eventProg.content, 150) }} />
              <div className='flex items-center text-gray-400 gap-2 text-xs mt-1'>
                <span>{eventProg.address_barangay} • {moment(eventProg.date_posted).startOf('hour').fromNow()}</span>
              </div>
            </Link>
          </div>
        )) :
        <div className='px-4 py-2 bg-white'>No announcement found.</div>
      }
    </>
  )
}

export default EventProgram