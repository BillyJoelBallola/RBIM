import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const PieVoter = () => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
          labels: ['Registered Voter', 'Unregistered Voter'],
          datasets: [
            {
                data: [540, 325],
                backgroundColor: [
                    documentStyle.getPropertyValue('--yellow-500'), 
                    documentStyle.getPropertyValue('--blue-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--yellow-400'), 
                    documentStyle.getPropertyValue('--blue-400')
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
        <div className='w-full md:w-fit grid place-items-center border bg-gray-100 rounded-lg p-4'>
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>        
    )
}

export default PieVoter