import React from 'react'
import PageHeader from '../../components/client/PageHeader'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <PageHeader title={"About"} />
      <div className='side-margin py-12 grid gap-4 text-sm text-justify text-gray-500'>
        <p>
          Welcome to <span className='text-[#008056] font-semibold'>Magdalena Community Hub</span>, your premier source for discovering the diverse array of <Link to='/events-and-programs' className='underline'>events</Link>, <Link to='/events-and-programs' className='underline'>programs</Link>, and <Link to='/announcements' className='underline'>announcements</Link> within the enchanting Municipality of Magdalena. Nestled in the heart of Laguna boasts a rich tapestry of cultural, educational, and recreational activities that cater to residents and visitors alike. Our mission is to serve as your digital guide, providing a comprehensive platform where you can explore and engage with the vibrant tapestry of our community.
        </p>
        <p>
          At Magdalena Community Hub, we understand the importance of staying connected and informed about the latest happenings in our municipality. Whether you're seeking to immerse yourself in the cultural heritage of Magdalena through lively festivals and exhibitions, participate in enriching educational programs, or stay updated on vital announcements and civic initiatives, our website is your one-stop destination. Our dedicated team works tirelessly to curate and present a diverse range of events and programs that reflect the dynamic spirit of our community.
        </p>
        <p>
          But Magdalena Community Hub is more than just an events calendar – it's a digital platform designed to foster community engagement and connection. We invite you to join us on this journey of exploration and discovery as we celebrate the unique experiences and stories that make Magdalena a vibrant and thriving municipality. Whether you're a long-time resident or a first-time visitor, we hope that Magdalena Community Hub serves as your trusted companion in navigating the rich tapestry of events, programs, and announcements in the Municipality of Magdalena.
        </p>
        <p className='text-[#008056] text-lg md:text-xl mt-2'>
          <span className='italic'>Welcome aboard, and let the adventure begin! </span>
          😄🎉
        </p>
      </div>
    </>
  )
}

export default About