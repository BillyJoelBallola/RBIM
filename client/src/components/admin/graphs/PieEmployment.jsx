import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const PieEmployment = ({ data, selectedAddress }) => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [pieEmploymentData, setPieEmploymentData] = useState([])

    useEffect(() => {
        if(data.length > 0){
            const employed = Number(selectedAddress) !== 0 
            ? data?.filter(item => [1, 2].includes(Number(item.Q16)) && Number(item.address) === Number(selectedAddress))?.length || 0
            : data?.filter(item => [1, 2].includes(Number(item.Q16)))?.length || 0
            const unEmployed = Number(selectedAddress) !== 0 
            ? data?.filter(item => ![1, 2].includes(Number(item.Q16)) && Number(item.address) === Number(selectedAddress))?.length || 0
            : data?.filter(item => ![1, 2].includes(Number(item.Q16)))?.length || 0
            setPieEmploymentData([employed, unEmployed])
        }
    }, [data, selectedAddress])

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
          labels: ['Employed', 'Unemployed'],
          datasets: [
            {
                data: pieEmploymentData,
                backgroundColor: [
                    documentStyle.getPropertyValue('--green-500'),
                    documentStyle.getPropertyValue('--yellow-500') 
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--green-400'),
                    documentStyle.getPropertyValue('--yellow-400') 
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
    }, [pieEmploymentData]);

    return (
        <div className='w-full md:w-fit grid place-items-center border bg-gray-100 rounded-lg p-4'>
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>    
    )
}

export default PieEmployment