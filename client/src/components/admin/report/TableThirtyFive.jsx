import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableThirtyFive = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThirtyFiveReport = async () => {
      const { data } = await axios.get(`/api/table_thirtyFive/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableThirtyFiveReport()
  }, [])

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
                  <th>&nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;</th>
                  <th colSpan={34}>Non-Migrants</th>
                  <th>Overall Total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>Refigeration and Aircondition</th>
                  <th colSpan={2}>Automotive /Heavy Equipment Servicing</th>
                  <th colSpan={2}>Metal Worker</th>
                  <th colSpan={2}>Building Wiring Installation</th>
                  <th colSpan={2}>Heavy Equipment Operation</th>
                  <th colSpan={2}>Plum bing</th>
                  <th colSpan={2}>Wel ding</th>
                  <th colSpan={2}>Carp entry</th>
                  <th colSpan={2}>Baking</th>
                  <th colSpan={2}>Dress making</th>
                  <th colSpan={2}>Ling uist</th>
                  <th colSpan={2}>Computer Graphics</th>
                  <th colSpan={2}>Pain ting</th>
                  <th colSpan={2}>Beauty Care</th>
                  <th colSpan={2}>Commercial Cooking</th>
                  <th colSpan={2}>House Keeping</th>
                  <th colSpan={2}>Message Therapy</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.nonMigrantairconditionMale}</td>
                      <td>{data.nonMigrantairconditionFemale}</td>
                      <td>{data.nonMigrantautomotiveMale}</td>
                      <td>{data.nonMigrantautomotiveFemale}</td>
                      <td>{data.nonMigrantmetalMale}</td>
                      <td>{data.nonMigrantmetalFemale}</td>
                      <td>{data.nonMigrantwiringMale}</td>
                      <td>{data.nonMigrantwiringFemale}</td>
                      <td>{data.nonMigrantequipmentMale}</td>
                      <td>{data.nonMigrantequipmentFemale}</td>
                      <td>{data.nonMigrantplumbingMale}</td>
                      <td>{data.nonMigrantplumbingFemale}</td>
                      <td>{data.nonMigrantweldingMale}</td>
                      <td>{data.nonMigrantweldingFemale}</td>
                      <td>{data.nonMigrantcarpentryMale}</td>
                      <td>{data.nonMigrantcarpentryFemale}</td>
                      <td>{data.nonMigrantbakingMale}</td>
                      <td>{data.nonMigrantbakingFemale}</td>
                      <td>{data.nonMigrantdressmakingMale}</td>
                      <td>{data.nonMigrantdressmakingFemale}</td>
                      <td>{data.nonMigrantlinguistMale}</td>
                      <td>{data.nonMigrantlinguistFemale}</td>
                      <td>{data.nonMigrantgraphicsMale}</td>
                      <td>{data.nonMigrantgraphicsFemale}</td>
                      <td>{data.nonMigrantpaintingMale}</td>
                      <td>{data.nonMigrantpaintingFemale}</td>
                      <td>{data.nonMigrantbeautyMale}</td>
                      <td>{data.nonMigrantbeautyFemale}</td>
                      <td>{data.nonMigrantcookingMale}</td>
                      <td>{data.nonMigrantcookingFemale}</td>
                      <td>{data.nonMigranthousekeepingMale}</td>
                      <td>{data.nonMigranthousekeepingFemale}</td>
                      <td>{data.nonMigrantmassageMale}</td>
                      <td>{data.nonMigrantmassageFemale}</td>
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
                  <th>&nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;</th>
                  <th colSpan={34}>Migrants</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>Refigeration and Aircondition</th>
                  <th colSpan={2}>Automotive /Heavy Equipment Servicing</th>
                  <th colSpan={2}>Metal Worker</th>
                  <th colSpan={2}>Building Wiring Installation</th>
                  <th colSpan={2}>Heavy Equipment Operation</th>
                  <th colSpan={2}>Plum bing</th>
                  <th colSpan={2}>Wel ding</th>
                  <th colSpan={2}>Carp entry</th>
                  <th colSpan={2}>Baking</th>
                  <th colSpan={2}>Dress making</th>
                  <th colSpan={2}>Ling uist</th>
                  <th colSpan={2}>Computer Graphics</th>
                  <th colSpan={2}>Pain ting</th>
                  <th colSpan={2}>Beauty Care</th>
                  <th colSpan={2}>Commercial Cooking</th>
                  <th colSpan={2}>House Keeping</th>
                  <th colSpan={2}>Message Therapy</th>
                </tr>
                <tr>
                  <th></th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrantairconditionMale}</td>
                      <td>{data.migrantairconditionFemale}</td>
                      <td>{data.migrantautomotiveMale}</td>
                      <td>{data.migrantautomotiveFemale}</td>
                      <td>{data.migrantmetalMale}</td>
                      <td>{data.migrantmetalFemale}</td>
                      <td>{data.migrantwiringMale}</td>
                      <td>{data.migrantwiringFemale}</td>
                      <td>{data.migrantequipmentMale}</td>
                      <td>{data.migrantequipmentFemale}</td>
                      <td>{data.migrantplumbingMale}</td>
                      <td>{data.migrantplumbingFemale}</td>
                      <td>{data.migrantweldingMale}</td>
                      <td>{data.migrantweldingFemale}</td>
                      <td>{data.migrantcarpentryMale}</td>
                      <td>{data.migrantcarpentryFemale}</td>
                      <td>{data.migrantbakingMale}</td>
                      <td>{data.migrantbakingFemale}</td>
                      <td>{data.migrantdressmakingMale}</td>
                      <td>{data.migrantdressmakingFemale}</td>
                      <td>{data.migrantlinguistMale}</td>
                      <td>{data.migrantlinguistFemale}</td>
                      <td>{data.migrantgraphicsMale}</td>
                      <td>{data.migrantgraphicsFemale}</td>
                      <td>{data.migrantpaintingMale}</td>
                      <td>{data.migrantpaintingFemale}</td>
                      <td>{data.migrantbeautyMale}</td>
                      <td>{data.migrantbeautyFemale}</td>
                      <td>{data.migrantcookingMale}</td>
                      <td>{data.migrantcookingFemale}</td>
                      <td>{data.migranthousekeepingMale}</td>
                      <td>{data.migranthousekeepingFemale}</td>
                      <td>{data.migrantmassageMale}</td>
                      <td>{data.migrantmassageFemale}</td>
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
                  <th>&nbsp;&nbsp;&nbsp;Age&nbsp;&nbsp;&nbsp;</th>
                  <th colSpan={34}>Transiets</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={2}>Refigeration and Aircondition</th>
                  <th colSpan={2}>Automotive /Heavy Equipment Servicing</th>
                  <th colSpan={2}>Metal Worker</th>
                  <th colSpan={2}>Building Wiring Installation</th>
                  <th colSpan={2}>Heavy Equipment Operation</th>
                  <th colSpan={2}>Plum bing</th>
                  <th colSpan={2}>Wel ding</th>
                  <th colSpan={2}>Carp entry</th>
                  <th colSpan={2}>Baking</th>
                  <th colSpan={2}>Dress making</th>
                  <th colSpan={2}>Ling uist</th>
                  <th colSpan={2}>Computer Graphics</th>
                  <th colSpan={2}>Pain ting</th>
                  <th colSpan={2}>Beauty Care</th>
                  <th colSpan={2}>Commercial Cooking</th>
                  <th colSpan={2}>House Keeping</th>
                  <th colSpan={2}>Message Therapy</th>
                </tr>
                <tr>
                  <th></th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                  <th>M</th>
                  <th>F</th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transientairconditionMale}</td>
                      <td>{data.transientairconditionFemale}</td>
                      <td>{data.transientautomotiveMale}</td>
                      <td>{data.transientautomotiveFemale}</td>
                      <td>{data.transientmetalMale}</td>
                      <td>{data.transientmetalFemale}</td>
                      <td>{data.transientwiringMale}</td>
                      <td>{data.transientwiringFemale}</td>
                      <td>{data.transientequipmentMale}</td>
                      <td>{data.transientequipmentFemale}</td>
                      <td>{data.transientplumbingMale}</td>
                      <td>{data.transientplumbingFemale}</td>
                      <td>{data.transientweldingMale}</td>
                      <td>{data.transientweldingFemale}</td>
                      <td>{data.transientcarpentryMale}</td>
                      <td>{data.transientcarpentryFemale}</td>
                      <td>{data.transientbakingMale}</td>
                      <td>{data.transientbakingFemale}</td>
                      <td>{data.transientdressmakingMale}</td>
                      <td>{data.transientdressmakingFemale}</td>
                      <td>{data.transientlinguistMale}</td>
                      <td>{data.transientlinguistFemale}</td>
                      <td>{data.transientgraphicsMale}</td>
                      <td>{data.transientgraphicsFemale}</td>
                      <td>{data.transientpaintingMale}</td>
                      <td>{data.transientpaintingFemale}</td>
                      <td>{data.transientbeautyMale}</td>
                      <td>{data.transientbeautyFemale}</td>
                      <td>{data.transientcookingMale}</td>
                      <td>{data.transientcookingFemale}</td>
                      <td>{data.transienthousekeepingMale}</td>
                      <td>{data.transienthousekeepingFemale}</td>
                      <td>{data.transientmassageMale}</td>
                      <td>{data.transientmassageFemale}</td>
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

export default TableThirtyFive