import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableTwelve = ({ location, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTwelveReport = async () => {
      const { data } = await axios.get('/api/table_twelve')
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTwelveReport()
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
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
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
                  <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
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
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableTwelve