import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const PieMigrant = ({ data, selectedAddress }) => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [pieMigrantData, setPieMigrantData] = useState([])

    useEffect(() => {
        if(data.length > 0){
            const nonMigrants = Number(selectedAddress) !== 0 
            ? data?.filter(item => Number(item.Q36) === 1 && Number(item.address) === Number(selectedAddress))?.length || 0
            : data?.filter(item => Number(item.Q36) === 1)?.length || 0
            const migrants = Number(selectedAddress) !== 0 
            ? data?.filter(item => Number(item.Q36) === 2 && Number(item.address) === Number(selectedAddress))?.length || 0
            : data?.filter(item => Number(item.Q36) === 2)?.length || 0
            const transients = Number(selectedAddress) !== 0 
            ? data?.filter(item => Number(item.Q36) === 2 && Number(item.address) === Number(selectedAddress))?.length || 0
            : data?.filter(item => Number(item.Q36) === 2)?.length || 0
            setPieMigrantData([nonMigrants, migrants, transients])
        }
    }, [data, selectedAddress])

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
          labels: ['Non-Migrants', 'Migrants', 'Transients'],
          datasets: [
            {
                data: pieMigrantData,
                backgroundColor: [
                    documentStyle.getPropertyValue('--green-500'), 
                    documentStyle.getPropertyValue('--blue-500'), 
                    documentStyle.getPropertyValue('--pink-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--green-400'), 
                    documentStyle.getPropertyValue('--blue-400'), 
                    documentStyle.getPropertyValue('--pink-400')
                ]
            }
            ]
        }

        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };
    
        setPieChartData(data);
        setPieChartOptions(options);
    }, [pieMigrantData]);

    return (
        <div className='w-full md:w-fit grid place-items-center p-4 border bg-gray-100 rounded-lg'>
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>
    )
}

export default PieMigrant