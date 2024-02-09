import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableForty = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableFortyReport = async () => {
      const { data } = await axios.get(`/api/table_forty/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableFortyReport()
  }, [])

  const totals = getSum(reportData)

  return (
    <>
      <div className={`bg-white py-4 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            <img src={logo} className='w-16 aspect-square' alt="rbim_logo" />
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
                  <th colSpan={6}>Male</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={6}>Migrants</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>1 Year</th>
                  <th>2 Years</th>
                  <th>3 Years</th>
                  <th>4 Years</th>
                  <th>6 Years above</th>
                  <th>Will not transfer</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrantoneMale}</td>
                      <td>{data.migranttwoMale}</td>
                      <td>{data.migrantthreeMale}</td>
                      <td>{data.migrantfourMale}</td>
                      <td>{data.migrantsixMale}</td>
                      <td>{data.migrantwillNotTansferMale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.migrantoneMale}</td>
                  <td>{totals.migranttwoMale}</td>
                  <td>{totals.migrantthreeMale}</td>
                  <td>{totals.migrantfourMale}</td>
                  <td>{totals.migrantsixMale}</td>
                  <td>{totals.migrantwillNotTansferMale}</td>
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
                  <th colSpan={6}>Male</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={6}>Transients</th>
                </tr>
                <tr>
                  <th></th>
                  <th>1 Year</th>
                  <th>2 Years</th>
                  <th>3 Years</th>
                  <th>4 Years</th>
                  <th>6 Years above</th>
                  <th>Will not transfer</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientoneMale}</td>
                      <td>{data.transienttwoMale}</td>
                      <td>{data.transientthreeMale}</td>
                      <td>{data.transientfourMale}</td>
                      <td>{data.transientsixMale}</td>
                      <td>{data.transientwillNotTansferMale}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Table</td>
                  <td>{totals.transientoneMale}</td>
                  <td>{totals.transienttwoMale}</td>
                  <td>{totals.transientthreeMale}</td>
                  <td>{totals.transientfourMale}</td>
                  <td>{totals.transientsixMale}</td>
                  <td>{totals.transientwillNotTansferMale}</td>
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
                  <th colSpan={6}>Female</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={6}>Migrants</th>
                </tr>
                <tr>
                  <th></th>
                  <th>1 Year</th>
                  <th>2 Years</th>
                  <th>3 Years</th>
                  <th>4 Years</th>
                  <th>6 Years above</th>
                  <th>Will not transfer</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientoneFemale}</td>
                      <td>{data.transienttwoFemale}</td>
                      <td>{data.transientthreeFemale}</td>
                      <td>{data.transientfourFemale}</td>
                      <td>{data.transientsixFemale}</td>
                      <td>{data.transientwillNotTansferFemale}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.transientoneFemale}</td>
                  <td>{totals.transienttwoFemale}</td>
                  <td>{totals.transientthreeFemale}</td>
                  <td>{totals.transientfourFemale}</td>
                  <td>{totals.transientsixFemale}</td>
                  <td>{totals.transientwillNotTansferFemale}</td>
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
                  <th colSpan={6}>Female</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={6}>Transients</th>
                </tr>
                <tr>
                  <th></th>
                  <th>1 Year</th>
                  <th>2 Years</th>
                  <th>3 Years</th>
                  <th>4 Years</th>
                  <th>6 Years above</th>
                  <th>Will not transfer</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrantoneFemale}</td>
                      <td>{data.migranttwoFemale}</td>
                      <td>{data.migrantthreeFemale}</td>
                      <td>{data.migrantfourFemale}</td>
                      <td>{data.migrantsixFemale}</td>
                      <td>{data.migrantwillNotTansferFemale}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.migrantoneFemale}</td>
                  <td>{totals.migranttwoFemale}</td>
                  <td>{totals.migrantthreeFemale}</td>
                  <td>{totals.migrantfourFemale}</td>
                  <td>{totals.migrantsixFemale}</td>
                  <td>{totals.migrantwillNotTansferFemale}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableForty