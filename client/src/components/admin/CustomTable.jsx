import React from 'react'

const CustomTable = ({ headers, data }) => {
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
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {data?.length > 0 ? (
                data.map((rowData, idx) => (
                  <tr className="border-b" key={idx}>
                    {headers?.map((header, index) => (
                      <td className="px-6 py-4 whitespace-nowrap" key={index}>
                        {rowData[header.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="p-4">
                  <td className="px-6 py-4" colSpan={headers.length + 1}>
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
