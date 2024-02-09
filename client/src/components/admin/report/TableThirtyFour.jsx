import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableThirtyFour = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThirtyFourReport = async () => {
      const { data } = await axios.get(`/api/table_thirtyFour/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableThirtyFourReport()
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
                  <th className='w-[60px]'>Age</th>
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
                  <th>Registered voter in the barangay</th>
                  <th>Registered voter in another barangay</th>
                  <th>Unregistered</th>
                  <th>Registered voter in the barangay</th>
                  <th>Registered voter in another barangay</th>
                  <th>Unregistered</th>
                  <th>Registered voter in the barangay</th>
                  <th>Registered voter in another barangay</th>
                  <th>Unregistered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantRegisteredMale}</td>
                      <td>{data.nonMigrantRegisteredInOtherMale}</td>
                      <td>{data.nonMigrantUnRegisteredMale}</td>
                      <td>{data.migrantRegisteredMale}</td>
                      <td>{data.migrantRegisteredInOtherMale}</td>
                      <td>{data.migrantUnRegisteredMale}</td>
                      <td>{data.transientRegisteredMale}</td>
                      <td>{data.transientRegisteredInOtherMale}</td>
                      <td>{data.transientUnRegisteredMale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantRegisteredMale}</td>
                  <td>{totals.nonMigrantRegisteredInOtherMale}</td>
                  <td>{totals.nonMigrantUnRegisteredMale}</td>
                  <td>{totals.migrantRegisteredMale}</td>
                  <td>{totals.migrantRegisteredInOtherMale}</td>
                  <td>{totals.migrantUnRegisteredMale}</td>
                  <td>{totals.transientRegisteredMale}</td>
                  <td>{totals.transientRegisteredInOtherMale}</td>
                  <td>{totals.transientUnRegisteredMale}</td>
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
                  <th className='w-[60px]'>Age</th>
                  <th colSpan={9}>Female</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={3}>Non-Migrants</th>
                  <th colSpan={3}>Migrants</th>
                  <th colSpan={3}>Transients</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Registered voter in the barangay</th>
                  <th>Registered voter in another barangay</th>
                  <th>Unregistered</th>
                  <th>Registered voter in the barangay</th>
                  <th>Registered voter in another barangay</th>
                  <th>Unregistered</th>
                  <th>Registered voter in the barangay</th>
                  <th>Registered voter in another barangay</th>
                  <th>Unregistered</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantRegisteredFemale}</td>
                      <td>{data.nonMigrantRegisteredInOtherFemale}</td>
                      <td>{data.nonMigrantUnRegisteredFemale}</td>
                      <td>{data.migrantRegisteredFemale}</td>
                      <td>{data.migrantRegisteredInOtherFemale}</td>
                      <td>{data.migrantUnRegisteredFemale}</td>
                      <td>{data.transientRegisteredFemale}</td>
                      <td>{data.transientRegisteredInOtherFemale}</td>
                      <td>{data.transientUnRegisteredFemale}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantRegisteredFemale}</td>
                  <td>{totals.nonMigrantRegisteredInOtherFemale}</td>
                  <td>{totals.nonMigrantUnRegisteredFemale}</td>
                  <td>{totals.migrantRegisteredFemale}</td>
                  <td>{totals.migrantRegisteredInOtherFemale}</td>
                  <td>{totals.migrantUnRegisteredFemale}</td>
                  <td>{totals.transientRegisteredFemale}</td>
                  <td>{totals.transientRegisteredInOtherFemale}</td>
                  <td>{totals.transientUnRegisteredFemale}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableThirtyFour