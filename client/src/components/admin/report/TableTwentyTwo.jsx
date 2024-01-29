import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableTwentyTwo = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTwentyTwoReport = async () => {
      const { data } = await axios.get(`/api/table_twentyTwo/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTwentyTwoReport()
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
                <th>Family Planning Methods</th>
                <th>Non-Migrants</th>
                <th>Migrants</th>
                <th>Transients</th>
                <th>Overall Total</th>
              </tr>
            </thead>
            <tbody>
              {
                reportData?.map((data, idx) => (
                  <tr key={idx}>
                    <td>{data.FP}</td>
                    <td>{data.nonMigrantWithIntention}</td>
                    <td>{data.migrantWithIntention}</td>
                    <td>{data.transientWithIntention}</td>
                    <td>{data.total}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default TableTwentyTwo