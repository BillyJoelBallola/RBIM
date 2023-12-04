import React from 'react'
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/client/PageHeader'
import EventProgram from '../../components/client/EventProgram'
import ViewEventsAndProgram from '../../components/client/ViewEventsAndProgram';

const eventsAndProgramsData = [
  {
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    date: new Date(),
    place: "Ibabang Butnong",
    link: "/events-and-programs/1"
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem.',
    date: new Date(),
    place: "Ilayang Butnong",
    link: "/events-and-programs/2"
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur.',
    date: new Date(),
    place: "Alipit",
    link: "/events-and-programs/3"
  },
]

const EventsAndPrograms = () => {
  const { id } = useParams();

  return (
    <>
      <PageHeader title={"Events and Programs"} />
      <div className='side-margin py-12 grid gap-4'>
        {
          id ? <ViewEventsAndProgram /> :
          <div className='grid gap-4'>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dicta veritatis atque? Nesciunt accusantium, harum maxime minus earum quod adipisci.</p>
            <div className='flex gap-2'>
              <button className='border border-gray-500 rounded-md py-1 px-4 text-sm bg-gray-500 text-white'>ALL</button>
              <button className='border border-gray-500 rounded-md py-1 px-4 text-sm text-gray-600'>UPCOMING</button>
            </div>
            <div className='grid md:grid-cols-2 gap-4'>
              <EventProgram eventsAndPrograms={eventsAndProgramsData}/>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default EventsAndPrograms