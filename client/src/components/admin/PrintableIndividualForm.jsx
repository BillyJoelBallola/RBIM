import React, { useRef } from 'react'
import html2canvas from 'html2canvas';
import moment from 'moment'
import jsPDF from 'jspdf';

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { MdOutlineSimCardDownload } from "react-icons/md";

import rbimLogo from '../../assets/RBIM-big-black-logo.png'

const PrintableIndividualForm = ({ preview, setPreview, individual }) => {
  const printableContainer = useRef(null)

  const civilStatus = (ans) => {
    switch(ans){
      case '1':
        return 'Single'
      case '2':
        return 'Married'
      case '3':
        return 'Living-in'
      case '4':
        return 'Widowed'
      case '5':
        return 'Separated'
      case '6':
        return 'Divorced'
      case '7':
        return 'Unknown'
    }
  }

  const occupation = (ans) => {
    switch(ans){
      case '1':
        return 'Refrigeration and Airconditioning'
      case '2':
        return 'Automotive/Heavy Equipment Servicing'
      case '3':
        return 'Metal Worker'
      case '4':
        return 'Building Wiring Installation'
      case '5':
        return 'Heavy Equipment Operation'
      case '6':
        return 'Plumbing'
      case '7':
        return 'Welding'
      case '8':
        return 'Carpentry'
      case '9':
        return 'Baking'
      case '10':
        return 'Dressmaking'
      case '11':
        return 'Linguist'
      case '12':
        return 'Computer Graphics'
      case '13':
        return 'Painting'
      case '14':
        return 'Beauty Care'
      case '15':
        return 'Commercial Cooking'
      case '16':
        return 'Housekeeping'
      case '17':
        return 'Massage Therapy'
    }
  }

  const relationship = (ans) => {
    switch(ans){
      case '1':
        return 'Head'
      case '2':
        return 'Spouse'
      case '3':
        return 'Son'
      case '4':
        return 'Daughter'
      case '5':
        return 'Stepson'
      case '6':
        return 'Stepdaughter'
      case '7':
        return 'Son-in-law'
      case '8':
        return 'Daughter-in-law'
      case '9':
        return 'Grandson'
      case '10':
        return 'Granddaughter'
      case '11':
        return 'Father'
    }
  }

  const downloadPDFForm = async() => {
    if (printableContainer.current) {
      const doc = new jsPDF('p', 'in', 'a4', true);
      const page = printableContainer.current;

      html2canvas(page, { 
        logging: true,
        letterRendering: 1,
        allowTaint: false,
        useCORS: true
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const aspectRatio = canvas.width / canvas.height;
        const imgWidth = doc.internal.pageSize.getWidth();
        const imgHeight = doc.internal.pageSize.getWidth() / aspectRatio;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save(`${individual?.Q1}[${moment(new Date()).format("l")}].pdf`);
      });
    }
  };

  return (
    <div className={`absolute h-auto w-full ${preview ? 'z-[99999] block' : '-z-[99999] hidden'} bg-black/90 p-10 font-semibold text-sm`}>
        <div className='mb-4'>
            <span className='text-xl text-white self-center'>Individual Profile PDF Preview</span>
            <div className='flex items-center justify-between mt-4'>
                <button className='text-2xl text-white' onClick={() => setPreview(false)}><HiOutlineArrowNarrowLeft /></button>
                <button className='text-2xl text-white' onClick={() => downloadPDFForm()}><MdOutlineSimCardDownload /></button>
            </div>
        </div>
        <div className='grid place-items-center mt-10'>
          <div className='h-[1056px] w-[816px] bg-white p-10' ref={printableContainer}>
            <div className='flex items-center justify-center gap-5'>
              <img src={rbimLogo} className='w-16 aspect-square' alt="rbim-logo" />
              <span className='font-bold w-[300px]'>INDIVIDUAL RECORD OF BARANGAY INHABITANT</span>
            </div>
            <div className='mt-10 grid gap-4 text-xs'>
              <div className='border border-x-0 border-t-0 border-b-black w-full pb-2'>
                <span>LOCATION</span>
              </div>
              <div className='grid grid-cols-[1fr_350px] gap-8'>
                <div className='flex gap-4'>
                  <span>PROVINCE:</span>
                  <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.matchAddress?.province}</span>
                </div>
                <div className='flex gap-4'>
                  <span className='whitespace-nowrap'>HOUSEHOLD NUMBER:</span>
                  <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.household_number}</span>                
                </div>
              </div>
              <div className='flex gap-4'>
                <span className='whitespace-nowrap'>CITY / MUNICIPALITY:</span>
                <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.matchAddress?.municipal}</span>
              </div>
              <div className='flex gap-4'>
                <span className='whitespace-nowrap'>BARANGAY</span>
                <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.matchAddress?.barangay}</span>
              </div>
            </div>
            <div className='mt-10 grid gap-4 text-xs'>
              <div className='border border-x-0 border-t-0 border-b-black w-full pb-2'>
                <span>PERSONAL INFORMATION</span>
              </div>
              <div className='grid grid-cols-[1fr_250px] gap-8'>
                <div className='grid gap-4'>
                  <div className='flex gap-4 h-fit'>
                    <span>FIRSTNAME:</span>
                    <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.Q1?.split(",")[0]?.trim()}</span>
                  </div>
                  <div className='flex gap-4 h-fit'>
                    <span>LASTNAME:</span>
                    <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.Q1?.split(",")[1]?.trim()}</span>
                  </div>
                  <div className='flex gap-4 h-fit'>
                    <span>MIDDLENAME:</span>
                    <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.Q1?.split(",")[2]?.trim()}</span>
                  </div>
                </div>
                <div className='flex justify-center'>
                  <div className='w-[100px] border border-black aspect-auto'>
                    {
                      individual?.image ?
                      <img src={`http://res.cloudinary.com/dplelvfxi/image/upload/v1709045429/${individual?.image}`} alt="profile" />
                      : <></>
                    }
                  </div>
                </div>  
              </div>
              <div className='flex gap-4 h-fit'>
                <span>ADDRESS</span>
                <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.matchAddress?.barangay}, {individual?.matchAddress?.municipal}, {individual?.matchAddress?.province}</span>
              </div>
              <div className='grid grid-cols-2 gap-8'>
                <div className='flex gap-4 h-fit'>
                  <span className='whitespace-nowrap'>DATE OF BIRTH</span>
                  <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{moment(individual?.Q5).format("LL")}</span>
                </div>
                <div className='flex gap-4 h-fit'>
                  <span className='whitespace-nowrap'>PLACE OF BIRTH</span>
                  <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{individual?.Q6}</span>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-8'>
                <div className='flex gap-4 h-fit'>
                  <span className='whitespace-nowrap'>SEX</span>
                  <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{Number(individual?.Q3) === 1 ? 'Male' : 'Female'}</span>
                </div>
                <div className='flex gap-4 h-fit'>
                  <span className='whitespace-nowrap'>CIVIL STATUS</span>
                  <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{civilStatus(individual?.Q8)}</span>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-8'>
                <div className='flex gap-4 h-fit'>
                  <span className='whitespace-nowrap'>OCCUPATION</span>
                  <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{occupation(individual?.Q44)}</span>
                </div>
                <div className='flex gap-4 h-fit'>
                  <span className='whitespace-nowrap'>CITIZENSHIP</span>
                  <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{Number(individual?.Q7) === 1 ? 'Filipino' : 'Non-Filipino'}</span>
                </div>
              </div>
              <div className='flex gap-4 h-fit'>
                <span className='whitespace-nowrap'>RELATIONSHIP TO HOUSEHOLD HEAD</span>
                <span className='border border-x-0 border-t-0 border-b-black w-full text-center pb-2'>{relationship(individual?.Q2)}</span>
              </div>
              <div className='border border-x-0 border-b-0 border-t-black w-full mt-8'>
                <span>I hereby certify that the above information are true and correct to the best of my knowledge.</span>
              </div>
              <div className='grid grid-cols-2 gap-20 mt-8'>
                <div className='flex gap-4 h-fit'>
                  <span className='whitespace-nowrap'>Attested by:</span>
                  <div className='w-full text-center grid gap-2'>
                    <span>{individual?.first_visit_supervisor}</span>
                    <div className='border border-x-0 border-b-0 border-t-black w-full'>
                      <span>BARANGAY SECRETARY</span>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 h-fit'>
                  <div className='w-full text-center grid gap-2'>
                    <span className='uppercase'>{individual?.Q1}</span>
                    <div className='border border-x-0 border-b-0 border-t-black w-full'>
                      <span>NAME & SIGNATURE</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-20 mt-8'>
                <div></div>
                <div className='flex justify-center gap-4'>
                  <div className='w-24 aspect-square border border-black'></div>
                  <div className='w-24 aspect-square border border-black'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PrintableIndividualForm