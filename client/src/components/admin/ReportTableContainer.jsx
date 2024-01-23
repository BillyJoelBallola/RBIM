import React, { useEffect, useState } from 'react'
import RBIMLogo from '../../assets/RBIM-big-black-logo.png'
import { reportTables } from '../../static/ReportTables';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { MdOutlineSimCardDownload } from 'react-icons/md';

import TableOne from './report/TableOne'
import TableThree from './report/TableThree';
import TableFour from './report/TableFour';
import TableFive from './report/TableFive';
import TableSix from './report/TableSix';
import TableSeven from './report/TableSeven';
import TableEight from './report/TableEight';
import TableNine from './report/TableNine';
import TableTen from './report/TableTen';
import TableEleven from './report/TableEleven';
import TableTwelve from './report/TableTwelve';
import TableThirteen from './report/TableThirteen';
import TableFourteen from './report/TableFourteen';
import TableFifteen from './report/TableFifteen';

const ReportTableContainer = ({ orientation, reportId, setReportId, location, forwardRef, preview, setPreview, downloadPDFFile }) => {
    const [orientaionSize, setOrientationSize] = useState("");
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        if(reportId){
            setReportData(reportTables.find(item => item.id === reportId))
        }
    }, [reportId])

    useEffect(() => {
        if(orientation === 'landscape'){
            setOrientationSize('w-[1056px] h-[816px]')
        }else if(orientation === 'portrait'){
            setOrientationSize('w-[816px] h-[1056px]')
        }
    }, [orientation])
    
    return (
        <div className={`absolute w-full ${preview ? 'z-[99999] block' : '-z-[99999] hidden'} overflow-x-hidden bg-black/90  p-10`}>
            <div className='mb-10 mx-auto'>
                <span className='text-xl text-white self-center'>Report {reportData?.label} PDF Preview</span>
                <div className='flex items-center justify-between mt-4'>
                    <button 
                        className='text-2xl text-white' 
                        onClick={() => {
                            setPreview(false)
                            setReportId(null)
                        }
                    }><HiOutlineArrowNarrowLeft /></button>
                    <button className='text-2xl text-white' onClick={() => downloadPDFFile()}><MdOutlineSimCardDownload /></button>
                </div>
            </div>
            <div className='grid place-items-center gap-10 w-full' ref={forwardRef}>
                {
                    reportId === 1 ? 
                    <TableOne orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 2 ? 
                    <></> :
                    reportId === 3 ? 
                    <TableThree orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 4 ? 
                    <TableFour orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 5 ? 
                    <TableFive orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 6 ? 
                    <TableSix orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 7 ? 
                    <TableSeven orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 8 ? 
                    <TableEight orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 9 ? 
                    <TableNine orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 10 ? 
                    <TableTen orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 11 ? 
                    <TableEleven orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 12 ? 
                    <TableTwelve orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 13 ? 
                    <TableThirteen orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 14 ? 
                    <TableFourteen orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    reportId === 15 ? 
                    <TableFifteen orientation={orientaionSize} reportDetails={reportData} logo={RBIMLogo}/> :
                    <></>
                }
            </div>
        </div>
    )
}   

export default ReportTableContainer