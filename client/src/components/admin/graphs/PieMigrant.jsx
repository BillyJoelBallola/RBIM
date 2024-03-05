import React, { useEffect, useState } from 'react'
import { Tooltip } from 'primereact/tooltip';
import { Chart } from 'primereact/chart';
import { CgInfo } from "react-icons/cg"

const PieMigrant = ({ data, selectedAddress, selectedYear, address }) => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [pieMigrantData, setPieMigrantData] = useState([])

    useEffect(() => {
        if(data?.length > 0){
            const nonMigrants = Number(selectedAddress) !== 0 
                ? data?.filter(item => Number(item.Q36) === 1 && Number(item.address) === Number(selectedAddress) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
                : data?.filter(item => Number(item.Q36) === 1 && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
            const migrants = Number(selectedAddress) !== 0 
                ? data?.filter(item => Number(item.Q36) === 2 && Number(item.address) === Number(selectedAddress) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
                : data?.filter(item => Number(item.Q36) === 2 && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
            const transients = Number(selectedAddress) !== 0 
                ? data?.filter(item => Number(item.Q36) === 2 && Number(item.address) === Number(selectedAddress) && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
                : data?.filter(item => Number(item.Q36) === 2 && new Date(item.date_encoded).getFullYear() === Number(selectedYear))?.length || 0
            setPieMigrantData([nonMigrants, migrants, transients])
        }
    }, [data, selectedAddress, selectedYear])

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

    const location = selectedAddress !== 0 ? address?.filter(item => item.id === Number(selectedAddress)) : 'Municipal'

    return (
        <div className='w-full md:w-fit grid place-items-center p-4 border bg-gray-100 rounded-lg relative'>
            <Tooltip target='.migrant' mouseTrack mouseTrackLeft={10}/>
            <CgInfo 
                className='migrant absolute right-1 top-1 text-xl text-gray-500' 
                data-pr-tooltip={`As of ${selectedYear}, there are ${pieMigrantData[0] || 0} Non-migrants, ${pieMigrantData[1] || 0} Migrants, and ${pieMigrantData[2] || 0} Transients in ${typeof location === 'object' ? location[0].barangay  : location}`}
            />
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>
    )
}

export default PieMigrant