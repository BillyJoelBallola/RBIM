import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const PieMigrant = () => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
          labels: ['Migrants', 'Non-Migrants', 'Transients'],
          datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [
                    documentStyle.getPropertyValue('--pink-500'), 
                    documentStyle.getPropertyValue('--blue-500'), 
                    documentStyle.getPropertyValue('--green-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--orange-400'), 
                    documentStyle.getPropertyValue('--yellow-400'), 
                    documentStyle.getPropertyValue('--green-400')
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
    }, []);

    return (
        <div className='w-full md:w-fit grid place-items-center p-4 border bg-gray-100 rounded-lg'>
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>
    )
}

export default PieMigrant