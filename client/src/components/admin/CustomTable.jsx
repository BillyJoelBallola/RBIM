import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios';

import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const CustomTable = ({ headers, data, actions, description = '', limit = 5}) => {
  const [address, setAddress] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = limit;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

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

  const titleStyle = (rowData) => {
    return <p className='truncate max-w-[350px]'>{rowData}</p>
  }

  const status = (rowData) => {
    switch(rowData){
      case 1:
        return <div className='py-1 px-2 text-xs text-green-700 bg-green-200 max-w-min rounded-lg'>active</div>
      case 2:
        return <div className='py-1 px-2 text-xs text-red-700 bg-red-200 max-w-min rounded-lg'>inactive</div>
    }
  }

  const activityType = (rowData) => {
    switch(Number(rowData)){
      case 1:
        return <span>Event</span>
      case 2:
        return <span>Program</span>
      case 3:
        return <span>Announcement</span>
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <p className='text-gray-400 mb-4'>{description}</p>
        <div className='flex gap-4 items-center mb-4 justify-end'>
          <span className='text-sm text-gray-500'>{`${data?.length < limit ? '' : totalPages === 0 ? '0' : currentPage/totalPages}`}</span>
          <div className='flex gap-1'>  
            <button className='cursor-pointer p-2 rounded-full hover:bg-gray-200 text-gray-500 grid place-items-center' onClick={handlePrevPage} disabled={currentPage === 1}><MdArrowBackIosNew /></button>
            <button className='cursor-pointer p-2 rounded-full hover:bg-gray-200 text-gray-500 grid place-items-center' onClick={handleNextPage} disabled={currentPage === totalPages}><MdArrowForwardIos /></button>
          </div>
        </div>
      </div>
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
                  data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((rowData, idx) => (
                    <tr className="border-b" key={idx}>
                      {headers?.map((header, index) => (
                        <td className="px-6 py-4 whitespace-nowrap" key={index}>
                          {
                            header.key === 'address' ?
                            addressFormat(rowData[header.key]) :
                            header.key.includes('date') ?
                            dateFormat(rowData[header.key]) :
                            header.key.includes('title') ?
                            titleStyle(rowData[header.key]) :
                            header.key.includes('status') ?
                            status(rowData[header.key]) :
                            header.key.includes('type') ?
                            activityType(rowData[header.key]) :
                            (rowData[header.key])
                          }
                        </td>
                      ))} 
                      {actions && (
                        <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center">
                          {actions.map((action, actionIdx) => (
                            <button
                              key={actionIdx}
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
    </>
  );
};

export default CustomTable;
