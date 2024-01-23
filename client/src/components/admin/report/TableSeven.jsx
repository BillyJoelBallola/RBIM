import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableSeven = ({ location, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableSevenReport = async () => {
      const { data } = await axios.get('/api/table_seven')
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableSevenReport()
  }, [])

  return (
    <>
      <div className={`bg-white py-1 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <img src={logo} className='w-20 aspect-square' alt="rbim_logo" />
            <div className='grid text-center'>
                <span className='font-semibold'>Ibabang butnong [{moment(new Date()).format('l')}]</span>
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
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-1 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <img src={logo} className='w-20 aspect-square' alt="rbim_logo" />
            <div className='grid text-center'>
                <span className='font-semibold'>Ibabang butnong [{moment(new Date()).format('l')}]</span>
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
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-1 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <img src={logo} className='w-20 aspect-square' alt="rbim_logo" />
            <div className='grid text-center'>
                <span className='font-semibold'>Ibabang butnong [{moment(new Date()).format('l')}]</span>
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
                  <td>Total</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableSeven