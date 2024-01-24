import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableNineteen = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableNineteenReport = async () => {
      const { data } = await axios.get(`/api/table_nineteen/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableNineteenReport()
  }, [])

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
                  <th>Number of Living Children</th>
                  <th colSpan={10}>Non-Migrants</th>
                  <th>Overall Total</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Female Sterilization / Ligation</th>
                  <th>Male Sterilization / Vasectomy</th>
                  <th>IUD</th>
                  <th>Injectables</th>
                  <th>Implants</th>
                  <th>Pills</th>
                  <th>Condom</th>
                  <th>Modern Natural FP</th>
                  <th>LAM</th>
                  <th>None</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.livingChildren}</td>
                      <td>{data.nonMigrantfemaleSterilization}</td>
                      <td>{data.nonMigrantmaleSterilization}</td>
                      <td>{data.nonMigrantiud}</td>
                      <td>{data.nonMigrantinjectibles}</td>
                      <td>{data.nonMigrantimplants}</td>
                      <td>{data.nonMigrantpill}</td>
                      <td>{data.nonMigrantcondom}</td>
                      <td>{data.nonMigrantmodern}</td>
                      <td>{data.nonMigrantlam}</td>
                      <td>{data.nonMigranttraditional}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
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
                  <th>Number of Living Children</th>
                  <th colSpan={10}>Migrants</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Female Sterilization / Ligation</th>
                  <th>Male Sterilization / Vasectomy</th>
                  <th>IUD</th>
                  <th>Injectables</th>
                  <th>Implants</th>
                  <th>Pills</th>
                  <th>Condom</th>
                  <th>Modern Natural FP</th>
                  <th>LAM</th>
                  <th>None</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.livingChildren}</td>
                      <td>{data.migrantfemaleSterilization}</td>
                      <td>{data.migrantmaleSterilization}</td>
                      <td>{data.migrantiud}</td>
                      <td>{data.migrantinjectibles}</td>
                      <td>{data.migrantimplants}</td>
                      <td>{data.migrantpill}</td>
                      <td>{data.migrantcondom}</td>
                      <td>{data.migrantmodern}</td>
                      <td>{data.migrantlam}</td>
                      <td>{data.migranttraditional}</td>
                    </tr>
                  ))
                }
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
                  <th>Number of Living Children</th>
                  <th colSpan={10}>Migrants</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th></th>
                  <th>Female Sterilization / Ligation</th>
                  <th>Male Sterilization / Vasectomy</th>
                  <th>IUD</th>
                  <th>Injectables</th>
                  <th>Implants</th>
                  <th>Pills</th>
                  <th>Condom</th>
                  <th>Modern Natural FP</th>
                  <th>LAM</th>
                  <th>None</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.livingChildren}</td>
                      <td>{data.transientfemaleSterilization}</td>
                      <td>{data.transientmaleSterilization}</td>
                      <td>{data.transientiud}</td>
                      <td>{data.transientinjectibles}</td>
                      <td>{data.transientimplants}</td>
                      <td>{data.transientpill}</td>
                      <td>{data.transientcondom}</td>
                      <td>{data.transientmodern}</td>
                      <td>{data.transientlam}</td>
                      <td>{data.transienttraditional}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableNineteen