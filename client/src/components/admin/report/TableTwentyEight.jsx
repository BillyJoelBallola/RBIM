import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableTwentyEight = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTwentyEightReport = async () => {
      const { data } = await axios.get(`/api/table_twentyEight/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTwentyEightReport()
  }, [])

  return (
    <div className={`bg-white py-8 ${orientation}`}>
      <div className='text-sm grid gap-2 place-items-center mb-4'>
          <img src={logo} className='w-24 aspect-square' alt="rbim_logo" />
          <div className='grid text-center'>
            <span className='font-semibold'>{Number(address) !== 0 ? addresses?.find(item => item.id === Number(address))?.barangay : 'Municipal'} [{moment(dateFrom).format('LL')} - {moment(dateTo).format('LL')}]</span>
            <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
          </div>
      </div>
      <div className='grid place-items-center'>
          <table className='report_table'>
            <thead>
              <tr>
                <th>Cause of Death</th>
                <th>Number of Female Mortality</th>
              </tr>
            </thead>
            <tbody>
              {
                reportData?.map((data, idx) => (
                  <tr key={idx}>
                    <td>{data.cause}</td>
                    <td>{data.mortality}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default TableTwentyEight