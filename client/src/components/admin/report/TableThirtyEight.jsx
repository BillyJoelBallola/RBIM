import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { getSum } from '../../../helper/getSum'

const TableThirtyEight = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchTableThirtyEightReport = async () => {
      const { data } = await axios.get(`/api/table_thirtyEight/${address}/${dateFrom}/${dateTo}`)
      if(data.success){
        setReportData(data.data)
      }
    }

    fetchTableThirtyEightReport()
  }, [])

  const totals = getSum(reportData)

  return (
    <>
      <div className={`bg-white py-4 ${orientation}`}>
        <div className='text-sm grid gap-2 place-items-center mb-4'>
            {/* <img src={logo} className='w-16 aspect-square' alt="rbim_logo" /> */}
            <div className='grid text-center'>
              <span className='font-semibold'>{Number(address) !== 0 ? addresses?.find(item => item.id === Number(address))?.barangay : 'Municipal'} [{moment(dateFrom).format('LL')} - {moment(dateTo).format('LL')}]</span>
              <span className='font-semibold text-xs'>{reportDetails?.label} : {reportDetails?.detail}</span>
            </div>
        </div>
        <div className='grid place-items-center'>
            <table className='report_table'>
              <thead>
                <tr>
                  <th className='w-[100px]'>Age</th>
                  <th colSpan={14}>Male</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={14}>Migrants</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Lack of Employ ment</th>
                  <th>Perce ption of better income in other place</th>
                  <th>Schoo ling</th>
                  <th>Prese nce of relative and friends in other place</th>
                  <th>Employ ment / Job relocation</th>
                  <th>Disa ster - rela ted relo cation</th>
                  <th>Retire ment</th>
                  <th>To live with parents</th>
                  <th>To live with child rens  </th>
                  <th>Marr iage</th>
                  <th>Annul ment / Div orce / Sepa ration</th>
                  <th>Commu ting related reasons</th>
                  <th>Health related reasons</th>
                  <th>Peace and Secu rity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrant_one_male}</td>
                      <td>{data.migrant_two_male}</td>
                      <td>{data.migrant_three_male}</td>
                      <td>{data.migrant_four_male}</td>
                      <td>{data.migrant_five_male}</td>
                      <td>{data.migrant_six_male}</td>
                      <td>{data.migrant_seven_male}</td>
                      <td>{data.migrant_eight_male}</td>
                      <td>{data.migrant_nine_male}</td>
                      <td>{data.migrant_ten_male}</td>
                      <td>{data.migrant_eleven_male}</td>
                      <td>{data.migrant_twelve_male}</td>
                      <td>{data.migrant_thirteen_male}</td>
                      <td>{data.migrant_fourteen_male}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.migrant_one_male}</td>
                  <td>{totals.migrant_two_male}</td>
                  <td>{totals.migrant_three_male}</td>
                  <td>{totals.migrant_four_male}</td>
                  <td>{totals.migrant_five_male}</td>
                  <td>{totals.migrant_six_male}</td>
                  <td>{totals.migrant_seven_male}</td>
                  <td>{totals.migrant_eight_male}</td>
                  <td>{totals.migrant_nine_male}</td>
                  <td>{totals.migrant_ten_male}</td>
                  <td>{totals.migrant_eleven_male}</td>
                  <td>{totals.migrant_twelve_male}</td>
                  <td>{totals.migrant_thirteen_male}</td>
                  <td>{totals.migrant_fourteen_male}</td>
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
                  <th className='w-[100px]'>Age</th>
                  <th colSpan={14}>Male</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={14}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Lack of Employ ment</th>
                  <th>Perce ption of better income in other place</th>
                  <th>Schoo ling</th>
                  <th>Prese nce of relative and friends in other place</th>
                  <th>Employ ment / Job relocation</th>
                  <th>Disa ster - rela ted relo cation</th>
                  <th>Retire ment</th>
                  <th>To live with parents</th>
                  <th>To live with child rens  </th>
                  <th>Marr iage</th>
                  <th>Annul ment / Div orce / Sepa ration</th>
                  <th>Commu ting related reasons</th>
                  <th>Health related reasons</th>
                  <th>Peace and Secu rity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transient_one_male}</td>
                      <td>{data.transient_two_male}</td>
                      <td>{data.transient_three_male}</td>
                      <td>{data.transient_four_male}</td>
                      <td>{data.transient_five_male}</td>
                      <td>{data.transient_six_male}</td>
                      <td>{data.transient_seven_male}</td>
                      <td>{data.transient_eight_male}</td>
                      <td>{data.transient_nine_male}</td>
                      <td>{data.transient_ten_male}</td>
                      <td>{data.transient_eleven_male}</td>
                      <td>{data.transient_twelve_male}</td>
                      <td>{data.transient_thirteen_male}</td>
                      <td>{data.transient_fourteen_male}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.transient_one_male}</td>
                  <td>{totals.transient_two_male}</td>
                  <td>{totals.transient_three_male}</td>
                  <td>{totals.transient_four_male}</td>
                  <td>{totals.transient_five_male}</td>
                  <td>{totals.transient_six_male}</td>
                  <td>{totals.transient_seven_male}</td>
                  <td>{totals.transient_eight_male}</td>
                  <td>{totals.transient_nine_male}</td>
                  <td>{totals.transient_ten_male}</td>
                  <td>{totals.transient_eleven_male}</td>
                  <td>{totals.transient_twelve_male}</td>
                  <td>{totals.transient_thirteen_male}</td>
                  <td>{totals.transient_fourteen_male}</td>
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
                  <th className='w-[100px]'>Age</th>
                  <th colSpan={14}>Female</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={14}>Migrants</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Lack of Employ ment</th>
                  <th>Perce ption of better income in other place</th>
                  <th>Schoo ling</th>
                  <th>Prese nce of relative and friends in other place</th>
                  <th>Employ ment / Job relocation</th>
                  <th>Disa ster - rela ted relo cation</th>
                  <th>Retire ment</th>
                  <th>To live with parents</th>
                  <th>To live with child rens  </th>
                  <th>Marr iage</th>
                  <th>Annul ment / Div orce / Sepa ration</th>
                  <th>Commu ting related reasons</th>
                  <th>Health related reasons</th>
                  <th>Peace and Secu rity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.migrant_one_female}</td>
                      <td>{data.migrant_two_female}</td>
                      <td>{data.migrant_three_female}</td>
                      <td>{data.migrant_four_female}</td>
                      <td>{data.migrant_five_female}</td>
                      <td>{data.migrant_six_female}</td>
                      <td>{data.migrant_seven_female}</td>
                      <td>{data.migrant_eight_female}</td>
                      <td>{data.migrant_nine_female}</td>
                      <td>{data.migrant_ten_female}</td>
                      <td>{data.migrant_eleven_female}</td>
                      <td>{data.migrant_twelve_female}</td>
                      <td>{data.migrant_thirteen_female}</td>
                      <td>{data.migrant_fourteen_female}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.migrant_one_female}</td>
                  <td>{totals.migrant_two_female}</td>
                  <td>{totals.migrant_three_female}</td>
                  <td>{totals.migrant_four_female}</td>
                  <td>{totals.migrant_five_female}</td>
                  <td>{totals.migrant_six_female}</td>
                  <td>{totals.migrant_seven_female}</td>
                  <td>{totals.migrant_eight_female}</td>
                  <td>{totals.migrant_nine_female}</td>
                  <td>{totals.migrant_ten_female}</td>
                  <td>{totals.migrant_eleven_female}</td>
                  <td>{totals.migrant_twelve_female}</td>
                  <td>{totals.migrant_thirteen_female}</td>
                  <td>{totals.migrant_fourteen_female}</td>
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
                  <th className='w-[100px]'>Age</th>
                  <th colSpan={14}>Female</th>
                  <th>Overall total</th>
                </tr>
                <tr>
                  <th></th>
                  <th colSpan={14}>Transients</th>
                  <th></th>
                </tr>
                <tr>
                  <th></th>
                  <th>Lack of Employ ment</th>
                  <th>Perce ption of better income in other place</th>
                  <th>Schoo ling</th>
                  <th>Prese nce of relative and friends in other place</th>
                  <th>Employ ment / Job relocation</th>
                  <th>Disa ster - rela ted relo cation</th>
                  <th>Retire ment</th>
                  <th>To live with parents</th>
                  <th>To live with child rens  </th>
                  <th>Marr iage</th>
                  <th>Annul ment / Div orce / Sepa ration</th>
                  <th>Commu ting related reasons</th>
                  <th>Health related reasons</th>
                  <th>Peace and Secu rity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.transient_one_female}</td>
                      <td>{data.transient_two_female}</td>
                      <td>{data.transient_three_female}</td>
                      <td>{data.transient_four_female}</td>
                      <td>{data.transient_five_female}</td>
                      <td>{data.transient_six_female}</td>
                      <td>{data.transient_seven_female}</td>
                      <td>{data.transient_eight_female}</td>
                      <td>{data.transient_nine_female}</td>
                      <td>{data.transient_ten_female}</td>
                      <td>{data.transient_eleven_female}</td>
                      <td>{data.transient_twelve_female}</td>
                      <td>{data.transient_thirteen_female}</td>
                      <td>{data.transient_fourteen_female}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                }
                <tr>
                  <td>Overall Total</td>
                  <td>{totals.transient_one_female}</td>
                  <td>{totals.transient_two_female}</td>
                  <td>{totals.transient_three_female}</td>
                  <td>{totals.transient_four_female}</td>
                  <td>{totals.transient_five_female}</td>
                  <td>{totals.transient_six_female}</td>
                  <td>{totals.transient_seven_female}</td>
                  <td>{totals.transient_eight_female}</td>
                  <td>{totals.transient_nine_female}</td>
                  <td>{totals.transient_ten_female}</td>
                  <td>{totals.transient_eleven_female}</td>
                  <td>{totals.transient_twelve_female}</td>
                  <td>{totals.transient_thirteen_female}</td>
                  <td>{totals.transient_fourteen_female}</td>
                  <td>{totals.total}</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableThirtyEight