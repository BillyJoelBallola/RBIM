import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const PieSeniorCitizen = ({ data, selectedAddress }) => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [pieSeniorCitizenData, setPieSeniorCitizenData] = useState([])

    useEffect(() => {
        if(data.length > 0){
            const registered = Number(selectedAddress) !== 0 
            ? data?.filter(item => Number(item.Q31) === 1 && Number(item.address) === Number(selectedAddress))?.length || 0
            : data?.filter(item => Number(item.Q31) === 1)?.length || 0
            const unRegistered = Number(selectedAddress) !== 0 
            ? data?.filter(item => !Number(item.Q31) === 2 && Number(item.address) === Number(selectedAddress))?.length || 0
            : data?.filter(item => !Number(item.Q31) === 2)?.length || 0
            setPieSeniorCitizenData([registered, unRegistered])
        }
    }, [data, selectedAddress])
    

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
          labels: ['Registered Senior Citizen', 'Unregistered Senior Citizen'],
          datasets: [
            {
                data: pieSeniorCitizenData,
                backgroundColor: [
                    documentStyle.getPropertyValue('--teal-500'), 
                    documentStyle.getPropertyValue('--blue-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--teal-400'), 
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
    }, [pieSeniorCitizenData]);

    return (
        <div className='w-full md:w-fit grid place-items-center border bg-gray-100 rounded-lg p-4'>
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>        
    )
}

export default PieSeniorCitizen