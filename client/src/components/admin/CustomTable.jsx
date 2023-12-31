import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios';

const CustomTable = ({ headers, data, actions }) => {
  const [address, setAddress] = useState([])

  useEffect(() => {
    const fetchAddress = async () => {
      const { data } = await axios.get('/api/address')
      if(data.success){
        setAddress(data.data)
      }
    }

    fetchAddress()
  }, [])

  const addressFormat = (rowData) => {
    const addressInfo = address?.find(item => item.id === rowData)
    return addressInfo ? `${addressInfo.barangay}, ${addressInfo.municipal}, ${addressInfo.province}` : '---'
  }

  const dateFormat = (rowData) => {
    return rowData !== '0000-00-00' ? moment(rowData).format('ll') : 'mm/dd/yyyy';
  }

  const status = (rowData) => {
    switch(rowData){
      case 1:
        return <div className='py-1 px-2 text-xs text-green-700 bg-green-200 max-w-min rounded-lg'>active</div>
      case 2:
        return <div className='py-1 px-2 text-xs text-red-700 bg-red-200 max-w-min rounded-lg'>inactive</div>
    }
  }


  return (
    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div className="inline-block min-w-full">
        <div className="overflow-hidden drop-shadow-md rounded-lg border border-gray-300">
          <table className="min-w-full bg-gray-100">
            <thead className="border-b">
              <tr>
                {headers?.map((head, idx) => (
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    key={idx}
                  >
                    {head.label}
                  </th>
                ))}
                {actions && <th scope="col" className="px-6 py-4 text-left"></th>}
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {data?.length > 0 ? (
                data.map((rowData, idx) => (
                  <tr className="border-b" key={idx}>
                    {headers?.map((header, index) => (
                      <td className="px-6 py-4 whitespace-nowrap" key={index}>
                        {
                          header.key.includes('address') ?
                          addressFormat(rowData[header.key]) :
                          header.key.includes('date') ?
                          dateFormat(rowData[header.key]) :
                          header.key.includes('status') ?
                          status(rowData[header.key]) :
                          rowData[header.key]
                        }
                      </td>
                    ))} 
                    {actions && (
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center">
                        {actions.map((action, actionIdx) => (
                          <button
                            key={actionIdx}
                            className="underline"
                            onClick={() => action.onClick({rowData, idx})}
                          >
                            {action.label}
                          </button>
                        ))}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr className="p-4">
                  <td className="px-6 py-4" colSpan={headers.length + (actions ? 1 : 0)}>
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
