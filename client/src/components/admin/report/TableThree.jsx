import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableThree = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThreeReport = async () => {
      const { data } = await axios.get(`/api/table_three/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableThreeReport()
  }, [])

  const totals = getSum(reportData)

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
                  <th className='w-16'>Age</th>
                  <th colSpan={7}>Non-Migrants</th>
                  <th>Overall Total</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Single</th>
                  <th>Married</th>
                  <th>Living-in</th>
                  <th>Widowed</th>
                  <th>Seperated</th>
                  <th>Divorced</th>
                  <th>Unknown</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantsingle}</td>
                      <td>{data.nonMigrantmarried}</td>
                      <td>{data.nonMigrantlivingIn}</td>
                      <td>{data.nonMigrantwidowed}</td>
                      <td>{data.nonMigrantseparated}</td>
                      <td>{data.nonMigrantdivorced}</td>
                      <td>{data.nonMigrantunknown}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantsingle}</td>
                  <td>{totals.nonMigrantmarried}</td>
                  <td>{totals.nonMigrantlivingIn}</td>
                  <td>{totals.nonMigrantwidowed}</td>
                  <td>{totals.nonMigrantseparated}</td>
                  <td>{totals.nonMigrantdivorced}</td>
                  <td>{totals.nonMigrantunknown}</td>
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
                  <th className='w-16'>Age</th>
                  <th colSpan={7}>Migrants</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Single</th>
                  <th>Married</th>
                  <th>Living-in</th>
                  <th>Widowed</th>
                  <th>Seperated</th>
                  <th>Divorced</th>
                  <th>Unknown</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrantsingle}</td>
                      <td>{data.migrantmarried}</td>
                      <td>{data.migrantlivingIn}</td>
                      <td>{data.migrantwidowed}</td>
                      <td>{data.migrantseparated}</td>
                      <td>{data.migrantdivorced}</td>
                      <td>{data.migrantunknown}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.migrantsingle}</td>
                  <td>{totals.migrantmarried}</td>
                  <td>{totals.migrantlivingIn}</td>
                  <td>{totals.migrantwidowed}</td>
                  <td>{totals.migrantseparated}</td>
                  <td>{totals.migrantdivorced}</td>
                  <td>{totals.migrantunknown}</td>
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
                  <th className='w-16'>Age</th>
                  <th colSpan={7}>Transients</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Single</th>
                  <th>Married</th>
                  <th>Living-in</th>
                  <th>Widowed</th>
                  <th>Seperated</th>
                  <th>Divorced</th>
                  <th>Unknown</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientsingle}</td>
                      <td>{data.transientmarried}</td>
                      <td>{data.transientlivingIn}</td>
                      <td>{data.transientwidowed}</td>
                      <td>{data.transientseparated}</td>
                      <td>{data.transientdivorced}</td>
                      <td>{data.transientunknown}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.transientsingle}</td>
                  <td>{totals.transientmarried}</td>
                  <td>{totals.transientlivingIn}</td>
                  <td>{totals.transientwidowed}</td>
                  <td>{totals.transientseparated}</td>
                  <td>{totals.transientdivorced}</td>
                  <td>{totals.transientunknown}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableThree