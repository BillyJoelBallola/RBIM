import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableTwentySix = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTwentySixReport = async () => {
      const { data } = await axios.get(`/api/table_twentySix/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTwentySixReport()
  }, [])

  return (
    <>
      <div className={`bg-white py-4 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-2'>
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
                  <th>Sensory Disability</th>
                  <th>Physical Disability</th>
                  <th>Mental Disability</th>
                  <th>Sensory Disability</th>
                  <th>Physical Disability</th>
                  <th>Mental Disability</th>
                  <th>Sensory Disability</th>
                  <th>Physical Disability</th>
                  <th>Mental Disability</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantsensoryMale}</td>
                      <td>{data.migrantsensoryMale}</td>
                      <td>{data.transientsensoryMale}</td>
                      <td>{data.nonMigrantphysicalMale}</td>
                      <td>{data.migrantphysicalMale}</td>
                      <td>{data.transientphysicalMale}</td>
                      <td>{data.nonMigrantmentalMale}</td>
                      <td>{data.migrantmentalMale}</td>
                      <td>{data.transientmentalMale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-8 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-2'>
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
                  <th>Sensory Disability</th>
                  <th>Physical Disability</th>
                  <th>Mental Disability</th>
                  <th>Sensory Disability</th>
                  <th>Physical Disability</th>
                  <th>Mental Disability</th>
                  <th>Sensory Disability</th>
                  <th>Physical Disability</th>
                  <th>Mental Disability</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantsensoryFemale}</td>
                      <td>{data.migrantsensoryFemale}</td>
                      <td>{data.transientsensoryFemale}</td>
                      <td>{data.nonMigrantphysicalFemale}</td>
                      <td>{data.migrantphysicalFemale}</td>
                      <td>{data.transientphysicalFemale}</td>
                      <td>{data.nonMigrantmentalFemale}</td>
                      <td>{data.migrantmentalFemale}</td>
                      <td>{data.transientmentalFemale}</td>
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

export default TableTwentySix