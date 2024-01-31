import React from 'react'
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { MdOutlineSimCardDownload } from "react-icons/md";

const PrintableIndividualForm = ({ preview, setPreview }) => {
  return (
    <div className={`absolute h-auto w-full ${preview ? 'z-[99999] block' : '-z-[99999] hidden'} bg-black/90 p-10 font-semibold text-sm`}>
        <div className='mb-4'>
            <span className='text-xl text-white self-center'>Individual Profile PDF Preview</span>
            <div className='flex items-center justify-between mt-4'>
                <button className='text-2xl text-white' onClick={() => setPreview(false)}><HiOutlineArrowNarrowLeft /></button>
                <button className='text-2xl text-white'><MdOutlineSimCardDownload /></button>
            </div>
        </div>
        <div className='grid place-items-center mt-10'>
            <div className='h-[1056px] w-[816px] bg-white'>

            </div>
        </div>
    </div>
  )
}

export default PrintableIndividualForm