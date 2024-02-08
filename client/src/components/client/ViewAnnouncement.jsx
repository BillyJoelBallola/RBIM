import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ViewAnnouncement = () => {
  const id = useParams().id
  const [annoucement, setAnnouncement] = useState({})

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data } = await axios.get(`/api/activity/${id}`)
      if(data.success){
        setAnnouncement(data.data)
      }
    }

    fetchAnnouncement()
  }, [])

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
    <div>
      <h2 className='font-semibold text-lg'>{annoucement.title}</h2>
      <div className='flex flex-col text-gray-600 text-sm mb-6'>
        <span>{annoucement.address_barangay} • {moment(annoucement.date).format("ll")} • {type(annoucement.type)}</span>
        <span className='text-xs'>{moment(annoucement.date_posted).startOf('hour').fromNow()}</span>
      </div>
      <div className='text-sm tiptap' dangerouslySetInnerHTML={{ __html: annoucement.content }} />
    </div>
  )
}

export default ViewAnnouncement