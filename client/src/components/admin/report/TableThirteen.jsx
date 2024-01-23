import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableThirteen = ({ location, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThirteenReport = async () => {
      const { data } = await axios.get('/api/table_thirteen')
      if(data.success){
        setReportData(data.data)
      }
    }

    if(reportDetails){
      fetchTableThirteenReport()
    }
  }, [reportDetails])

  return (
    <div className={`bg-white py-8 ${orientation}`}>
      <div className='text-sm grid gap-2 place-items-center mb-4'>
          <img src={logo} className='w-24 aspect-square' alt="rbim_logo" />
          <div className='grid text-center'>
            <span className='font-semibold'>Ibabang butnong [{moment(new Date()).format('l')}]</span>
            <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
          </div>
      </div>
      <div className='grid place-items-center'>
          <table className='report_table'>
            <thead>
              <tr>
                <th>Place of Delivery</th>
                <th>Male</th>
                <th>Female</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                reportData?.map((data, idx) => (
                  <tr key={idx}>
                    <td>{data.delivery}</td>
                    <td>{data.male}</td>
                    <td>{data.female}</td>
                    <td>{data.total}</td>
                  </tr>
                ))
              }
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default TableThirteen