import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableThirtyTwo = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  // useEffect(() => {
  //   const fetchTableThirtyTwoReport = async () => {
  //     const { data } = await axios.get(`/api/table_thirtyTwo/${address}/${dateFrom}/${dateTo}`)
  //     if(data.success){
  //       setReportData(data.data)
  //     }
  //   }

  //   fetchTableThirtyTwoReport()
  // }, [])

  return (
    <>
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
                  <th>Age</th>
                  <th colSpan={9}>Male</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={3}>Non-Migrants</th>
                  <th colSpan={3}>Migrants</th>
                  <th colSpan={3}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Registered Solo Parent</th>
                  <th>Non Solo Parent</th>
                  <th>Unregistered Solo Parent</th>
                  <th>Registered Solo Parent</th>
                  <th>Non Solo Parent</th>
                  <th>Unregistered Solo Parent</th>
                  <th>Registered Solo Parent</th>
                  <th>Non Solo Parent</th>
                  <th>Unregistered Solo Parent</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.cause}</td>
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
                  <th>Age</th>
                  <th colSpan={9}>Female</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={3}>Non-Migrants</th>
                  <th colSpan={3}>Migrants</th>
                  <th colSpan={3}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Registered Solo Parent</th>
                  <th>Non Solo Parent</th>
                  <th>Unregistered Solo Parent</th>
                  <th>Registered Solo Parent</th>
                  <th>Non Solo Parent</th>
                  <th>Unregistered Solo Parent</th>
                  <th>Registered Solo Parent</th>
                  <th>Non Solo Parent</th>
                  <th>Unregistered Solo Parent</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.cause}</td>
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

export default TableThirtyTwo