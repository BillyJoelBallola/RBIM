import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableTweenty = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTweentyReport = async () => {
      const { data } = await axios.get(`/api/table_twenty/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTweentyReport()
  }, [])

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
                  <th className='w-[100px]'>Age</th>
                  <th colSpan={5}>Non-Migrants</th>
                  <th>Overall Total</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Goverment Hospital</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Station</th>
                  <th>Private Hospital</th>
                  <th>Pharmacy</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantgoverment}</td>
                      <td>{data.nonMigrantrhu}</td>
                      <td>{data.nonMigranthealthStation}</td>
                      <td>{data.nonMigrantprivate}</td>
                      <td>{data.nonMigrantpharmacy}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
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
                  <th colSpan={5}>Migrants</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Goverment Hospital</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Station</th>
                  <th>Private Hospital</th>
                  <th>Pharmacy</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrantgoverment}</td>
                      <td>{data.migrantrhu}</td>
                      <td>{data.migranthealthStation}</td>
                      <td>{data.migrantprivate}</td>
                      <td>{data.migrantpharmacy}</td>
                    </tr>
                  ))
                }
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
                  <th colSpan={5}>Transients</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Goverment Hospital</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Station</th>
                  <th>Private Hospital</th>
                  <th>Pharmacy</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientgoverment}</td>
                      <td>{data.transientrhu}</td>
                      <td>{data.transienthealthStation}</td>
                      <td>{data.transientprivate}</td>
                      <td>{data.transientpharmacy}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableTweenty