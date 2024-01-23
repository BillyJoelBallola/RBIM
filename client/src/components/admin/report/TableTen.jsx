import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableTen = ({ location, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTenReport = async () => {
      const { data } = await axios.get('/api/table_ten')
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTenReport()
  }, [])

  return (
    <>
      <div className={`bg-white py-2 ${orientation}`}>
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
                  <th>Under 5,000</th>
                  <th>5,000 - 9,999</th>
                  <th>10,000 - 14,999</th>
                  <th>15,000 - 19,999</th>
                  <th>20,000 - 24,999</th>
                  <th>25,000 and Above</th>
                  <th>Under 5,000</th>
                  <th>5,000 - 9,999</th>
                  <th>10,000 - 14,999</th>
                  <th>15,000 - 19,999</th>
                  <th>20,000 - 24,999</th>
                  <th>25,000 and Above</th>
                  <th>Under 5,000</th>
                  <th>5,000 - 9,999</th>
                  <th>10,000 - 14,999</th>
                  <th>15,000 - 19,999</th>
                  <th>20,000 - 24,999</th>
                  <th>25,000 and Above</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td className='w-[100px]'>{data.age}</td>
                      <td>{data.nonMigrant_5KMale}</td>
                      <td>{data.nonMigrant_9KMale}</td>
                      <td>{data.nonMigrant_25KMale}</td>
                      <td>{data.migrant_5KMale}</td>
                      <td>{data.migrant_9KMale}</td>
                      <td>{data.migrant_25KMale}</td>
                      <td>{data.transient_5KMale}</td>
                      <td>{data.transient_9KMale}</td>
                      <td>{data.transient_25KMale}</td>
                      <td>{data.nonMigrant_14KMale}</td>
                      <td>{data.migrant_14KMale}</td>
                      <td>{data.transient_14KMale}</td>
                      <td>{data.nonMigrant_19KMale}</td>
                      <td>{data.migrant_19KMale}</td>
                      <td>{data.transient_19KMale}</td>
                      <td>{data.nonMigrant_24KMale}</td>
                      <td>{data.migrant_24KMale}</td>
                      <td>{data.transient_24KMale}</td>
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
      <div className={`bg-white py-2 ${orientation}`}>
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
                  <th colSpan={18}>Male</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={6}>Non-Migrants</th>
                  <th colSpan={6}>Migrants</th>
                  <th colSpan={6}>Transients</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Under 5,000</th>
                  <th>5,000 - 9,999</th>
                  <th>10,000 - 14,999</th>
                  <th>15,000 - 19,999</th>
                  <th>20,000 - 24,999</th>
                  <th>25,000 and Above</th>
                  <th>Under 5,000</th>
                  <th>5,000 - 9,999</th>
                  <th>10,000 - 14,999</th>
                  <th>15,000 - 19,999</th>
                  <th>20,000 - 24,999</th>
                  <th>25,000 and Above</th>
                  <th>Under 5,000</th>
                  <th>5,000 - 9,999</th>
                  <th>10,000 - 14,999</th>
                  <th>15,000 - 19,999</th>
                  <th>20,000 - 24,999</th>
                  <th>25,000 and Above</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td className='w-[100px]'>{data.age}</td>
                      <td>{data.nonMigrant_5KMale}</td>
                      <td>{data.nonMigrant_9KMale}</td>
                      <td>{data.nonMigrant_25KMale}</td>
                      <td>{data.migrant_5KMale}</td>
                      <td>{data.migrant_9KMale}</td>
                      <td>{data.migrant_25KMale}</td>
                      <td>{data.transient_5KMale}</td>
                      <td>{data.transient_9KMale}</td>
                      <td>{data.transient_25KMale}</td>
                      <td>{data.nonMigrant_14KMale}</td>
                      <td>{data.migrant_14KMale}</td>
                      <td>{data.transient_14KMale}</td>
                      <td>{data.nonMigrant_19KMale}</td>
                      <td>{data.migrant_19KMale}</td>
                      <td>{data.transient_19KMale}</td>
                      <td>{data.nonMigrant_24KMale}</td>
                      <td>{data.migrant_24KMale}</td>
                      <td>{data.transient_24KMale}</td>
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

export default TableTen