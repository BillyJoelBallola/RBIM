import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableEight = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableEightReport = async () => {
      const { data } = await axios.get(`/api/table_eight/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableEightReport()
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
                  <th>Enrolled in Public</th>
                  <th>Enrolled in Private</th>
                  <th>Not Enrolled</th>
                  <th>Enrolled in Public</th>
                  <th>Enrolled in Private</th>
                  <th>Not Enrolled</th>
                  <th>Enrolled in Public</th>
                  <th>Enrolled in Private</th>
                  <th>Not Enrolled</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantpublicMale}</td>
                      <td>{data.nonMigrantprivateMale}</td>
                      <td>{data.nonMigrantnoneMale}</td>
                      <td>{data.migrantpublicMale}</td>
                      <td>{data.migrantprivateMale}</td>
                      <td>{data.migrantnoneMale}</td>
                      <td>{data.transientpublicMale}</td>
                      <td>{data.transientprivateMale}</td>
                      <td>{data.transientnoneMale}</td>
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
                  <th>Enrolled in Public</th>
                  <th>Enrolled in Private</th>
                  <th>Not Enrolled</th>
                  <th>Enrolled in Public</th>
                  <th>Enrolled in Private</th>
                  <th>Not Enrolled</th>
                  <th>Enrolled in Public</th>
                  <th>Enrolled in Private</th>
                  <th>Not Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantpublicFemale}</td>
                      <td>{data.nonMigrantprivateFemale}</td>
                      <td>{data.nonMigrantnoneFemale}</td>
                      <td>{data.migrantpublicFemale}</td>
                      <td>{data.migrantprivateFemale}</td>
                      <td>{data.migrantnoneFemale}</td>
                      <td>{data.transientpublicFemale}</td>
                      <td>{data.transientprivateFemale}</td>
                      <td>{data.transientnoneFemale}</td>
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

export default TableEight