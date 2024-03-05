import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Image } from 'primereact/image'
import { truncate } from '../../helper/truncate'
import moment from 'moment'
import axios from 'axios'

const ViewEventsAndProgram = () => {
  const id = useParams().id
  const [allEventsAndPrograms, setAllEventsAndPrograms] = useState([])
  const [eventsAndPrograms, setEventsAndPrograms] = useState({})

  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get(`/api/activity/${id}`)
      if(data.success){
        setEventsAndPrograms(data.data)
      }
    }

    fetchEventsAndPrograms()
  }, [id])

  useEffect(() => {
    const fetchAllEventsAndPrograms = async () => {
      const { data } = await axios.get(`/api//activities/events_and_programs`)
      if(data.success){
        const info = data?.data?.filter(item => Number(item.id) !== Number(id))
        setAllEventsAndPrograms(info)
      }
    }

    fetchAllEventsAndPrograms()
  }, [id])

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
''
  return (
    <div className='flex flex-col md:flex-row gap-8 w-full'>
      <div className='w-full'>
        <div className='h-[250px] md:h-[350px] bg-gray-300 mb-3 flex items-center justify-center rounded-lg overflow-hidden'>
          <Image 
            className='object-fit object-center' 
            src={eventsAndPrograms?.image && `http://res.cloudinary.com/dplelvfxi/image/upload/v1709045429/${eventsAndPrograms?.image}`} 
            alt="Image" 
            preview 
          />
        </div>
        <h2 className='font-semibold text-lg'>{eventsAndPrograms.title}</h2>
        <div className='flex flex-col text-gray-600 text-sm mb-6'>
          <span>{type(eventsAndPrograms.type)} • {moment(eventsAndPrograms.date).format("ll")} • {eventsAndPrograms.address_barangay}</span>
          <span className='text-xs'>Posted {moment(eventsAndPrograms.date_posted).startOf('hour').fromNow()}</span>
        </div>
        <div className='text-sm tiptap' dangerouslySetInnerHTML={{ __html: eventsAndPrograms.content }} />
      </div>
        <div className='basis-[40%]'>
          <h2 className='mb-2 font-semibold'>Other events and programs</h2>
          <div className='grid gap-2'>
          {
            allEventsAndPrograms.length > 0 
            ? allEventsAndPrograms && allEventsAndPrograms.slice(0, 5).map(item => (
              <Link to={`/events-and-programs/${item.id}`} className='bg-gray-100 p-2 rounded-lg hover:underline' key={item.id}>
                <span className='text-md font-semibold'>{truncate(item.title, 25)}</span>
                <div className='text-xs text-justify' dangerouslySetInnerHTML={{ __html: truncate(item.content, 100) }} />
                <div className='text-[11px] mt-1'>
                  <span>{item.address_barangay}</span> • 
                  <span> Posted {moment(item.date_posted).startOf('hour').fromNow()}</span>
                </div>
              </Link> 
            )) 
            : <div>No other events and programs found.</div>
          }
          </div>
        </div> 
    </div>
  )
}

export default ViewEventsAndProgram