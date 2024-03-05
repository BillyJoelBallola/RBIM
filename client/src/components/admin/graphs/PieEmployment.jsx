import React, { useEffect, useState } from 'react'
import { Tooltip } from 'primereact/tooltip';
import { Chart } from 'primereact/chart';
import { CgInfo } from "react-icons/cg"

const PieEmployment = ({ data, selectedAddress, selectedYear, address }) => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [pieEmploymentData, setPieEmploymentData] = useState([])

    useEffect(() => {
        if (data?.length > 0) {
            const employed = Number(selectedAddress) !== 0 
                ? (data?.filter(item => [1, 2].includes(Number(item.Q16)) && Number(item.address) === Number(selectedAddress) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0)
                : (data?.filter(item => [1, 2].includes(Number(item.Q16)) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0);
    
            const unEmployed = Number(selectedAddress) !== 0 
                ? (data?.filter(item => ![1, 2].includes(Number(item.Q16)) && Number(item.address) === Number(selectedAddress) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0)
                : (data?.filter(item => ![1, 2].includes(Number(item.Q16)) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0);
    
            setPieEmploymentData([employed, unEmployed]);
        }
    }, [data, selectedAddress, selectedYear]);
    

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

    const location = selectedAddress !== 0 ? address?.filter(item => item.id === Number(selectedAddress)) : 'Municipal'

    return (
        <div className='w-full md:w-fit grid place-items-center border bg-gray-100 rounded-lg p-4 relative'>
            <Tooltip target='.migrant' mouseTrack mouseTrackLeft={10}/>
            <CgInfo 
                className='migrant absolute right-1 top-1 text-xl text-gray-500' 
                data-pr-tooltip={`As of ${selectedYear}, there are ${pieEmploymentData[0] || 0} Employed, and ${pieEmploymentData[1] || 0} Unemloyed in ${typeof location === 'object' ? location[0].barangay  : location}`}
            />
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>    
    )
}

export default PieEmployment