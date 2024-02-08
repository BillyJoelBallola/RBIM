import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableSeven = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableSevenReport = async () => {
      const { data } = await axios.get(`/api/table_seven/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableSevenReport()
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
                  <th colSpan={28}>Non-Migrants</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>No Education</th>
                  <th colSpan={2}>Pre-school</th>
                  <th colSpan={2}>Elementary Level</th>
                  <th colSpan={2}>Elementary Graduate</th>
                  <th colSpan={2}>High School Level</th>
                  <th colSpan={2}>High School Graduate</th>
                  <th colSpan={2}>Junior HS Level</th>
                  <th colSpan={2}>Junior HS Graduate</th>
                  <th colSpan={2}>Senior HS Level</th>
                  <th colSpan={2}>Senior HS Graduate</th>
                  <th colSpan={2}>Vocational / Technical</th>
                  <th colSpan={2}>College Level</th>
                  <th colSpan={2}>College Graduate</th>
                  <th colSpan={2}>Post-graduate</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantnoEducationMale}</td>
                      <td>{data.nonMigrantnoEducationFemale}</td>
                      <td>{data.nonMigrantpreSchoolMale}</td>
                      <td>{data.nonMigrantpreSchoolFemale}</td>
                      <td>{data.nonMigrantelementaryMale}</td>
                      <td>{data.nonMigrantelementaryFemale}</td>
                      <td>{data.nonMigrantelementaryGraduateMale}</td>
                      <td>{data.nonMigrantelementaryGraduateFemale}</td>
                      <td>{data.nonMigranthighSchoolMale}</td>
                      <td>{data.nonMigranthighSchoolFemale}</td>
                      <td>{data.nonMigranthighSchoolGraduateMale}</td>
                      <td>{data.nonMigranthighSchoolGraduateFemale}</td>
                      <td>{data.nonMigrantjuniorHighSchoolMale}</td>
                      <td>{data.nonMigrantjuniorHighSchoolFemale}</td>
                      <td>{data.nonMigrantjuniorHighSchoolGraduateMale}</td>
                      <td>{data.nonMigrantjuniorHighSchoolGraduateFemale}</td>
                      <td>{data.nonMigrantseniorHighSchoolMale}</td>
                      <td>{data.nonMigrantseniorHighSchoolFemale}</td>
                      <td>{data.nonMigrantseniorHighSchoolGraduateMale}</td>
                      <td>{data.nonMigrantseniorHighSchoolGraduateFemale}</td>
                      <td>{data.nonMigrantvocationalMale}</td>
                      <td>{data.nonMigrantvocationalFemale}</td>
                      <td>{data.nonMigrantcollegeMale}</td>
                      <td>{data.nonMigrantcollegeFemale}</td>
                      <td>{data.nonMigrantcollegeGraduateMale}</td>
                      <td>{data.nonMigrantcollegeGraduateFemale}</td>
                      <td>{data.nonMigrantpostGraduateMale}</td>
                      <td>{data.nonMigrantpostGraduateFemale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantnoEducationMale}</td>
                  <td>{totals.nonMigrantnoEducationFemale}</td>
                  <td>{totals.nonMigrantpreSchoolMale}</td>
                  <td>{totals.nonMigrantpreSchoolFemale}</td>
                  <td>{totals.nonMigrantelementaryMale}</td>
                  <td>{totals.nonMigrantelementaryFemale}</td>
                  <td>{totals.nonMigrantelementaryGraduateMale}</td>
                  <td>{totals.nonMigrantelementaryGraduateFemale}</td>
                  <td>{totals.nonMigranthighSchoolMale}</td>
                  <td>{totals.nonMigranthighSchoolFemale}</td>
                  <td>{totals.nonMigranthighSchoolGraduateMale}</td>
                  <td>{totals.nonMigranthighSchoolGraduateFemale}</td>
                  <td>{totals.nonMigrantjuniorHighSchoolMale}</td>
                  <td>{totals.nonMigrantjuniorHighSchoolFemale}</td>
                  <td>{totals.nonMigrantjuniorHighSchoolGraduateMale}</td>
                  <td>{totals.nonMigrantjuniorHighSchoolGraduateFemale}</td>
                  <td>{totals.nonMigrantseniorHighSchoolMale}</td>
                  <td>{totals.nonMigrantseniorHighSchoolFemale}</td>
                  <td>{totals.nonMigrantseniorHighSchoolGraduateMale}</td>
                  <td>{totals.nonMigrantseniorHighSchoolGraduateFemale}</td>
                  <td>{totals.nonMigrantvocationalMale}</td>
                  <td>{totals.nonMigrantvocationalFemale}</td>
                  <td>{totals.nonMigrantcollegeMale}</td>
                  <td>{totals.nonMigrantcollegeFemale}</td>
                  <td>{totals.nonMigrantcollegeGraduateMale}</td>
                  <td>{totals.nonMigrantcollegeGraduateFemale}</td>
                  <td>{totals.nonMigrantpostGraduateMale}</td>
                  <td>{totals.nonMigrantpostGraduateFemale}</td>
                  <td>{totals.total}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-4 ${orientation}`}>
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
                  <th colSpan={28}>Migrants</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>No Education</th>
                  <th colSpan={2}>Pre-school</th>
                  <th colSpan={2}>Elementary Level</th>
                  <th colSpan={2}>Elementary Graduate</th>
                  <th colSpan={2}>High School Level</th>
                  <th colSpan={2}>High School Graduate</th>
                  <th colSpan={2}>Junior HS Level</th>
                  <th colSpan={2}>Junior HS Graduate</th>
                  <th colSpan={2}>Senior HS Level</th>
                  <th colSpan={2}>Senior HS Graduate</th>
                  <th colSpan={2}>Vocational / Technical</th>
                  <th colSpan={2}>College Level</th>
                  <th colSpan={2}>College Graduate</th>
                  <th colSpan={2}>Post-graduate</th>
                </tr>
                <tr>
                  <th></th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrantnoEducationMale}</td>
                      <td>{data.migrantnoEducationFemale}</td>
                      <td>{data.migrantpreSchoolMale}</td>
                      <td>{data.migrantpreSchoolFemale}</td>
                      <td>{data.migrantelementaryMale}</td>
                      <td>{data.migrantelementaryFemale}</td>
                      <td>{data.migrantelementaryGraduateMale}</td>
                      <td>{data.migrantelementaryGraduateFemale}</td>
                      <td>{data.migranthighSchoolMale}</td>
                      <td>{data.migranthighSchoolFemale}</td>
                      <td>{data.migranthighSchoolGraduateMale}</td>
                      <td>{data.migranthighSchoolGraduateFemale}</td>
                      <td>{data.migrantjuniorHighSchoolMale}</td>
                      <td>{data.migrantjuniorHighSchoolFemale}</td>
                      <td>{data.migrantjuniorHighSchoolGraduateMale}</td>
                      <td>{data.migrantjuniorHighSchoolGraduateFemale}</td>
                      <td>{data.migrantseniorHighSchoolMale}</td>
                      <td>{data.migrantseniorHighSchoolFemale}</td>
                      <td>{data.migrantseniorHighSchoolGraduateMale}</td>
                      <td>{data.migrantseniorHighSchoolGraduateFemale}</td>
                      <td>{data.migrantvocationalMale}</td>
                      <td>{data.migrantvocationalFemale}</td>
                      <td>{data.migrantcollegeMale}</td>
                      <td>{data.migrantcollegeFemale}</td>
                      <td>{data.migrantcollegeGraduateMale}</td>
                      <td>{data.migrantcollegeGraduateFemale}</td>
                      <td>{data.migrantpostGraduateMale}</td>
                      <td>{data.migrantpostGraduateFemale}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.migrantnoEducationMale}</td>
                  <td>{totals.migrantnoEducationFemale}</td>
                  <td>{totals.migrantpreSchoolMale}</td>
                  <td>{totals.migrantpreSchoolFemale}</td>
                  <td>{totals.migrantelementaryMale}</td>
                  <td>{totals.migrantelementaryFemale}</td>
                  <td>{totals.migrantelementaryGraduateMale}</td>
                  <td>{totals.migrantelementaryGraduateFemale}</td>
                  <td>{totals.migranthighSchoolMale}</td>
                  <td>{totals.migranthighSchoolFemale}</td>
                  <td>{totals.migranthighSchoolGraduateMale}</td>
                  <td>{totals.migranthighSchoolGraduateFemale}</td>
                  <td>{totals.migrantjuniorHighSchoolMale}</td>
                  <td>{totals.migrantjuniorHighSchoolFemale}</td>
                  <td>{totals.migrantjuniorHighSchoolGraduateMale}</td>
                  <td>{totals.migrantjuniorHighSchoolGraduateFemale}</td>
                  <td>{totals.migrantseniorHighSchoolMale}</td>
                  <td>{totals.migrantseniorHighSchoolFemale}</td>
                  <td>{totals.migrantseniorHighSchoolGraduateMale}</td>
                  <td>{totals.migrantseniorHighSchoolGraduateFemale}</td>
                  <td>{totals.migrantvocationalMale}</td>
                  <td>{totals.migrantvocationalFemale}</td>
                  <td>{totals.migrantcollegeMale}</td>
                  <td>{totals.migrantcollegeFemale}</td>
                  <td>{totals.migrantcollegeGraduateMale}</td>
                  <td>{totals.migrantcollegeGraduateFemale}</td>
                  <td>{totals.migrantpostGraduateMale}</td>
                  <td>{totals.migrantpostGraduateFemale}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-4 ${orientation}`}>
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
                  <th colSpan={28}>Migrants</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>No Education</th>
                  <th colSpan={2}>Pre-school</th>
                  <th colSpan={2}>Elementary Level</th>
                  <th colSpan={2}>Elementary Graduate</th>
                  <th colSpan={2}>High School Level</th>
                  <th colSpan={2}>High School Graduate</th>
                  <th colSpan={2}>Junior HS Level</th>
                  <th colSpan={2}>Junior HS Graduate</th>
                  <th colSpan={2}>Senior HS Level</th>
                  <th colSpan={2}>Senior HS Graduate</th>
                  <th colSpan={2}>Vocational / Technical</th>
                  <th colSpan={2}>College Level</th>
                  <th colSpan={2}>College Graduate</th>
                  <th colSpan={2}>Post-graduate</th>
                </tr>
                <tr>
                  <th></th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                  <th className='w-[30px]'>M</th>
                  <th className='w-[30px]'>F</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientnoEducationMale}</td>
                      <td>{data.transientnoEducationFemale}</td>
                      <td>{data.transientpreSchoolMale}</td>
                      <td>{data.transientpreSchoolFemale}</td>
                      <td>{data.transientelementaryMale}</td>
                      <td>{data.transientelementaryFemale}</td>
                      <td>{data.transientelementaryGraduateMale}</td>
                      <td>{data.transientelementaryGraduateFemale}</td>
                      <td>{data.transienthighSchoolMale}</td>
                      <td>{data.transienthighSchoolFemale}</td>
                      <td>{data.transienthighSchoolGraduateMale}</td>
                      <td>{data.transienthighSchoolGraduateFemale}</td>
                      <td>{data.transientjuniorHighSchoolMale}</td>
                      <td>{data.transientjuniorHighSchoolFemale}</td>
                      <td>{data.transientjuniorHighSchoolGraduateMale}</td>
                      <td>{data.transientjuniorHighSchoolGraduateFemale}</td>
                      <td>{data.transientseniorHighSchoolMale}</td>
                      <td>{data.transientseniorHighSchoolFemale}</td>
                      <td>{data.transientseniorHighSchoolGraduateMale}</td>
                      <td>{data.transientseniorHighSchoolGraduateFemale}</td>
                      <td>{data.transientvocationalMale}</td>
                      <td>{data.transientvocationalFemale}</td>
                      <td>{data.transientcollegeMale}</td>
                      <td>{data.transientcollegeFemale}</td>
                      <td>{data.transientcollegeGraduateMale}</td>
                      <td>{data.transientcollegeGraduateFemale}</td>
                      <td>{data.transientpostGraduateMale}</td>
                      <td>{data.transientpostGraduateFemale}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.transientnoEducationMale}</td>
                  <td>{totals.transientnoEducationFemale}</td>
                  <td>{totals.transientpreSchoolMale}</td>
                  <td>{totals.transientpreSchoolFemale}</td>
                  <td>{totals.transientelementaryMale}</td>
                  <td>{totals.transientelementaryFemale}</td>
                  <td>{totals.transientelementaryGraduateMale}</td>
                  <td>{totals.transientelementaryGraduateFemale}</td>
                  <td>{totals.transienthighSchoolMale}</td>
                  <td>{totals.transienthighSchoolFemale}</td>
                  <td>{totals.transienthighSchoolGraduateMale}</td>
                  <td>{totals.transienthighSchoolGraduateFemale}</td>
                  <td>{totals.transientjuniorHighSchoolMale}</td>
                  <td>{totals.transientjuniorHighSchoolFemale}</td>
                  <td>{totals.transientjuniorHighSchoolGraduateMale}</td>
                  <td>{totals.transientjuniorHighSchoolGraduateFemale}</td>
                  <td>{totals.transientseniorHighSchoolMale}</td>
                  <td>{totals.transientseniorHighSchoolFemale}</td>
                  <td>{totals.transientseniorHighSchoolGraduateMale}</td>
                  <td>{totals.transientseniorHighSchoolGraduateFemale}</td>
                  <td>{totals.transientvocationalMale}</td>
                  <td>{totals.transientvocationalFemale}</td>
                  <td>{totals.transientcollegeMale}</td>
                  <td>{totals.transientcollegeFemale}</td>
                  <td>{totals.transientcollegeGraduateMale}</td>
                  <td>{totals.transientcollegeGraduateFemale}</td>
                  <td>{totals.transientpostGraduateMale}</td>
                  <td>{totals.transientpostGraduateFemale}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableSeven