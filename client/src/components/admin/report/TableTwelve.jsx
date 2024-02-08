import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableTwelve = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTwelveReport = async () => {
      const { data } = await axios.get(`/api/table_twelve/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTwelveReport()
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
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
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
                  <th>Perma nent Work</th>
                  <th>Casual Work</th>
                  <th>Contrac tual Work</th>
                  <th>Individual Owned Business</th>
                  <th>Shared / Partner ship</th>
                  <th>Corpo rate Busi ness</th>
                  <th>Perma nent Work</th>
                  <th>Casual Work</th>
                  <th>Contrac tual Work</th>
                  <th>Individual Owned Business</th>
                  <th>Shared / Partner ship</th>
                  <th>Corpo rate Busi ness</th>
                  <th>Perma nent Work</th>
                  <th>Casual Work</th>
                  <th>Contrac tual Work</th>
                  <th>Individual Owned Business</th>
                  <th>Shared / Partner ship</th>
                  <th>Corpo rate Busi ness</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td className='w-[80px]'>{data.age}</td>
                      <td>{data.nonMigrantpermanentMale}</td>
                      <td>{data.migrantpermanentMale}</td>
                      <td>{data.transientpermanentMale}</td>
                      <td>{data.nonMigrantcasualMale}</td>
                      <td>{data.migrantcasualMale}</td>
                      <td>{data.transientcasualMale}</td>
                      <td>{data.nonMigrantcontractualMale}</td>
                      <td>{data.migrantcontractualMale}</td>
                      <td>{data.transientcontractualMale}</td>
                      <td>{data.nonMigrantindividualMale}</td>
                      <td>{data.migrantindividualMale}</td>
                      <td>{data.transientindividualMale}</td>
                      <td>{data.nonMigrantsharedMale}</td>
                      <td>{data.migrantsharedMale}</td>
                      <td>{data.transientsharedMale}</td>
                      <td>{data.nonMigrantcorporateMale}</td>
                      <td>{data.migrantcorporateMale}</td>
                      <td>{data.transientcorporateMale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td className='w-[80px]'>Overall total</td>
                  <td>{totals.nonMigrantpermanentMale}</td>
                  <td>{totals.migrantpermanentMale}</td>
                  <td>{totals.transientpermanentMale}</td>
                  <td>{totals.nonMigrantcasualMale}</td>
                  <td>{totals.migrantcasualMale}</td>
                  <td>{totals.transientcasualMale}</td>
                  <td>{totals.nonMigrantcontractualMale}</td>
                  <td>{totals.migrantcontractualMale}</td>
                  <td>{totals.transientcontractualMale}</td>
                  <td>{totals.nonMigrantindividualMale}</td>
                  <td>{totals.migrantindividualMale}</td>
                  <td>{totals.transientindividualMale}</td>
                  <td>{totals.nonMigrantsharedMale}</td>
                  <td>{totals.migrantsharedMale}</td>
                  <td>{totals.transientsharedMale}</td>
                  <td>{totals.nonMigrantcorporateMale}</td>
                  <td>{totals.migrantcorporateMale}</td>
                  <td>{totals.transientcorporateMale}</td>
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
                  <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                  <th colSpan={18}>Female</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={6}>Non-Migrants</th>
                  <th colSpan={6}>Migrants</th>
                  <th colSpan={6}>Transients</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Perma nent Work</th>
                  <th>Casual Work</th>
                  <th>Contrac tual Work</th>
                  <th>Individual Owned Business</th>
                  <th>Shared / Partner ship</th>
                  <th>Corpo rate Busi ness</th>
                  <th>Perma nent Work</th>
                  <th>Casual Work</th>
                  <th>Contrac tual Work</th>
                  <th>Individual Owned Business</th>
                  <th>Shared / Partner ship</th>
                  <th>Corpo rate Busi ness</th>
                  <th>Perma nent Work</th>
                  <th>Casual Work</th>
                  <th>Contrac tual Work</th>
                  <th>Individual Owned Business</th>
                  <th>Shared / Partner ship</th>
                  <th>Corpo rate Busi ness</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td className='w-[100px]'>{data.age}</td>
                      <td>{data.nonMigrantpermanentFemale}</td>
                      <td>{data.migrantpermanentFemale}</td>
                      <td>{data.transientpermanentFemale}</td>
                      <td>{data.nonMigrantcasualFemale}</td>
                      <td>{data.migrantcasualFemale}</td>
                      <td>{data.transientcasualFemale}</td>
                      <td>{data.nonMigrantcontractualFemale}</td>
                      <td>{data.migrantcontractualFemale}</td>
                      <td>{data.transientcontractualFemale}</td>
                      <td>{data.nonMigrantindividualFemale}</td>
                      <td>{data.migrantindividualFemale}</td>
                      <td>{data.transientindividualFemale}</td>
                      <td>{data.nonMigrantsharedFemale}</td>
                      <td>{data.migrantsharedFemale}</td>
                      <td>{data.transientsharedFemale}</td>
                      <td>{data.nonMigrantcorporateFemale}</td>
                      <td>{data.migrantcorporateFemale}</td>
                      <td>{data.transientcorporateFemale}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td className='w-[80px]'>Overall total</td>
                  <td>{totals.nonMigrantpermanentFemale}</td>
                  <td>{totals.migrantpermanentFemale}</td>
                  <td>{totals.transientpermanentFemale}</td>
                  <td>{totals.nonMigrantcasualFemale}</td>
                  <td>{totals.migrantcasualFemale}</td>
                  <td>{totals.transientcasualFemale}</td>
                  <td>{totals.nonMigrantcontractualFemale}</td>
                  <td>{totals.migrantcontractualFemale}</td>
                  <td>{totals.transientcontractualFemale}</td>
                  <td>{totals.nonMigrantindividualFemale}</td>
                  <td>{totals.migrantindividualFemale}</td>
                  <td>{totals.transientindividualFemale}</td>
                  <td>{totals.nonMigrantsharedFemale}</td>
                  <td>{totals.migrantsharedFemale}</td>
                  <td>{totals.transientsharedFemale}</td>
                  <td>{totals.nonMigrantcorporateFemale}</td>
                  <td>{totals.migrantcorporateFemale}</td>
                  <td>{totals.transientcorporateFemale}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableTwelve