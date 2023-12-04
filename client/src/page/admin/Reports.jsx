import React from 'react'
import Header from '../../components/admin/Header'
import { barangay } from '../../static/Geography'

const reports = [
  {
    name: "Table 1. Total population by sex, age, and migration status",
  },
  {
    name: "Table 2. Distribution of household by households size, sex of households head and migration status",
  },
  {
    name: "Table 3. Total population by age, marital status and migration status",
  },
  {
    name: "Table 4. Total population by marital status, sex, and migration status",
  },
]

const Reports = () => {
  return (
    <>
      <Header pageName={"Reports"} />
      <div className="content">
        <div className='flex gap-4 items-center flex-wrap'>
          <div className="form-group">
            <label htmlFor="search">Search Report</label>
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
          <div className="form-group">
            <label htmlFor="barangay">File Type</label>
            <select id="barangay">
              <option value="">PDF</option>
              <option value="">Excel</option>
            </select>
          </div>
        </div>
        <div className='my-6'>
          <p className='text-gray-400 mb-4'>Select from the tables below that you want to export/download</p>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {
              reports?.map((report, idx) => (
                <button className='bg-gray-100 rounded-md p-4 text-gray-500 text-left border drop-shadow-md' key={idx}>
                  {report.name}
                </button>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports