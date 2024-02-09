import React from 'react'
import { truncate } from '../../helper/truncate'

const Announcement = ({ title, content }) => {
    return (
        <div>
            <span className='text-lg font-semibold'>{truncate(title, 40)}</span>
            <div className='text-sm' dangerouslySetInnerHTML={{ __html: truncate(content, 200) }} />
        </div>
    )
}

export default Announcement