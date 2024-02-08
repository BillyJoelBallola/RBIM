import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { getSum } from '../../../helper/getSum'

const TableOne = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableOneReport = async () => {
      const { data } = await axios.get(`/api/table_one/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    if(reportDetails){
      fetchTableOneReport()
    }
  }, [reportDetails])

  const totals = getSum(reportData)
  
  return (
    <div className={`bg-white py-4 ${orientation}`}>
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
                <th className='w-16'>Age</th>
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
                    <td>{data.age}</td>
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
              <tr key={totals}>
                <td>Overall Total</td>
                <td>{totals.nonMigrantMale}</td>
                <td>{totals.nonMigrantFemale}</td>
                <td>{totals.migrantMale}</td>
                <td>{totals.migrantFemale}</td>
                <td>{totals.transientMale}</td>
                <td>{totals.transientFemale}</td>
                <td>{totals.total}</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default TableOne