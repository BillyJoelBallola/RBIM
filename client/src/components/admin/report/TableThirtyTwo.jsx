import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableThirtyTwo = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThirtyTwoReport = async () => {
      const { data } = await axios.get(`/api/table_thirtyTwo/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableThirtyTwoReport()
  }, [])

  const totals = getSum(reportData)

  return (
    <>
      <div className={`bg-white py-4 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <img src={logo} className='w-20 aspect-square' alt="rbim_logo" />
            <div className='grid text-center'>
              <span className='font-semibold'>{Number(address) !== 0 ? addresses?.find(item => item.id === Number(address))?.barangay : 'Municipal'} [{moment(dateFrom).format('LL')} - {moment(dateTo).format('LL')}]</span>
              <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
            </div>
        </div>
        <div className='grid place-items-center'>
            <table className='report_table'>
              <thead>
                <tr>
                  <th className='w-[100px]'>Age</th>
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
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrant_registered_male}</td>
                      <td>{data.nonMigrant_nonSolo_male}</td>
                      <td>{data.nonMigrant_unRegistered_male}</td>
                      <td>{data.migrant_registered_male}</td>
                      <td>{data.migrant_nonSolo_male}</td>
                      <td>{data.migrant_unRegistered_male}</td>
                      <td>{data.transient_registered_male}</td>
                      <td>{data.transient_nonSolo_male}</td>
                      <td>{data.transient_unRegistered_male}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrant_registered_male}</td>
                  <td>{totals.nonMigrant_nonSolo_male}</td>
                  <td>{totals.nonMigrant_unRegistered_male}</td>
                  <td>{totals.migrant_registered_male}</td>
                  <td>{totals.migrant_nonSolo_male}</td>
                  <td>{totals.migrant_unRegistered_male}</td>
                  <td>{totals.transient_registered_male}</td>
                  <td>{totals.transient_nonSolo_male}</td>
                  <td>{totals.transient_unRegistered_male}</td>
                  <td>{totals.total}</td>
                </tr>
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
                  <th className='w-[100px]'>Age</th>
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
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrant_registered_female}</td>
                      <td>{data.nonMigrant_nonSolo_female}</td>
                      <td>{data.nonMigrant_unRegistered_female}</td>
                      <td>{data.migrant_registered_female}</td>
                      <td>{data.migrant_nonSolo_female}</td>
                      <td>{data.migrant_unRegistered_female}</td>
                      <td>{data.transient_registered_female}</td>
                      <td>{data.transient_nonSolo_female}</td>
                      <td>{data.transient_unRegistered_female}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrant_registered_female}</td>
                  <td>{totals.nonMigrant_nonSolo_female}</td>
                  <td>{totals.nonMigrant_unRegistered_female}</td>
                  <td>{totals.migrant_registered_female}</td>
                  <td>{totals.migrant_nonSolo_female}</td>
                  <td>{totals.migrant_unRegistered_female}</td>
                  <td>{totals.transient_registered_female}</td>
                  <td>{totals.transient_nonSolo_female}</td>
                  <td>{totals.transient_unRegistered_female}</td>
                  <td>{totals.total}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableThirtyTwo