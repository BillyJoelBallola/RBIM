import React from 'react'
import Header from '../../components/admin/Header'
import CustomTable from '../../components/admin/CustomTable'
import { barangay } from '../../static/Geography'

const data = [
  {
    name: "Lorem ipsum dolor sit",
    address: "Lorem ipsum dolor sit amet consectetur adipisicing"
  },
  {
    name: "Lorem ipsum dolor sit",
    address: "Lorem ipsum dolor sit amet consectetur adipisicing"
  },
  {
    name: "Lorem ipsum dolor sit",
    address: "Lorem ipsum dolor sit amet consectetur adipisicing"
  }
]

const headers = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "address",
    label: "Address",
  },
]

const Activities = () => {
  return (
    <>
      <Header pageName={"Activities"} />
      <div className="content">
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex gap-4 items-center flex-wrap'>
            <div className="form-group">
              <label htmlFor="search">Search</label>
              <input type="text" id='search' placeholder='Type to search'/>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" />
            </div>
            <div className="form-group">
              <label htmlFor="barangay">Location</label>
              <select id="barangay">
                <option value="">Municipal</option>
                {
                  barangay?.map((place, idx) => (
                    <option key={idx} value={place}>{place}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select id="type">
                <option value="">Events</option>
                <option value="">Programs</option>
                <option value="">Announcements</option>
              </select>
            </div>
          </div>
          <button className='self-end rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>ADD NEW</button>
        </div>
        <div className='my-6'>
          <p className='text-gray-400 mb-4'>Filter, view, add, edit, delete events and programs</p>
          <CustomTable headers={headers} data={data} />
        </div>
      </div>
    </>
  )
}

export default Activities