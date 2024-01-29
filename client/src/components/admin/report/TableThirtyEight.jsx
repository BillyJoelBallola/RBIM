import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

const TableThirtyEight = ({ addresses, address, dateFrom, dateTo, orientation, logo, reportDetails }) => {
  const [reportData, setReportData] = useState([])

  // useEffect(() => {
  //   const fetchTableThirtyEightReport = async () => {
  //     const { data } = await axios.get(`/api/table_thirtyEight/${address}/${dateFrom}/${dateTo}`)
  //     if(data.success){
  //       setReportData(data.data)
  //     }
  //   }

  //   fetchTableThirtyEightReport()
  // }, [])

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
                  <th>Marriage</th>
                  <th>Annulment / Divorce / Separation</th>
                  <th>Commu ting related reasons</th>
                  <th>Health related reasons</th>
                  <th>Peace and Secu rity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                } */}
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
                  <th>Marriage</th>
                  <th>Annulment / Divorce / Separation</th>
                  <th>Commu ting related reasons</th>
                  <th>Health related reasons</th>
                  <th>Peace and Secu rity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                } */}
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
                  <th>Marriage</th>
                  <th>Annulment / Divorce / Separation</th>
                  <th>Commu ting related reasons</th>
                  <th>Health related reasons</th>
                  <th>Peace and Secu rity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                } */}
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
                  <th>Marriage</th>
                  <th>Annulment / Divorce / Separation</th>
                  <th>Commu ting related reasons</th>
                  <th>Health related reasons</th>
                  <th>Peace and Secu rity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {
                  reportData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data.age}</td>
                      <td>{data.total}</td>
                    </tr>
                  ))
                } */}
              </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default TableThirtyEight