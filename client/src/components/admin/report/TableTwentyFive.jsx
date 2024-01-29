import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableTwentyFive = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableTwentyFiveReport = async () => {
      const { data } = await axios.get(`/api/table_twentyFive/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableTwentyFiveReport()
  }, [])

  return (
    <>
      <div className={`bg-white ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-2'>
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
                  <th className='w-[60px]'>Age</th>
                  <th colSpan={21}>Male</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={7}>Non-Migrants</th>
                  <th colSpan={7}>Migrants</th>
                  <th colSpan={7}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Gover ment Hospi tal</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Sta tion</th>
                  <th>Pri vate Hospi tal</th>
                  <th>Pri vate Cli nic</th>
                  <th>Phar macy</th>
                  <th>Hilot / Herba list</th>
                  <th>Gover ment Hospi tal</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Sta tion</th>
                  <th>Pri vate Hospi tal</th>
                  <th>Pri vate Cli nic</th>
                  <th>Phar macy</th>
                  <th>Hilot / Herba list</th>
                  <th>Gover ment Hospi tal</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Sta tion</th>
                  <th>Pri vate Hospi tal</th>
                  <th>Pri vate Cli nic</th>
                  <th>Phar macy</th>
                  <th>Hilot / Herba list</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigranthospitalMale}</td>
                      <td>{data.migranthospitalMale}</td>
                      <td>{data.transienthospitalMale}</td>
                      <td>{data.nonMigrantrhuMale}</td>
                      <td>{data.migrantrhuMale}</td>
                      <td>{data.transientrhuMale}</td>
                      <td>{data.nonMigranthealthStationMale}</td>
                      <td>{data.migranthealthStationMale}</td>
                      <td>{data.transienthealthStationMale}</td>
                      <td>{data.nonMigrantprivateHospitalMale}</td>
                      <td>{data.migrantprivateHospitalMale}</td>
                      <td>{data.transientprivateHospitalMale}</td>
                      <td>{data.nonMigrantprivateClinicMale}</td>
                      <td>{data.migrantprivateClinicMale}</td>
                      <td>{data.transientprivateClinicMale}</td>
                      <td>{data.nonMigrantpharmacyMale}</td>
                      <td>{data.migrantpharmacyMale}</td>
                      <td>{data.transientpharmacyMale}</td>
                      <td>{data.nonMigranthilotMale}</td>
                      <td>{data.migranthilotMale}</td>
                      <td>{data.transienthilotMale}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div>
      </div>
      <div className={`bg-white py-6 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-2'>
            <div className='grid text-center'>
              <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
            </div>
        </div>
        <div className='grid place-items-center'>
            <table className='report_table'>
              <thead>
                <tr>
                  <th className='w-[60px]'>Age</th>
                  <th colSpan={21}>Female</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={7}>Non-Migrants</th>
                  <th colSpan={7}>Migrants</th>
                  <th colSpan={7}>Transients</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Gover ment Hospi tal</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Sta tion</th>
                  <th>Pri vate Hospi tal</th>
                  <th>Pri vate Cli nic</th>
                  <th>Phar macy</th>
                  <th>Hilot / Herba list</th>
                  <th>Gover ment Hospi tal</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Sta tion</th>
                  <th>Pri vate Hospi tal</th>
                  <th>Pri vate Cli nic</th>
                  <th>Phar macy</th>
                  <th>Hilot / Herba list</th>
                  <th>Gover ment Hospi tal</th>
                  <th>RHU / Health Center</th>
                  <th>Brgy. Health Sta tion</th>
                  <th>Pri vate Hospi tal</th>
                  <th>Pri vate Cli nic</th>
                  <th>Phar macy</th>
                  <th>Hilot / Herba list</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigranthospitalFemale}</td>
                      <td>{data.migranthospitalFemale}</td>
                      <td>{data.transienthospitalFemale}</td>
                      <td>{data.nonMigrantrhuFemale}</td>
                      <td>{data.migrantrhuFemale}</td>
                      <td>{data.transientrhuFemale}</td>
                      <td>{data.nonMigranthealthStationFemale}</td>
                      <td>{data.migranthealthStationFemale}</td>
                      <td>{data.transienthealthStationFemale}</td>
                      <td>{data.nonMigrantprivateHospitalFemale}</td>
                      <td>{data.migrantprivateHospitalFemale}</td>
                      <td>{data.transientprivateHospitalFemale}</td>
                      <td>{data.nonMigrantprivateClinicFemale}</td>
                      <td>{data.migrantprivateClinicFemale}</td>
                      <td>{data.transientprivateClinicFemale}</td>
                      <td>{data.nonMigrantpharmacyFemale}</td>
                      <td>{data.migrantpharmacyFemale}</td>
                      <td>{data.transientpharmacyFemale}</td>
                      <td>{data.nonMigranthilotFemale}</td>
                      <td>{data.migranthilotFemale}</td>
                      <td>{data.transienthilotFemale}</td>
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

export default TableTwentyFive