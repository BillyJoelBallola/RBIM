import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  const aboutRBIM = "Registry of Barangay Inhabitants and Migrants (RBIM) <br/><br/> The migration phenomenon is changing the landscape of Philippine society and its positive and negative impacts warrant serious consideration. Migration and development have always been interconnected to each other and at the core of economic and social development. <br/><br/> All these movements of people have been influenced by push and pull factors such as inadequate income levels in the area of origin, better jobs available in destination areas, easier mobility due to better communications and transportation infrastructure, and the increasing need for services. The impact of internal migration has always been an area of concern on regional development. The massive movement of rural population to urban areas and vise versa often exposes the local government units' unpreparedness for its effects. <br/><br/> Since migration is an equally significant population process for the local governments' planning, it needs mechanism to gather updated information. <br/><br/>The Commission on Population and Development (POPCOM) supports the tracking of population movement within the country by spearheading the development of the Registry of Barangay Inhabitants and Migrants database or RBIM. The goal of this program is to track internal movements of people from one barangay/municipality to another. <br/><br/> RBIM is a mechanism for tracking internal migration for purposes of development planning and policy formulation. Basic personal information of the respondents or household members together with their socio-economic profile are gathered. <br/><br/> Utilizing RBIM will benefit the users to have an advantage of more and better managed data that will eventually help to plan and provide basic services and facilities like schools, clinics, hospitals, jobs in the given area."

  return (
    <div className='side-margin grid gap-8 text-sm text-justify text-black'>
      <div className='grid gap-4'>
        <h2 className='text-lg font-semibold text-[#008056]'>About Community Hub</h2>
        <div className='grid gap-4'>
          <p>
            Welcome to <span className='text-[#008056] font-semibold'>Magdalena Community Hub</span>, your premier source for discovering the diverse array of <Link to='/events-and-programs' className='underline'>events</Link>, <Link to='/events-and-programs' className='underline'>programs</Link>, and <Link to='/announcements' className='underline'>announcements</Link> within the enchanting Municipality of Magdalena. Nestled in the heart of Laguna boasts a rich tapestry of cultural, educational, and recreational activities that cater to residents and visitors alike. Our mission is to serve as your digital guide, providing a comprehensive platform where you can explore and engage with the vibrant tapestry of our community.
          </p>
          <p>
            At Magdalena Community Hub, we understand the importance of staying connected and informed about the latest happenings in our municipality. Whether you're seeking to immerse yourself in the cultural heritage of Magdalena through lively festivals and exhibitions, participate in enriching educational programs, or stay updated on vital announcements and civic initiatives, our website is your one-stop destination. Our dedicated team works tirelessly to curate and present a diverse range of events and programs that reflect the dynamic spirit of our community.
          </p>
          <p>
            But Magdalena Community Hub is more than just an events calendar – it's a digital platform designed to foster community engagement and connection. We invite you to join us on this journey of exploration and discovery as we celebrate the unique experiences and stories that make Magdalena a vibrant and thriving municipality. Whether you're a long-time resident or a first-time visitor, we hope that Magdalena Community Hub serves as your trusted companion in navigating the rich tapestry of events, programs, and announcements in the Municipality of Magdalena.
          </p>
        </div>
      </div>
      <div className='grid gap-4'>
        <h2 className='text-lg font-semibold text-[#008056]'>About RBIM</h2>
        <div dangerouslySetInnerHTML={{ __html: aboutRBIM }} />
      </div>
    </div>
  )
}

export default About