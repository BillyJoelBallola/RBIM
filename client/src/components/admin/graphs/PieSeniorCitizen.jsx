import React, { useEffect, useState } from 'react'
import { Tooltip } from 'primereact/tooltip';
import { Chart } from 'primereact/chart';
import { CgInfo } from "react-icons/cg"

const PieSeniorCitizen = ({ data, selectedAddress, selectedYear, address }) => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [pieSeniorCitizenData, setPieSeniorCitizenData] = useState([])

    useEffect(() => {
        if(data?.length > 0){
            const registered = Number(selectedAddress) !== 0 
                ? data?.filter(item => Number(item.Q31) === 1 && Number(item.address) === Number(selectedAddress) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
                : data?.filter(item => Number(item.Q31) === 1 && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
            const unRegistered = Number(selectedAddress) !== 0 
                ? data?.filter(item => !Number(item.Q31) === 2 && Number(item.address) === Number(selectedAddress) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
                : data?.filter(item => !Number(item.Q31) === 2 && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
            setPieSeniorCitizenData([registered, unRegistered])
        }
    }, [data, selectedAddress, selectedYear])
    

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

    const location = selectedAddress !== 0 ? address?.filter(item => item.id === Number(selectedAddress)) : 'Municipal'
    
    return (
        <div className='w-full md:w-fit grid place-items-center border bg-gray-100 rounded-lg p-4 relative'>
            <Tooltip target='.senior' mouseTrack mouseTrackLeft={10} position='left' className='tiptap text-xs'>
                <p>In {selectedYear}, {typeof location === 'object' ? location[0].barangay  : location} has accounted for a total of {(pieSeniorCitizenData[0] + pieSeniorCitizenData[1]) || 0} senior citizens.</p>
                <p>Among them, {pieSeniorCitizenData[0] || 0} are officially registered residents, while {pieSeniorCitizenData[1] || 0} senior citizens remain unregistered.</p>
            </Tooltip>
            <CgInfo className='senior absolute right-1 top-1 text-xl text-gray-500' />
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>        
    )
}

export default PieSeniorCitizen