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
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantregisteredMale}</td>
                      <td>{data.migrantregisteredMale}</td>
                      <td>{data.transientregisteredMale}</td>
                      <td>{data.nonMigrantnonSoloMale}</td>
                      <td>{data.migrantnonSoloMale}</td>
                      <td>{data.transientnonSoloMale}</td>
                      <td>{data.nonMigrantUnregisteredMale}</td>
                      <td>{data.migrantUnregisteredMale}</td>
                      <td>{data.transientUnregisteredMale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantregisteredMale}</td>
                  <td>{totals.migrantregisteredMale}</td>
                  <td>{totals.transientregisteredMale}</td>
                  <td>{totals.nonMigrantnonSoloMale}</td>
                  <td>{totals.migrantnonSoloMale}</td>
                  <td>{totals.transientnonSoloMale}</td>
                  <td>{totals.nonMigrantUnregisteredMale}</td>
                  <td>{totals.migrantUnregisteredMale}</td>
                  <td>{totals.transientUnregisteredMale}</td>
                  <td>{totals.total}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-8 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
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
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantregisteredFemale}</td>
                      <td>{data.migrantregisteredFemale}</td>
                      <td>{data.transientregisteredFemale}</td>
                      <td>{data.nonMigrantnonSoloFemale}</td>
                      <td>{data.migrantnonSoloFemale}</td>
                      <td>{data.transientnonSoloFemale}</td>
                      <td>{data.nonMigrantUnregisteredFemale}</td>
                      <td>{data.migrantUnregisteredFemale}</td>
                      <td>{data.transientUnregisteredFemale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantregisteredFemale}</td>
                  <td>{totals.migrantregisteredFemale}</td>
                  <td>{totals.transientregisteredFemale}</td>
                  <td>{totals.nonMigrantnonSoloFemale}</td>
                  <td>{totals.migrantnonSoloFemale}</td>
                  <td>{totals.transientnonSoloFemale}</td>
                  <td>{totals.nonMigrantUnregisteredFemale}</td>
                  <td>{totals.migrantUnregisteredFemale}</td>
                  <td>{totals.transientUnregisteredFemale}</td>
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