import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableFour = ({ location, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const TableFourReport = async () => {
      const { data } = await axios.get('/api/table_four')
      if(data.success){
        setReportData(data.data)
      }
    }

    TableFourReport()
  }, [])

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
                <th className='w-16'>Marital Status</th>
                <th colSpan={2}>Non-Migrants</th>
                <th colSpan={2}>Migrants</th>
                <th colSpan={2}>Transients</th>
                <th>Total</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th></th>
                <th>Male</th>
                <th>Female</th>
                <th>Male</th>
                <th>Female</th>
                <th>Male</th>
                <th>Female</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                reportData?.map((data, idx) => (
                  <tr key={idx}>
                    <td>{data.status}</td>
                    <td>{data.nonMigrantMale}</td>
                    <td>{data.nonMigrantFemale}</td>
                    <td>{data.migrantMale}</td>
                    <td>{data.migrantFemale}</td>
                    <td>{data.transientMale}</td>
                    <td>{data.transientFemale}</td>
                    <td>{data.total}</td>
                  </tr>
                ))
              }
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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

export default TableFour