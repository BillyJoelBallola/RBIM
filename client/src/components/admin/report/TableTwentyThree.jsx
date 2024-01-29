import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableTwentyThree = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTwentyThreeReport = async () => {
      const { data } = await axios.get(`/api/table_twentyThree/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTwentyThreeReport()
  }, [])

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
                  <th colSpan={14}>Non-Migrants</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>Philhealth Paying Member</th>
                  <th colSpan={2}>PhilHealth Dependent of Paying Member</th>
                  <th colSpan={2}>PhilHealth Indigent Member</th>
                  <th colSpan={2}>PhilHealth Dependent of Indigent Member</th>
                  <th colSpan={2} className='w-[50px]'>GSIS</th>
                  <th colSpan={2} className='w-[50px]'>SSS</th>
                  <th colSpan={2}>PRIVATE/HMO</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantphilHealthMale}</td>
                      <td>{data.nonMigrantphilHealthFemale}</td>
                      <td>{data.nonMigrantphilHealthDependentMale}</td>
                      <td>{data.nonMigrantphilHealthDependentFemale}</td>
                      <td>{data.nonMigrantphilHealthIndigentMale}</td>
                      <td>{data.nonMigrantphilHealthIndigentFemale}</td>
                      <td>{data.nonMigrantphilHealthDependentIndigentMale}</td>
                      <td>{data.nonMigrantphilHealthDependentIndigentFemale}</td>
                      <td>{data.nonMigrantGSISMale}</td>
                      <td>{data.nonMigrantGSISFemale}</td>
                      <td>{data.nonMigrantSSSMale}</td>
                      <td>{data.nonMigrantSSSFemale}</td>
                      <td>{data.nonMigrantprivateMale}</td>
                      <td>{data.nonMigrantprivateFemale}</td>
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
                  <th className='w-[60px]'>Age</th>
                  <th colSpan={14}>Migrants</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>Philhealth Paying Member</th>
                  <th colSpan={2}>PhilHealth Dependent of Paying Member</th>
                  <th colSpan={2}>PhilHealth Indigent Member</th>
                  <th colSpan={2}>PhilHealth Dependent of Indigent Member</th>
                  <th colSpan={2} className='w-[50px]'>GSIS</th>
                  <th colSpan={2} className='w-[50px]'>SSS</th>
                  <th colSpan={2}>PRIVATE/HMO</th>
                </tr>
                <tr>
                  <th></th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrantphilHealthMale}</td>
                      <td>{data.migrantphilHealthFemale}</td>
                      <td>{data.migrantphilHealthDependentMale}</td>
                      <td>{data.migrantphilHealthDependentFemale}</td>
                      <td>{data.migrantphilHealthIndigentMale}</td>
                      <td>{data.migrantphilHealthIndigentFemale}</td>
                      <td>{data.migrantphilHealthDependentIndigentMale}</td>
                      <td>{data.migrantphilHealthDependentIndigentFemale}</td>
                      <td>{data.migrantGSISMale}</td>
                      <td>{data.migrantGSISFemale}</td>
                      <td>{data.migrantSSSMale}</td>
                      <td>{data.migrantSSSFemale}</td>
                      <td>{data.migrantprivateMale}</td>
                      <td>{data.migrantprivateFemale}</td>
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
                  <th className='w-[60px]'>Age</th>
                  <th colSpan={14}>Transients</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>Philhealth Paying Member</th>
                  <th colSpan={2}>PhilHealth Dependent of Paying Member</th>
                  <th colSpan={2}>PhilHealth Indigent Member</th>
                  <th colSpan={2}>PhilHealth Dependent of Indigent Member</th>
                  <th colSpan={2} className='w-[50px]'>GSIS</th>
                  <th colSpan={2} className='w-[50px]'>SSS</th>
                  <th colSpan={2}>PRIVATE/HMO</th>
                </tr>
                <tr>
                  <th></th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientphilHealthMale}</td>
                      <td>{data.transientphilHealthFemale}</td>
                      <td>{data.transientphilHealthDependentMale}</td>
                      <td>{data.transientphilHealthDependentFemale}</td>
                      <td>{data.transientphilHealthIndigentMale}</td>
                      <td>{data.transientphilHealthIndigentFemale}</td>
                      <td>{data.transientphilHealthDependentIndigentMale}</td>
                      <td>{data.transientphilHealthDependentIndigentFemale}</td>
                      <td>{data.transientGSISMale}</td>
                      <td>{data.transientGSISFemale}</td>
                      <td>{data.transientSSSMale}</td>
                      <td>{data.transientSSSFemale}</td>
                      <td>{data.transientprivateMale}</td>
                      <td>{data.transientprivateFemale}</td>
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

export default TableTwentyThree