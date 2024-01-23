import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableNine = ({ location, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableNineReport = async () => {
      const { data } = await axios.get('/api/table_nine')
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableNineReport()
  }, [])

  return (
    <>
      <div className={`bg-white py-8 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <img src={logo} className='w-24 aspect-square' alt="rbim_logo" />
            <div className='grid text-center'>
                <span className='font-semibold'>Ibabang butnong [{moment(new Date()).format('l')}]</span>
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
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-8 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <img src={logo} className='w-24 aspect-square' alt="rbim_logo" />
            <div className='grid text-center'>
                <span className='font-semibold'>Ibabang butnong [{moment(new Date()).format('l')}]</span>
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
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableNine