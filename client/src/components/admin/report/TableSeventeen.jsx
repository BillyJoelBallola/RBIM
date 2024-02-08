import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableSeventeen = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableSeventeenReport = async () => {
      const { data } = await axios.get(`/api/table_seventeen/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableSeventeenReport()
  }, [])

  const totals = getSum(reportData)

  return (
    <>
      <div className={`bg-white py-8 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
          <img src={logo} className='w-24 aspect-square' alt="rbim_logo" />
          <div className='grid text-center'>
            <span className='font-semibold'>{Number(address) !== 0 ? addresses?.find(item => item.id === Number(address))?.barangay : 'Municipal'} [{moment(dateFrom).format('LL')} - {moment(dateTo).format('LL')}]</span>
            <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
          </div>
        </div>
        <div className='grid place-items-center'>
            <table className='report_table'>
              <thead>
                <tr>
                  <th className='w-16'>Age</th>
                  <th colSpan={10}>Non-Migrants</th>
                  <th>Overall Total</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th className='w-[80px]'>1</th>
                  <th className='w-[80px]'>2</th>
                  <th className='w-[80px]'>3</th>
                  <th className='w-[80px]'>4</th>
                  <th className='w-[80px]'>5</th>
                  <th className='w-[80px]'>6</th>
                  <th className='w-[80px]'>7</th>
                  <th className='w-[80px]'>8</th>
                  <th className='w-[80px]'>9</th>
                  <th className='w-[80px]'>10+</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantone}</td>
                      <td>{data.nonMigranttwo}</td>
                      <td>{data.nonMigrantthree}</td>
                      <td>{data.nonMigrantfour}</td>
                      <td>{data.nonMigrantfive}</td>
                      <td>{data.nonMigrantsix}</td>
                      <td>{data.nonMigrantseven}</td>
                      <td>{data.nonMigranteight}</td>
                      <td>{data.nonMigrantnine}</td>
                      <td>{data.nonMigrantten}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.nonMigrantone}</td>
                  <td>{totals.nonMigranttwo}</td>
                  <td>{totals.nonMigrantthree}</td>
                  <td>{totals.nonMigrantfour}</td>
                  <td>{totals.nonMigrantfive}</td>
                  <td>{totals.nonMigrantsix}</td>
                  <td>{totals.nonMigrantseven}</td>
                  <td>{totals.nonMigranteight}</td>
                  <td>{totals.nonMigrantnine}</td>
                  <td>{totals.nonMigrantten}</td>
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
                  <th className='w-16'>Age</th>
                  <th colSpan={10}>Migrants</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th className='w-[80px]'>1</th>
                  <th className='w-[80px]'>2</th>
                  <th className='w-[80px]'>3</th>
                  <th className='w-[80px]'>4</th>
                  <th className='w-[80px]'>5</th>
                  <th className='w-[80px]'>6</th>
                  <th className='w-[80px]'>7</th>
                  <th className='w-[80px]'>8</th>
                  <th className='w-[80px]'>9</th>
                  <th className='w-[80px]'>10+</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrantone}</td>
                      <td>{data.migranttwo}</td>
                      <td>{data.migrantthree}</td>
                      <td>{data.migrantfour}</td>
                      <td>{data.migrantfive}</td>
                      <td>{data.migrantsix}</td>
                      <td>{data.migrantseven}</td>
                      <td>{data.migranteight}</td>
                      <td>{data.migrantnine}</td>
                      <td>{data.migrantten}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.migrantone}</td>
                  <td>{totals.migranttwo}</td>
                  <td>{totals.migrantthree}</td>
                  <td>{totals.migrantfour}</td>
                  <td>{totals.migrantfive}</td>
                  <td>{totals.migrantsix}</td>
                  <td>{totals.migrantseven}</td>
                  <td>{totals.migranteight}</td>
                  <td>{totals.migrantnine}</td>
                  <td>{totals.migrantten}</td>
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
                  <th className='w-16'>Age</th>
                  <th colSpan={10}>Transients</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th className='w-[80px]'>1</th>
                  <th className='w-[80px]'>2</th>
                  <th className='w-[80px]'>3</th>
                  <th className='w-[80px]'>4</th>
                  <th className='w-[80px]'>5</th>
                  <th className='w-[80px]'>6</th>
                  <th className='w-[80px]'>7</th>
                  <th className='w-[80px]'>8</th>
                  <th className='w-[80px]'>9</th>
                  <th className='w-[80px]'>10+</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientone}</td>
                      <td>{data.transienttwo}</td>
                      <td>{data.transientthree}</td>
                      <td>{data.transientfour}</td>
                      <td>{data.transientfive}</td>
                      <td>{data.transientsix}</td>
                      <td>{data.transientseven}</td>
                      <td>{data.transienteight}</td>
                      <td>{data.transientnine}</td>
                      <td>{data.transientten}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.transientone}</td>
                  <td>{totals.transienttwo}</td>
                  <td>{totals.transientthree}</td>
                  <td>{totals.transientfour}</td>
                  <td>{totals.transientfive}</td>
                  <td>{totals.transientsix}</td>
                  <td>{totals.transientseven}</td>
                  <td>{totals.transienteight}</td>
                  <td>{totals.transientnine}</td>
                  <td>{totals.transientten}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableSeventeen