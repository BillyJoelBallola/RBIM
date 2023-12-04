import React from 'react'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'

const EventProgram = ({ eventsAndPrograms }) => {
  return (
    <>
      {
        eventsAndPrograms?.length > 0 ?
        eventsAndPrograms.map((eventProg, idx) => (
          <div className='py-2 bg-white px-4 border' key={idx}>
            <Link to={eventProg.link}>
              <h4 className='font-semibold'>{eventProg.title}</h4>
              <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium fugiat minima cum ab debitis.</p>
              <div className='flex items-center text-gray-400 gap-2 text-xs mt-1'>
                <span>{eventProg.place} • {moment(eventProg.date).format("ll")}</span>
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