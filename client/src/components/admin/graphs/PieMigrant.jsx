import React, { useEffect, useState } from 'react'
import { Tooltip } from 'primereact/tooltip';
import { Chart } from 'primereact/chart';
import { CgInfo } from "react-icons/cg"

const PieMigrant = ({ data, selectedAddress, selectedYear, address }) => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [pieMigrantData, setPieMigrantData] = useState([])
    const [tooltipPosition, setTooltipPosition] = useState('right')

    useEffect(() => {
        const updateTooltipPosition = () => {
            const isSmallScreen = window.innerWidth <= 768
            setTooltipPosition(isSmallScreen ? 'left' : 'right')
        };

        updateTooltipPosition()

        window.addEventListener('resize', updateTooltipPosition)

        return () => {
            window.removeEventListener('resize', updateTooltipPosition);
        };
    }, []);

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
            <Tooltip target='.migrant' mouseTrack mouseTrackLeft={10} position={tooltipPosition} className='tiptap text-xs'>
                <p>In {selectedYear}, the population composition in {typeof location === 'object' ? location[0]?.barangay  : location} is as follows:</p>
                <ul>
                    <li>Migrants: {pieMigrantData[0] || 0} individuals, representing those who have relocated to Municipal from elsewhere.</li>
                    <li>Non-migrants: {pieMigrantData[1] || 0} individuals, denoting residents who have remained in Municipal.</li>
                    <li>Transients: {pieMigrantData[2] || 0} individuals, indicating those who are temporarily staying in Municipal.</li>
                </ul>
                <p>This breakdown provides insights into the diverse population dynamics within the communit</p>
            </Tooltip>
            <CgInfo className='migrant absolute right-1 top-1 text-xl text-gray-500' />
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>
    )
}

export default PieMigrant