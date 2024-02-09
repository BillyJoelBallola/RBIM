import React, { useEffect, useState } from 'react'
import Header from '../../components/admin/Header'
import { Chart } from 'primereact/chart';

const Dashboard = () => {
  const [individuals, setIndividuals] = useState([])
  const [pieChartData, setPieChartData] = useState({});
  const [pieChartOptions, setPieChartOptions] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});
  
  useEffect(() => {

  }, [])

  // pie
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ['Migrants', 'Non-Migrants', 'Transients'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'), 
            documentStyle.getPropertyValue('--yellow-500'), 
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'), 
            documentStyle.getPropertyValue('--yellow-400'), 
            documentStyle.getPropertyValue('--green-400')
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

  // line
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
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
    <>
      <Header pageName={'Dashboard'} />
      <div className='content'>
        <div className='grid md:grid-cols-2 gap-4'>
          <div className='bg-gray-200 rounded-lg w-full p-5'>
           <Chart type="line" data={lineChartData} options={lineChartOptions} className='w-full'/>
          </div>
          <div className='bg-gray-200 shadow-lg rounded-lg grid place-items-center p-5'>
            <Chart type="pie" data={pieChartData} options={pieChartOptions} className="w-full md:w-[300px]" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard