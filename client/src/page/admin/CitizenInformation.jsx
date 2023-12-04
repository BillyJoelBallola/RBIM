import React from 'react'
import Header from '../../components/admin/Header'
import { barangay } from '../../static/Geography'
import CustomTable from '../../components/admin/CustomTable'

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
  },
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
  },
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
  },
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
    key: 'name',
    label: "Name",
  },
  {
    key: 'address',
    label: "Address",
  }
]

const CitizenInformation = () => {
  return (
    <>
      <Header pageName={"Citizen Information"} />
      <div className="content">
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex gap-4 items-center flex-wrap'>
            <div className="form-group">
              <label htmlFor="search">Search Citizen</label>
              <input type="text" id='search' placeholder='Type to search'/>
            </div>
            <div className="form-group">
              <label htmlFor="month">Year</label>
              <input type="month" id="month" />
            </div>
            <div className="form-group">
              <label htmlFor="barangay">Baragay</label>
              <select id="barangay">
                <option value="">Municipal</option>
                {
                  barangay?.map((place, idx) => (
                    <option key={idx} value={place}>{place}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <button className='self-end rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>ADD NEW</button>
        </div>
        <div className='my-6'>
          <p className='text-gray-400 mb-4'>Filter, view, add, edit, delete citizen information</p>
          <CustomTable headers={headers} data={data} />
        </div>
      </div>
    </>
  )
}

export default CitizenInformation