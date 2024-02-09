import React from 'react'
import { truncate } from '../../helper/truncate'

const EventAndProgram = ({ title, content, image }) => {
    return (
        <div className='flex flex-col md:flex-row gap-4'>
            <div className='bg-gray-200 rounded-lg w-full h-[150px] md:h-[100px] md:min-w-[120px] md:max-w-[150px] overflow-hidden'>
                <img src={`http://localhost:4000/${image?.slice(1, -1) + image?.slice(-1)}`} alt="image" className='object-fill object-center'/>
            </div>
            <div>
                <span className='text-lg font-semibold'>{truncate(title, 30)}</span>
                <div className='text-sm' dangerouslySetInnerHTML={{ __html: truncate(content, 200) }} />
            </div>
        </div>
    )
}

export default EventAndProgram