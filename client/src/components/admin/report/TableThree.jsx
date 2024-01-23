import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableThree = ({ location, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThreeReport = async () => {
      const { data } = await axios.get('/api/table_three')
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableThreeReport()
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
                  <th className='w-16'>Age</th>
                  <th colSpan={7}>Non-Migrants</th>
                  <th>Overall Total</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Single</th>
                  <th>Married</th>
                  <th>Living-in</th>
                  <th>Widowed</th>
                  <th>Seperated</th>
                  <th>Divorced</th>
                  <th>Unknown</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantsingle}</td>
                      <td>{data.nonMigrantmarried}</td>
                      <td>{data.nonMigrantlivingIn}</td>
                      <td>{data.nonMigrantwidowed}</td>
                      <td>{data.nonMigrantseparated}</td>
                      <td>{data.nonMigrantdivorced}</td>
                      <td>{data.nonMigrantunknown}</td>
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
                  <th className='w-16'>Age</th>
                  <th colSpan={7}>Migrants</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Single</th>
                  <th>Married</th>
                  <th>Living-in</th>
                  <th>Widowed</th>
                  <th>Seperated</th>
                  <th>Divorced</th>
                  <th>Unknown</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantsingle}</td>
                      <td>{data.nonMigrantmarried}</td>
                      <td>{data.nonMigrantlivingIn}</td>
                      <td>{data.nonMigrantwidowed}</td>
                      <td>{data.nonMigrantseparated}</td>
                      <td>{data.nonMigrantdivorced}</td>
                      <td>{data.nonMigrantunknown}</td>
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
                  <th className='w-16'>Age</th>
                  <th colSpan={7}>Transients</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Single</th>
                  <th>Married</th>
                  <th>Living-in</th>
                  <th>Widowed</th>
                  <th>Seperated</th>
                  <th>Divorced</th>
                  <th>Unknown</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientsingle}</td>
                      <td>{data.transientmarried}</td>
                      <td>{data.transientlivingIn}</td>
                      <td>{data.transientwidowed}</td>
                      <td>{data.transientseparated}</td>
                      <td>{data.transientdivorced}</td>
                      <td>{data.transientunknown}</td>
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
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableThree