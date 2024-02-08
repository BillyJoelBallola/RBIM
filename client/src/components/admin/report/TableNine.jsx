import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableNine = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableNineReport = async () => {
      const { data } = await axios.get(`/api/table_nine/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableNineReport()
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
                  <th>Age</th>
                  <th colSpan={18}>Male</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={6}>Non-Migrants</th>
                  <th colSpan={6}>Migrants</th>
                  <th colSpan={6}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Pre-school</th>
                  <th>Elemen tary</th>
                  <th>Junior HS</th>
                  <th>Senior HS</th>
                  <th>Vocatio nal/Tech nical</th>
                  <th>College</th>
                  <th>Pre-school</th>
                  <th>Elemen tary</th>
                  <th>Junior HS</th>
                  <th>Senior HS</th>
                  <th>Vocatio nal/Tech nical</th>
                  <th>College</th>
                  <th>Pre-school</th>
                  <th>Elemen tary</th>
                  <th>Junior HS</th>
                  <th>Senior HS</th>
                  <th>Vocatio nal/Tech nical</th>
                  <th>College</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantpreSchoolMale}</td>
                      <td>{data.nonMigrantelementaryMale}</td>
                      <td>{data.nonMigrantjuniorHighSchoolMale}</td>
                      <td>{data.nonMigrantseniorHighSchoolMale}</td>
                      <td>{data.nonMigrantvocationalMale}</td>
                      <td>{data.nonMigrantcollegeMale}</td>
                      <td>{data.migrantpreSchoolMale}</td>
                      <td>{data.migrantelementaryMale}</td>
                      <td>{data.migrantjuniorHighSchoolMale}</td>
                      <td>{data.migrantseniorHighSchoolMale}</td>
                      <td>{data.migrantvocationalMale}</td>
                      <td>{data.migrantcollegeMale}</td>
                      <td>{data.transientpreSchoolMale}</td>
                      <td>{data.transientelementaryMale}</td>
                      <td>{data.transientjuniorHighSchoolMale}</td>
                      <td>{data.transientseniorHighSchoolMale}</td>
                      <td>{data.transientvocationalMale}</td>
                      <td>{data.transientcollegeMale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantpreSchoolMale}</td>
                  <td>{totals.nonMigrantelementaryMale}</td>
                  <td>{totals.nonMigrantjuniorHighSchoolMale}</td>
                  <td>{totals.nonMigrantseniorHighSchoolMale}</td>
                  <td>{totals.nonMigrantvocationalMale}</td>
                  <td>{totals.nonMigrantcollegeMale}</td>
                  <td>{totals.migrantpreSchoolMale}</td>
                  <td>{totals.migrantelementaryMale}</td>
                  <td>{totals.migrantjuniorHighSchoolMale}</td>
                  <td>{totals.migrantseniorHighSchoolMale}</td>
                  <td>{totals.migrantvocationalMale}</td>
                  <td>{totals.migrantcollegeMale}</td>
                  <td>{totals.transientpreSchoolMale}</td>
                  <td>{totals.transientelementaryMale}</td>
                  <td>{totals.transientjuniorHighSchoolMale}</td>
                  <td>{totals.transientseniorHighSchoolMale}</td>
                  <td>{totals.transientvocationalMale}</td>
                  <td>{totals.transientcollegeMale}</td>
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
                  <th>Age</th>
                  <th colSpan={18}>Female</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={6}>Non-Migrants</th>
                  <th colSpan={6}>Migrants</th>
                  <th colSpan={6}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Pre-school</th>
                  <th>Elemen tary</th>
                  <th>Junior HS</th>
                  <th>Senior HS</th>
                  <th>Vocatio nal/Tech nical</th>
                  <th>College</th>
                  <th>Pre-school</th>
                  <th>Elemen tary</th>
                  <th>Junior HS</th>
                  <th>Senior HS</th>
                  <th>Vocatio nal/Tech nical</th>
                  <th>College</th>
                  <th>Pre-school</th>
                  <th>Elemen tary</th>
                  <th>Junior HS</th>
                  <th>Senior HS</th>
                  <th>Vocatio nal/Tech nical</th>
                  <th>College</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantpreSchoolFemale}</td>
                      <td>{data.nonMigrantelementaryFemale}</td>
                      <td>{data.nonMigrantjuniorHighSchoolFemale}</td>
                      <td>{data.nonMigrantseniorHighSchoolFemale}</td>
                      <td>{data.nonMigrantvocationalFemale}</td>
                      <td>{data.nonMigrantcollegeFemale}</td>
                      <td>{data.migrantpreSchoolFemale}</td>
                      <td>{data.migrantelementaryFemale}</td>
                      <td>{data.migrantjuniorHighSchoolFemale}</td>
                      <td>{data.migrantseniorHighSchoolFemale}</td>
                      <td>{data.migrantvocationalFemale}</td>
                      <td>{data.migrantcollegeFemale}</td>
                      <td>{data.transientpreSchoolFemale}</td>
                      <td>{data.transientelementaryFemale}</td>
                      <td>{data.transientjuniorHighSchoolFemale}</td>
                      <td>{data.transientseniorHighSchoolFemale}</td>
                      <td>{data.transientvocationalFemale}</td>
                      <td>{data.transientcollegeFemale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantpreSchoolFemale}</td>
                  <td>{totals.nonMigrantelementaryFemale}</td>
                  <td>{totals.nonMigrantjuniorHighSchoolFemale}</td>
                  <td>{totals.nonMigrantseniorHighSchoolFemale}</td>
                  <td>{totals.nonMigrantvocationalFemale}</td>
                  <td>{totals.nonMigrantcollegeFemale}</td>
                  <td>{totals.migrantpreSchoolFemale}</td>
                  <td>{totals.migrantelementaryFemale}</td>
                  <td>{totals.migrantjuniorHighSchoolFemale}</td>
                  <td>{totals.migrantseniorHighSchoolFemale}</td>
                  <td>{totals.migrantvocationalFemale}</td>
                  <td>{totals.migrantcollegeFemale}</td>
                  <td>{totals.transientpreSchoolFemale}</td>
                  <td>{totals.transientelementaryFemale}</td>
                  <td>{totals.transientjuniorHighSchoolFemale}</td>
                  <td>{totals.transientseniorHighSchoolFemale}</td>
                  <td>{totals.transientvocationalFemale}</td>
                  <td>{totals.transientcollegeFemale}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableNine