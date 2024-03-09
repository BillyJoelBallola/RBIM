import React, { useEffect, useState } from 'react'
import { Tooltip } from 'primereact/tooltip';
import { Chart } from 'primereact/chart';
import { CgInfo } from "react-icons/cg"

const PieEmployment = ({ data, selectedAddress, selectedYear, address }) => {
    const [pieChartData, setPieChartData] = useState({});
    const [pieChartOptions, setPieChartOptions] = useState({});
    const [pieEmploymentData, setPieEmploymentData] = useState([])
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
            <Tooltip target='.employment' mouseTrack mouseTrackLeft={10} position={tooltipPosition} className='tiptap text-xs'>
                <p>In {selectedYear}, the workforce in {typeof location === 'object' ? location[0]?.barangay  : location} consists of {pieEmploymentData[0] || 0} employed individuals and {pieEmploymentData[1] || 0} individuals who are currently unemployed.</p> 
                <p>This represents the distribution of employment status among our residents as depicted in the pie graph.</p>
            </Tooltip>
            <CgInfo className='employment absolute right-1 top-1 text-xl text-gray-500' />
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full max-w-[250px]" />
        </div>    
    )
}

export default PieEmployment