import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableEleven = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableElevenReport = async () => {
      const { data } = await axios.get(`/api/table_eleven/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableElevenReport()
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
                  <td className='w-[80px]'>Overall Total</td>
                  <td>{totals.nonMigrantemploymentMale}</td>
                  <td>{totals.migrantemploymentMale}</td>
                  <td>{totals.transientemploymentMale}</td>
                  <td>{totals.nonMigrantbusinessMale}</td>
                  <td>{totals.migrantbusinessMale}</td>
                  <td>{totals.transientbusinessMale}</td>
                  <td>{totals.nonMigrantremittanceMale}</td>
                  <td>{totals.migrantremittanceMale}</td>
                  <td>{totals.transientremittanceMale}</td>
                  <td>{totals.nonMigrantinvestmentsMale}</td>
                  <td>{totals.migrantinvestmentsMale}</td>
                  <td>{totals.transientinvestmentsMale}</td>
                  <td>{totals.nonMigrantothersMale}</td>
                  <td>{totals.migrantothersMale}</td>
                  <td>{totals.transientothersMale}</td>
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
                  <td className='w-[80px]'>Overall Total</td>
                  <td>{totals.nonMigrantemploymentFemale}</td>
                  <td>{totals.migrantemploymentFemale}</td>
                  <td>{totals.transientemploymentFemale}</td>
                  <td>{totals.nonMigrantbusinessFemale}</td>
                  <td>{totals.migrantbusinessFemale}</td>
                  <td>{totals.transientbusinessFemale}</td>
                  <td>{totals.nonMigrantremittanceFemale}</td>
                  <td>{totals.migrantremittanceFemale}</td>
                  <td>{totals.transientremittanceFemale}</td>
                  <td>{totals.nonMigrantinvestmentsFemale}</td>
                  <td>{totals.migrantinvestmentsFemale}</td>
                  <td>{totals.transientinvestmentsFemale}</td>
                  <td>{totals.nonMigrantothersFemale}</td>
                  <td>{totals.migrantothersFemale}</td>
                  <td>{totals.transientothersFemale}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableEleven