import React from 'react'
import Announcement from '../../components/client/Announcement'
import EventProgram from '../../components/client/EventProgram'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/client/PageHeader'

const announcementData = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur',
    date: new Date()
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetur',
    date: new Date()
  }
]

const eventsAndProgramsData = [
  {
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    date: new Date(),
    place: "Ibabang Butnong"
  },
]

const Home = () => {
  return (
    <>
      <PageHeader title={"Municipal of Magdalena"}/>
      <div className='side-margin py-12'>
        <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, perspiciatis.</p>
        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className='w-full h-fit flex flex-col justify-between'>
            <div className='font-bold text-lg mb-2'>
              <span className='text-gray-500'>EVENTS AND PROGRAMS</span>
            </div>
            <div className='grid gap-2'>
              <EventProgram eventsAndPrograms={eventsAndProgramsData}/>
            </div>
            {
             eventsAndProgramsData.length > 0 &&
             <Link to={"/events-and-programs"} className='hover:bg-gray-300 duration-150 text-center w-full py-1 bg-gray-200 mt-4 font-semibold text-black/60 text-sm'>VIEW ALL</Link>
            }
          </div>
          <div className='md:basis-2/3 h-fit w-full flex flex-col'>
            <div className='font-bold text-lg mb-2'>
              <span className='text-gray-500'>ANNOUNCEMENTS</span>
            </div>
            <div className='grid gap-2'>
              <Announcement announcements={announcementData}/>
            </div>
            {
              announcementData.length > 0 &&
              <Link to={"/announcements"} className='hover:bg-gray-300 duration-150 text-center w-full py-1 bg-gray-200 mt-4 font-semibold text-black/60 text-sm'>VIEW ALL</Link>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home