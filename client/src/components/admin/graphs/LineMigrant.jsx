import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';

const LineMigrant = () => {
    const [lineChartData, setLineChartData] = useState({});
    const [lineChartOptions, setLineChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Migrant',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: true,
                    borderColor: 'rgba(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4
                },
                {
                    label: 'Non Migrant',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: true,
                    borderColor: 'rgba(255, 159, 64)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',

                    tension: 0.4
                },
                {
                    label: 'Transient',
                    data: [30, 50, 29, 60, 26, 17, 40],
                    fill: true,
                    borderColor: 'rgba(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
    }, []);

    return (
        <Chart type="line" data={lineChartData} options={lineChartOptions} />
    )
}

export default LineMigrant