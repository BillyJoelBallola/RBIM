import React, { useContext, useState } from 'react'
import RBIMWhiteLogo from '../../assets/RBIM-logo-white.png'
import POPCOMWhiteLogo from '../../assets/popcom-logo-white.png'
import { NavigationContext } from '../../context/NavigationContext'
import { operationLinks, moreLinks } from '../../static/NavLinks'
import { IoCloseSharp } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom'
import CustomDialog from './CustomDialog'
import axios from 'axios'

const MobileNavbar = () => {
  const navigate = useNavigate()
  const { toggleNav, isNavigateOpen } = useContext(NavigationContext)
  const [visible, setVisible] = useState(false);
  const [dialogData, setDialogData] = useState({
    header: '',
    content: ''
  })

  const setDialogContent = (idx) => {
      switch (idx) {
        case 0:
          return setDialogData({
            header: 'About RBIM',
            content: "Registry of Barangay Inhabitants and Migrants (RBIM) <br/> The migration phenomenon is changing the landscape of Philippine society and its positive and negative impacts warrant serious consideration. Migration and development have always been interconnected to each other and at the core of economic and social development. <br/> All these movements of people have been influenced by push and pull factors such as inadequate income levels in the area of origin, better jobs available in destination areas, easier mobility due to better communications and transportation infrastructure, and the increasing need for services. The impact of internal migration has always been an area of concern on regional development. The massive movement of rural population to urban areas and vise versa often exposes the local government units' unpreparedness for its effects. <br/> Since migration is an equally significant population process for the local governments' planning, it needs mechanism to gather updated information. <br/>The Commission on Population and Development (POPCOM) supports the tracking of population movement within the country by spearheading the development of the Registry of Barangay Inhabitants and Migrants database or RBIM. The goal of this program is to track internal movements of people from one barangay/municipality to another. <br/> RBIM is a mechanism for tracking internal migration for purposes of development planning and policy formulation. Basic personal information of the respondents or household members together with their socio-economic profile are gathered. <br/> Utilizing RBIM will benefit the users to have an advantage of more and better managed data that will eventually help to plan and provide basic services and facilities like schools, clinics, hospitals, jobs in the given area."
          });
        case 1:
          return setDialogData({
            header: 'Frequently Ask Questions',
            content: "What is this RBIM database? <br/> Registry of Barangay Inhabitants and Migrants or RBIM is an offline database developed by the Commission on Population and Development(POPCOM) as a system to monitor the movement of people to and from a locality. <br/> <br/>What are the legal bases for this RBIM? <br/> 1. Urban Development and Housing Act or RA 7279 <br/> - UDHA Law, mandates local government units (LGUs) in collaboration with relevant agencies such as POPCOM, NEDA, NSO (PSA), etc. to set up an effective mechanism to monitor movements of the population, from rural to urban, urban to urban and urban to rural areas. <br/>2. Local Government Code of 1991, Section 394 (d) (6,7), Chapter V <br/> -The Barangay Secretary is mandated to (6) Keep an updated record of all inhabitants of the barangay containing the following items of information: name, address, place and date of birth, sex, civil status, citizenship, occupation and such other items of information as may be prescribed by law or ordinance; and (7) Submit a report on the actual number of barangay residents as often as may be required by the Sangguniang Barangay (Appendix 1.2). <br/> 3. The Department of Interior and Local Government (DILG) Memorandum Circular No. 2005-69 for All Provincial Governors, City/Municipal Mayors, Punong Barangays, DILG Regional Directors, Field Operations Officers and Others Concerned <br/> -provides the instructions and forms that will be used for updating the records of inhabitants or RBI. <br/> What are the benefits of having this database? <br/> 1. Availability of a reliable and verifiable database of its inhabitant's demographic characteristics, le. total population, age distribution, education, employment, health, etc. that can be regularly updated. <br/> 2. It will serve as the baseline information of migrants in the barangays that monitors the movement of people. <br/>3. It will help create and develop evidence-based and responsive policies and programs in the locality:<br/> 4. It can be used during health and other humanitarian emergencies as the basis for the provision of support, relief assistance, contact tracing and others. <br/> Who can use this database and how much does it cost? <br/> This database is intended for any Local Government Unit at the barangay and municipal levels at no cost. <br/>How to avail this database?<br/>Local Government Units can request technical assistance from POPCOM thru its Regional Offices in the country. The technical assistance will be through the provision of Resource Speakers/Facilitators during the RBIM orientation and training. <br/> What are the resources or requirements needed?<br/> 1. Commitment of the local officials to oversee and manage this program or activity. They can formulate policies to support its implementation and sustainability.<br/> 2. Human resources to act as enumerators depending on the number of existing barangay population, supervisors and encoders. The LGU may utilize existing barangay volunteers to conduct the enumeration, and the supervisor or encoder can be the barangay officials such as the Barangay Secretary, Kagawad, etc.<br/> 3. Supplies and materials for the conduct of:<br/> a. Data collection<br/> - reproduction of the RBIM questionnaire,<br/> - pencil, ballpen, plastic envelope, clip chart, eraser, ruler,<br/> - barangay ID,<br/> - other collaterals for the enumerators<br/> b. Data storing and processing<br/> - Computer with the minimum specifications:<br/> Operating System: Windows 10 or higher<br/> Processor: 1 gigahertz (GHz) or faster processor<br/> Storage: 500Gb HDD or 500Gb SSD or higher<br/> RAM: 4Gb or higher<br/>  Monitor Display: 21 <br/> What are the features of the database? <br/>1. Home Page or the landing page<br/>This is the main page where you will see the overall look of the database including the following.<br/>-Welcome<br/>• RBIM Logo<br/>- Menu<br/>- Records Today. Showing the total number of records of Individuals and households encoded today.<br/>2. Side Menu contents:<br/>- Total Records in Database. Showing the number of records of individuals and households encoded in the database.<br/>a. About RBIM. This will show the background of the program.<br/>b. Add New data. This will be the encoding part of the new data from the RBIM tool or questionnaire.<br/>c. Search. This will be your search engine if you are looking for a specific person, address or report and it will load. If you open the encoded RBIM Tool you can also do the editing if needed.<br/> d. Reports. This will show a list of the 42 available tables that can be generated based on the encoded records and information of the individuals and households.<br/> e. Individual Profile. This will be used for generating the Bio-Data of a resident.<br/> f. Settings. This will have the following functions:<br/> - Location lock enables users to set the location for a specific province, city/ municipality and barangay.<br/> - Import enables users to import an excel database into the RBIM system.<br/> - Export enables users to extract the encoded information from the database Into a text file (spreadsheet).<br/> • Back-up enables admins to create a copy of data that can be used for recovery In the event of a primary data failure.<br/> - Restore enables admins to restore data to the application using a backup file.<br/> - Locations enable admins to add, update, or remove regions, provinces, city/municipalities and barangay data<br/> • Responses enable admins to add or update avallable responses for each question<br/> -User management enables admins to control user access and onboard and off-board users to and from IT resources<br/> - Account shows information of the user of the account such as name, position, and office. <br/> g. Logout. This will close the application. <br/> How to do simple troubleshooting? <br/> 1. Error message on loading the application or module <br/> - Restart the application 2. No counts on records Today and Total Records in the Database <br/> - Update the Location Lock based on the records encoded. <br/> 3. No counts on reports genereated <br/> - Update the Location Lock based on the records encoded. <br/> 4. If any of the errors encountered still persist, pls contact our POPCOM Regional office for assistance."
          });
      } 
  }

  const logout = () => {
    axios.post('/api/logout');
    navigate("/login")
  }

  return (
    <>
      <CustomDialog visible={visible} setVisible={setVisible} header={dialogData.header} content={dialogData.content}/>
      <nav className={`block md:hidden fixed navbar top-0 bottom-0 z-50 ${isNavigateOpen ? 'right-0 left-0' : '-left-[1000px]'} duration-150 drop-shadow-2xl`}>
        <div className='p-4 flex items-center justify-between'>
          <img src={RBIMWhiteLogo} alt="rbim-logo" className='w-[190px] aspect-auto'/>
          <button onClick={toggleNav}><IoCloseSharp className='text-white text-2xl'/></button>
        </div>
        <ul className=''>
          <div className='px-4 font-bold text-white mt-6 mb-4'>Operations</div>
          {
            operationLinks?.map((link, idx) => (
              <li key={idx}>
                {
                  link.path ?  
                  <NavLink onClick={toggleNav} to={link.path} className="text-sm flex gap-2 items-center text-white duration-150 bg-transparent py-2 px-6 hover:bg-[#004303]">
                    {link.icon}
                    {link.label}
                  </NavLink>
                  :
                  <button onClick={toggleNav} className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6">
                    {link.icon}
                    {link.label}
                  </button>
                }
              </li>
            ))
          }
          <div className='px-4 font-bold text-white mt-8 mb-4'>More</div>
            {
              moreLinks?.map((link, idx) => (
                <li key={idx}>
                  <button 
                    onClick={link.label === 'Logout' ? () => logout() : () => {
                      setVisible(current => !current)
                      setDialogContent(idx);
                      toggleNav()
                    }} 
                    className="w-full text-sm flex gap-2 items-center text-white hover:bg-[#004303] duration-150 py-2 px-6">
                    {link.icon}
                    {link.label}
                  </button>
                </li>
              ))
            }
        </ul>
        <div className='grid place-items-center py-4 absolute bottom-0 w-full'>
          <img src={POPCOMWhiteLogo} alt="rbim-logo" className='w-[150px] aspect-auto'/>
        </div>
      </nav>
    </>
  )
}

export default MobileNavbar