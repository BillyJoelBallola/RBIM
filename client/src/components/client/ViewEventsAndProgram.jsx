import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Image } from 'primereact/image'
import moment from 'moment'
import axios from 'axios'

const ViewEventsAndProgram = () => {
  const id = useParams().id
  const [eventsAndPrograms, setEventsAndPrograms] = useState({})

  useEffect(() => {
    const fetchEventsAndPrograms = async () => {
      const { data } = await axios.get(`/api/activity/${id}`)
      if(data.success){
        setEventsAndPrograms(data.data)
      }
    }

    fetchEventsAndPrograms()
  }, [])

  return (
    <div>
      <div className='h-[250px] md:h-[350px] bg-gray-300 mb-3 flex items-center justify-center rounded-lg overflow-hidden'>
        <Image 
          className='object-fit object-center' 
          src={eventsAndPrograms?.image && `http://localhost:4000/${eventsAndPrograms.image.slice(1, -1) + eventsAndPrograms.image.slice(-1)}`} 
          alt="Image" 
          preview 
        />
        {/* <img className='object-fit object-center' src={} alt="image" /> */}
      </div>
      <h2 className='font-semibold text-lg'>{eventsAndPrograms.title}</h2>
      <div className='flex flex-col text-gray-600 text-sm mb-6'>
        <span>{eventsAndPrograms.address_barangay} • {moment(eventsAndPrograms.date).format("ll")}</span>
        <span className='text-xs'>{moment(eventsAndPrograms.date_posted).startOf('hour').fromNow()}</span>
      </div>
      <div className='text-sm tiptap' dangerouslySetInnerHTML={{ __html: eventsAndPrograms.content }} />
    </div>
  )
}

export default ViewEventsAndProgram