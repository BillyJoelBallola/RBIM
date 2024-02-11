import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const LineMigrant = ({ yearRange, data }) => {
    const currentYear = new Date().getFullYear();
    const [lineChartData, setLineChartData] = useState({});
    const [lineChartOptions, setLineChartOptions] = useState({});
    const [lineGraphData, setLineGraphData] = useState({
        nonMigrants: [],
        migrants: [],
        transients: []
    })

    function generateYears(startYear, endYear) {
        const years = [];

        for (let year = startYear; year > endYear; year--) {
            years.push(year);
        }

        return years;
    }

    const pastYear5 = currentYear - 5;
    const pastYear10 = currentYear - 10;
    const pastYear15 = currentYear - 15;

    const yearsBetween5 = generateYears(currentYear, pastYear5);
    const yearsBetween10 = generateYears(currentYear, pastYear10);
    const yearsBetween15 = generateYears(currentYear, pastYear15);

    useEffect(() => {
        if(data.length > 0){
            const years = Number(yearRange) === 5 
                ? yearsBetween5 
                : Number(yearRange) === 10 
                ? yearsBetween10
                : Number(yearRange) === 15 
                ? yearsBetween15 : []
            
            const nonMigrants = []
            const migrants = []
            const transients = []
                
            for(let i = 0; i < years?.length; i++){
                nonMigrants.push(data.filter(item => new Date(item?.date_encoded).getFullYear() === years[i] && Number(item?.Q36) === 1)?.length || 0)
                migrants.push(data.filter(item => new Date(item?.date_encoded).getFullYear() === years[i] && Number(item?.Q36) === 2)?.length || 0)
                transients.push(data.filter(item => new Date(item?.date_encoded).getFullYear() === years[i] && Number(item?.Q36) === 3)?.length || 0)
                setLineGraphData({ nonMigrants, migrants, transients });
            }
        }
    }, [data, yearRange])

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: Number(yearRange) === 5 
                ? yearsBetween5?.reverse() 
                : Number(yearRange) === 10 
                ? yearsBetween10?.reverse()
                : Number(yearRange) === 15 
                ? yearsBetween15?.reverse() : [],
            datasets: [
                {
                    label: 'Migrant',
                    data: lineGraphData?.migrants?.reverse(),
                    fill: true,
                    borderColor: 'rgba(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4
                },
                {
                    label: 'Non Migrant',
                    data: lineGraphData?.nonMigrants?.reverse(),
                    fill: true,
                    borderColor: 'rgba(255, 159, 64)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',

                    tension: 0.4
                },
                {
                    label: 'Transient',
                    data: lineGraphData?.transients,
                    fill: true,
                    borderColor: 'rgba(245, 39, 152)',
                    backgroundColor: 'rgba(245, 39, 152, 0.2)',
                    tension: 0.4
                }
            ]
        };
    
        const options = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    
        setLineChartData(data);
        setLineChartOptions(options);
    }, [yearRange, lineGraphData]);

    return (
        <Chart type="line" data={lineChartData} options={lineChartOptions} />
    )
}

export default LineMigrant