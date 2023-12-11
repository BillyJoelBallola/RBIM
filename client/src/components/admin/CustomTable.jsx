import React from 'react'

const CustomTable = ({ headers, data, actions }) => {
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
                        {rowData[header.key]}
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
