import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableThirtyNine = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  // useEffect(() => {
  //   const fetchTableThirtyNineReport = async () => {
  //     const { data } = await axios.get(`/api/table_thirtyNine/${address}/${dateFrom}/${dateTo}`)
  //     if(data.success){
  //       setReportData(data.data)
  //     }
  //   }

  //   fetchTableThirtyNineReport()
  // }, [])

  return (
    <>
      <div className={`bg-white py-4 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <img src={logo} className='w-16 aspect-square' alt="rbim_logo" />
            <div className='grid text-center'>
              <span className='font-semibold'>{Number(address) !== 0 ? addresses?.find(item => item.id === Number(address))?.barangay : 'Municipal'} [{moment(dateFrom).format('LL')} - {moment(dateTo).format('LL')}]</span>
              <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
            </div>
        </div>
        <div className='grid place-items-center'>
            <table className='report_table'>
              <thead>
                <tr>
                  <th>Age</th>
                  <th colSpan={5}>Male</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={5}>Migrants</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Availability of jobs</th>
                  <th>Higher wage</th>
                  <th>Presence of schools or universities</th>
                  <th>Presence of relatives and friends in other place</th>
                  <th>Housing</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                } */}
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-8 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <div className='grid text-center'>
              <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
            </div>
        </div>
        <div className='grid place-items-center'>
            <table className='report_table'>
              <thead>
                <tr>
                  <th>Age</th>
                  <th colSpan={5}>Male</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={5}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Availability of jobs</th>
                  <th>Higher wage</th>
                  <th>Presence of schools or universities</th>
                  <th>Presence of relatives and friends in other place</th>
                  <th>Housing</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                } */}
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-8 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <div className='grid text-center'>
              <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
            </div>
        </div>
        <div className='grid place-items-center'>
            <table className='report_table'>
              <thead>
                <tr>
                  <th>Age</th>
                  <th colSpan={5}>Female</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={5}>Migrants</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Availability of jobs</th>
                  <th>Higher wage</th>
                  <th>Presence of schools or universities</th>
                  <th>Presence of relatives and friends in other place</th>
                  <th>Housing</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                } */}
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-8 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <div className='grid text-center'>
              <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
            </div>
        </div>
        <div className='grid place-items-center'>
            <table className='report_table'>
              <thead>
                <tr>
                  <th>Age</th>
                  <th colSpan={5}>Female</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={5}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Availability of jobs</th>
                  <th>Higher wage</th>
                  <th>Presence of schools or universities</th>
                  <th>Presence of relatives and friends in other place</th>
                  <th>Housing</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                } */}
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableThirtyNine