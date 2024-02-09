import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableThirtySeven = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThirtySevenReport = async () => {
      const { data } = await axios.get(`/api/table_thirtySeven/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableThirtySevenReport()
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
                <th className='w-[200px]'>Age</th>
                <th colSpan={5}>Male</th>
                <th className='w-[200px]'>Overall total</th>
              </tr>
              <tr>
                <th></th>
                <th colSpan={5}>Migrants</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                reportData?.map((data, idx) => (
                  <tr key={idx}>
                    <td>{data.age}</td>
                    <td>{data.sixMonthMale}</td>
                    <td>{data.oneYearAgoMale}</td>
                    <td>{data.twoYearsAgoMale}</td>
                    <td>{data.threeYearsAgoMale}</td>
                    <td>{data.fourYearsAgoMale}</td>
                    <td>{data.total}</td>
                  </tr>
                ))
              }
              <tr>
                <td>{totals.age}</td>
                <td>{totals.sixMonthMale}</td>
                <td>{totals.oneYearAgoMale}</td>
                <td>{totals.twoYearsAgoMale}</td>
                <td>{totals.threeYearsAgoMale}</td>
                <td>{totals.fourYearsAgoMale}</td>
                <td>{totals.total}</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default TableThirtySeven