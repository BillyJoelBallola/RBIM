import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableEleven = ({ location, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableElevenReport = async () => {
      const { data } = await axios.get('/api/table_eleven')
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableElevenReport()
  }, [])

  return (
    <>
      <div className={`bg-white py-4 ${orientation}`}>
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
                  <th>Age</th>
                  <th colSpan={15}>Male</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={5}>Non-Migrants</th>
                  <th colSpan={5}>Migrants</th>
                  <th colSpan={5}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Employ ment</th>
                  <th>Bussi ness</th>
                  <th>Remit tance</th>
                  <th>Inves ments</th>
                  <th>Others</th>
                  <th>Employ ment</th>
                  <th>Bussi ness</th>
                  <th>Remit tance</th>
                  <th>Inves ments</th>
                  <th>Others</th>
                  <th>Employ ment</th>
                  <th>Bussi ness</th>
                  <th>Remit tance</th>
                  <th>Inves ments</th>
                  <th>Others</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td className='w-[80px]'>{data.age}</td>
                      <td>{data.nonMigrantemploymentMale}</td>
                      <td>{data.migrantemploymentMale}</td>
                      <td>{data.transientemploymentMale}</td>
                      <td>{data.nonMigrantbusinessMale}</td>
                      <td>{data.migrantbusinessMale}</td>
                      <td>{data.transientbusinessMale}</td>
                      <td>{data.nonMigrantremittanceMale}</td>
                      <td>{data.migrantremittanceMale}</td>
                      <td>{data.transientremittanceMale}</td>
                      <td>{data.nonMigrantinvestmentsMale}</td>
                      <td>{data.migrantinvestmentsMale}</td>
                      <td>{data.transientinvestmentsMale}</td>
                      <td>{data.nonMigrantothersMale}</td>
                      <td>{data.migrantothersMale}</td>
                      <td>{data.transientothersMale}</td>
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
                </tr>
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-4 ${orientation}`}>
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
                  <th>Age</th>
                  <th colSpan={15}>Female</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={5}>Non-Migrants</th>
                  <th colSpan={5}>Migrants</th>
                  <th colSpan={5}>Transients</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Employ ment</th>
                  <th>Busi ness</th>
                  <th>Remit tance</th>
                  <th>Inves ments</th>
                  <th>Others</th>
                  <th>Employ ment</th>
                  <th>Busi ness</th>
                  <th>Remit tance</th>
                  <th>Inves ments</th>
                  <th>Others</th>
                  <th>Employ ment</th>
                  <th>Busi ness</th>
                  <th>Remit tance</th>
                  <th>Inves ments</th>
                  <th>Others</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td className='w-[80px]'>{data.age}</td>
                      <td>{data.nonMigrantemploymentFemale}</td>
                      <td>{data.migrantemploymentFemale}</td>
                      <td>{data.transientemploymentFemale}</td>
                      <td>{data.nonMigrantbusinessFemale}</td>
                      <td>{data.migrantbusinessFemale}</td>
                      <td>{data.transientbusinessFemale}</td>
                      <td>{data.nonMigrantremittanceFemale}</td>
                      <td>{data.migrantremittanceFemale}</td>
                      <td>{data.transientremittanceFemale}</td>
                      <td>{data.nonMigrantinvestmentsFemale}</td>
                      <td>{data.migrantinvestmentsFemale}</td>
                      <td>{data.transientinvestmentsFemale}</td>
                      <td>{data.nonMigrantothersFemale}</td>
                      <td>{data.migrantothersFemale}</td>
                      <td>{data.transientothersFemale}</td>
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
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableEleven