import React from 'react'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'

import { truncate } from '../../helper/truncate'

const EventProgram = ({ eventsAndPrograms, display }) => {

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
        eventsAndPrograms?.length > 0 ?
        eventsAndPrograms.slice(0, display).map((eventProg, idx) => (
          <div className='bg-white border rounded-lg h-fit overflow-hidden relative' key={idx}>
            <Link to={`/events-and-programs/${eventProg.id}`}>
              <div className='h-[150px] md:h-[250px] bg-gray-300 mb-3 flex items-center justify-center'>
                <div className='w-full aspect-ratio'>
                  <img 
                    alt="image" 
                    className='object-fit object-center' 
                    src={`http://res.cloudinary.com/dplelvfxi/image/upload/v1709045429/${eventProg?.image}`}
                  />
                </div>
              </div>
              <div className='absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black hover:underline text-white p-2'>
                <h4 className='font-semibold'>{truncate(eventProg.title, 30)}</h4>
                <div className='text-sm tiptap' dangerouslySetInnerHTML={{ __html: truncate(eventProg.content, 70) }} />
                <div className='flex items-center gap-2 text-xs'>
                  <span>{type(eventProg.type)} • {eventProg.address_barangay} • Posted {moment(eventProg.date_posted).startOf('hour').fromNow()}</span>
                </div>
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