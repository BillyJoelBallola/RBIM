import React from 'react'
import moment from 'moment/moment'
import { Link } from 'react-router-dom'

const Announcement = ({ announcements }) => {
  return (
    <>
      {
        announcements?.length > 0 ?
        announcements.map((ann, idx) => (
          <div key={idx} className='py-2 bg-white px-4 border'>
            <Link to={ann.link}>
              <h4 className='font-semibold'>{ann.title}</h4>
              <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque praesentium fugiat minima cum ab debitis.</p>
              <span className='text-xs text-gray-400'>{moment(ann.date).format("ll")}</span>
            </Link>
          </div>
        )) :
        <div className='px-4 py-2 bg-white'>No announcement found.</div>
      }
    </>
  )
}

export default Announcement