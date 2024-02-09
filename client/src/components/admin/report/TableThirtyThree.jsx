import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableThirtyThree = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThirtyThreeReport = async () => {
      const { data } = await axios.get(`/api/table_thirtyThree/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableThirtyThreeReport()
  }, [])

  const totals = getSum(reportData)

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
                <th>Sex</th>
                <th colSpan={2}>Non-Migrants</th>
                <th colSpan={2}>Migrants</th>
                <th colSpan={2}>Transients</th>
                <th>Overall Total</th>
              </tr>
              <tr>
                <th></th>
                <th>Yes, registered senior citizen</th>
                <th>No, not registered senior citizen</th>
                <th>Yes, registered senior citizen</th>
                <th>No, not registered senior citizen</th>
                <th>Yes, registered senior citizen</th>
                <th>No, not registered senior citizen</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                reportData?.map((data, idx) => (
                  <tr key={idx}>
                    <td>{data.sex}</td>
                    <td>{data.nonMigrantRegistered}</td>
                    <td>{data.nonMigrantUnRegistered}</td>
                    <td>{data.migrantRegistered}</td>
                    <td>{data.migrantUnRegistered}</td>
                    <td>{data.transientRegistered}</td>
                    <td>{data.transientUnRegistered}</td>
                    <td>{data.total}</td>
                  </tr>
                ))
              }
              <tr>
                <td>Overall Total</td>
                <td>{totals.nonMigrantRegistered}</td>
                <td>{totals.nonMigrantUnRegistered}</td>
                <td>{totals.migrantRegistered}</td>
                <td>{totals.migrantUnRegistered}</td>
                <td>{totals.transientRegistered}</td>
                <td>{totals.transientUnRegistered}</td>
                <td>{totals.total}</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default TableThirtyThree