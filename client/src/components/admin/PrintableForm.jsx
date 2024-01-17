import React, { useContext, useEffect, useRef } from 'react'
import { SurveyFormContext } from '../../context/SurveyFormContext'
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { MdOutlineSimCardDownload } from "react-icons/md";
import html2canvas from 'html2canvas';
import moment from 'moment'
import jsPDF from 'jspdf';

import pageOne from '../../assets/print_page/page-1.png'
import pageTwo from '../../assets/print_page/page-2.png'
import pageThree from '../../assets/print_page/page-3.png'
import pageFour from '../../assets/print_page/page-4.png'
import pageFive from '../../assets/print_page/page-5.png'
import pageSix from '../../assets/print_page/page-6.png'

const topVal = [
    "30%",
    "34.5%",
    "38.5%",
    "43.5%",
    "48%",
    "52.5%",
    "56.5%",
    "61.5%",
    "65.5%",
    "70%"
]

const PrintableForm = ({ address, preview, setPreview }) => {
    const { household, surveyForm, membersData } = useContext(SurveyFormContext)
    const filteredAddress = address?.find(item => item.id === household?.address)
    const printableContainer = useRef(null)

    const getMonthAndYear = (date) => {
        const newDate = date?.toString()?.split("-")
        return newDate && newDate[1] + "-" + newDate[0]
    }

    const breakLines = (data) => {
        const result = []
        const formattedData = data?.toString()?.split(",")

        formattedData?.map(data => {
            if(data){
                result.push(data)
                result.push("<br>")
            }
        })

        result.pop()

        return result?.join()?.replace(/,/g, '')
    }

    const downloadPDFForm = () => {
        if (printableContainer.current) {
            const doc = new jsPDF('l', 'mm', 'a4');
            const pages = printableContainer.current.children;

            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                html2canvas(page)
                    .then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        const pageWidth = doc.internal.pageSize.getWidth();
                        const pageHeight = doc.internal.pageSize.getHeight();

                        if (i > 0) {
                            doc.addPage();
                        }
                        
                        doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
                        
                        if (i === pages.length - 1) {
                            doc.save(`${household?.household_head}-${filteredAddress?.barangay}-${moment(surveyForm?.date_encoded).format("l")}.pdf`);
                        }
                    });
            }
        }
    }

    return (
        <div className={`absolute h-auto w-full ${preview ? 'z-[99999] block' : '-z-[99999] hidden'} bg-black/90 p-10 font-semibold text-sm`}>
            <div className='mb-4'>
                <span className='text-xl text-white self-center'>Survey Form PDF Preview</span>
                <div className='flex items-center justify-between mt-4'>
                    <button className='text-2xl text-white' onClick={() => setPreview(false)}><HiOutlineArrowNarrowLeft /></button>
                    <button className='text-2xl text-white' onClick={downloadPDFForm}><MdOutlineSimCardDownload /></button>
                </div>
            </div>
            <div className='bg-red-100' ref={printableContainer}>
                <div className='relative overflow-x-hidden'>
                    <img src={pageOne} alt="page-one"/>
                    <div>
                        <span className={`absolute top-[8%] right-[1.8rem] text-right tracking-[1.3rem]`}>{household?.household_number}</span>
                        <div className={`w-4 aspect-square bg-black rounded-full absolute top-[16%] ${household?.living_type === 'household' ? 'left-[82.8%]' : 'left-[90%]'}`}/>
                        <span className={`absolute top-[43.5%] left-[59%]`}>{filteredAddress?.province}</span>
                        <span className={`absolute top-[43.5%] left-[71%] tracking-[1rem]`}>{filteredAddress?.province_code}</span>
                        <span className={`absolute top-[48%] left-[62%]`}>{filteredAddress?.municipal}</span>
                        <span className={`absolute top-[48%] left-[71%] tracking-[1rem]`}>{filteredAddress?.municipal_code}</span>
                        <span className={`absolute top-[52.5%] left-[59%]`}>{filteredAddress?.barangay}</span>
                        <span className={`absolute top-[52.5%] left-[71%] tracking-[1rem]`}>{filteredAddress?.barangay_code}</span>
                        <span className={`absolute top-[43.5%] left-[88%] w-[120px] text-xs`}>{household?.respondent_name}</span>
                        <span className={`absolute top-[48%] left-[86%] w-[140px] text-xs`}>{household?.household_head}</span>
                        <span className={`absolute top-[52.5%] right-[2.1rem] tracking-[1rem]`}>{household?.household_member_no}</span>
                        <span className={`absolute top-[56.5%] left-[59%]`}>{household?.unit_no}</span>
                        <span className={`absolute top-[56.5%] left-[78%]`}>{household?.house_no}</span>
                        <span className={`absolute top-[56.5%] left-[88%]`}>{household?.street}</span>
                        <span className={`absolute top-[74%] left-[58%] tracking-tighter text-xs`}>{moment(surveyForm?.first_visit_date).format("l")}</span>
                        <span className={`absolute top-[74%] left-[63%] tracking-tighter text-xs`}>{moment(surveyForm?.first_visit_time_start).format("LT")}</span>
                        <span className={`absolute top-[74%] left-[68%] tracking-tighter text-xs`}>{moment(surveyForm?.first_visit_time_end).format("LT")}</span>
                        <span className={`absolute top-[74%] left-[74%] tracking-tighter text-xs`}>{surveyForm?.first_visit_result}</span>
                        <span className={`absolute top-[74%] left-[77.5%] tracking-tighter text-xs`}>{moment(surveyForm?.first_visit_date_next_visit).format("l")}</span>
                        <span className={`absolute top-[74%] left-[82.5%] tracking-tighter text-xs`}>{surveyForm?.first_visit_interviewer}</span>
                        <span className={`absolute top-[74%] left-[89.8%] tracking-tighter text-xs`}>{surveyForm?.first_visit_supervisor}</span>
                        <span className={`absolute top-[78%] left-[58%] tracking-tighter text-xs`}>{surveyForm?.second_visit_date !== '0000-00-00' && moment(surveyForm?.second_visit_date).format("l")}</span>
                        <span className={`absolute top-[78%] left-[63%] tracking-tighter text-xs`}>{!surveyForm?.second_visit_time_start?.includes('00:00') && moment(surveyForm?.second_visit_time_start).format("LT")}</span>
                        <span className={`absolute top-[78%] left-[68%] tracking-tighter text-xs`}>{!surveyForm?.second_visit_time_end?.includes('00:00') && moment(surveyForm?.second_visit_time_end).format("LT")}</span>
                        <span className={`absolute top-[78%] left-[74.5%] tracking-tighter text-xs`}>{surveyForm?.second_visit_result}</span>
                        <span className={`absolute top-[78%] left-[77.5%] tracking-tighter text-xs`}>{surveyForm?.second_visit_date_next_visit !== '0000-00-00' && moment(surveyForm?.second_visit_date_next_visit).format("l")}</span>
                        <span className={`absolute top-[78%] left-[82.5%] tracking-tighter text-xs`}>{surveyForm?.second_visit_interviewer}</span>
                        <span className={`absolute top-[78%] left-[89.8%] tracking-tighter text-xs`}>{surveyForm?.second_visit_supervisor}</span>
                        <span className={`absolute top-[91.5%] left-[60%] tracking-tighter`}>{moment(surveyForm?.date_encoded).format("l")}</span>
                        <span className={`absolute top-[91.5%] left-[69%] tracking-tighter`}>{surveyForm?.encoder_name}</span>
                        <span className={`absolute top-[91.5%] left-[80.5%] tracking-tighter`}>{surveyForm?.supervisor_name}</span>
                    </div>
                </div>
                <div className='relative text-xs tracking-tighter'>
                    <img src={pageTwo} alt="page-two" />
                    {
                        membersData?.map((answer, idx) => (
                            answer?.questionsAndAnswer?.length > 0 &&
                            <div key={idx}>
                                <span className={`absolute top-[${topVal[idx]}] left-[6%] w-[200px] whitespace-pre-wrap`}>{answer.questionsAndAnswer[0]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[25%]`}>{answer.questionsAndAnswer[1]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[29.5%]`}>{answer.questionsAndAnswer[2] === 1 ? 'Male' : 'Female'}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[34.5%]`}>{answer.questionsAndAnswer[3]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[38.5%]`}>{getMonthAndYear(answer.questionsAndAnswer[4])}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[43.5%] text-[10px] w-[80px] whitespace-pre-wrap`}>{answer.questionsAndAnswer[5]}</span>
                            </div>
                        ))
                    }
                    <div>
                        <span className='absolute top-[12%] left-[54.5%]'>{membersData[0]?.questionsAndAnswer[58]}</span>
                        <span className='absolute top-[25%] left-[84%]' dangerouslySetInnerHTML={{ __html: breakLines(membersData[0]?.questionsAndAnswer[59]) }} />
                        <span className='absolute top-[30.5%] left-[84%]' dangerouslySetInnerHTML={{ __html: breakLines(membersData[0]?.questionsAndAnswer[60]) }} />
                        <span className='absolute top-[36.5%] left-[78.5%]' dangerouslySetInnerHTML={{ __html: breakLines(membersData[0]?.questionsAndAnswer[61]) }} />
                        <span className='absolute top-[43.5%] left-[78.5%]' dangerouslySetInnerHTML={{ __html: breakLines(membersData[0]?.questionsAndAnswer[62]) }} />
                        <span className='absolute top-[51%] left-[82.5%]' dangerouslySetInnerHTML={{ __html: breakLines(membersData[0]?.questionsAndAnswer[63]) }} />
                    </div>
                </div>
                <div className='relative text-xs tracking-tighter'>
                    <img src={pageThree} alt="page-three" />
                    {
                        membersData?.map((answer, idx) => (
                            answer?.questionsAndAnswer?.length > 0 &&
                            <div key={idx}>
                                <span className={`absolute top-[${topVal[idx]}] left-[50.5%]`}>{answer.questionsAndAnswer[6]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[55.5%]`}>{answer.questionsAndAnswer[7]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[60.5%]`}>{answer.questionsAndAnswer[8]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[68.5%] w-[50px] whitespace-pre-wrap`}>{answer.questionsAndAnswer[9]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[75.5%]`}>{answer.questionsAndAnswer[10]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[82.5%]`}>{answer.questionsAndAnswer[11]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[87.5%]`}>{answer.questionsAndAnswer[12]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[91%] w-[70px] whitespace-pre-wrap text-[10px]`}>{answer.questionsAndAnswer[13]}</span>
                            </div>
                        ))
                    }
                   <div>
                        <span className='absolute top-[13.4%] left-[5%]'>{membersData[0]?.questionsAndAnswer[49]}</span>
                        <span className='absolute top-[20%] left-[5%]'>{membersData[0]?.questionsAndAnswer[50]}</span>
                        <span className='absolute top-[24.5%] left-[5%]'>{membersData[0]?.questionsAndAnswer[51]}</span>
                        <span className='absolute top-[35.5%] left-[5%]'>{membersData[0]?.questionsAndAnswer[52]}</span>
                        <span className='absolute top-[45%] left-[5%]'>{membersData[0]?.questionsAndAnswer[53]}</span>
                        <span className='absolute top-[65.8%] left-[5%]'>{membersData[0]?.questionsAndAnswer[54]}</span>
                        <span className='absolute top-[72.3%] left-[5%]'>{membersData[0]?.questionsAndAnswer[55]}</span>
                        <span className='absolute top-[76%] left-[5%]'>{membersData[0]?.questionsAndAnswer[56]}</span>
                        <span className='absolute top-[90.5%] left-[5%]'>{membersData[0]?.questionsAndAnswer[56]}</span>
                    </div>
                </div>
                <div className='relative'>
                    <img src={pageFour} alt="page-four" />
                    {
                        membersData?.map((answer, idx) => (
                            answer?.questionsAndAnswer?.length > 0 &&
                            <div className="tracking-tighter text-xs" key={idx}>
                                <span className={`absolute top-[${topVal[idx]}] left-[6%]`}>{answer.questionsAndAnswer[0]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[18%]`}>{answer.questionsAndAnswer[1]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[21%]`}>{answer.questionsAndAnswer[3]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[24%] w-[50px] whitespace-pre-wrap`}>{answer.questionsAndAnswer[14]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[31%]`}>{answer.questionsAndAnswer[15]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[37.5%]`}>{answer.questionsAndAnswer[16]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[43.5%]`}>{answer.questionsAndAnswer[17]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[50.5%]`}>{answer.questionsAndAnswer[41]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[54.5%]`}>{answer.questionsAndAnswer[42]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[59%]`}>{answer.questionsAndAnswer[43]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[63%]`}>{answer.questionsAndAnswer[44]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[70.5%]`}>{answer.questionsAndAnswer[45]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[77%]`}>{answer.questionsAndAnswer[46]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[83.5%]`}>{answer.questionsAndAnswer[47]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[91%]`}>{answer.questionsAndAnswer[48]}</span>
                            </div>
                        ))
                    }
                </div>
                <div className='relative'>
                    <img src={pageFive} alt="page-five" />
                    {
                        membersData?.map((answer, idx) => (
                            answer?.questionsAndAnswer?.length > 0 &&
                            <div className="tracking-tighter text-xs" key={idx}>
                                <span className={`absolute top-[${topVal[idx]}] left-[6%]`}>{answer.questionsAndAnswer[0]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[18%]`}>{answer.questionsAndAnswer[1]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[21%]`}>{answer.questionsAndAnswer[3]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[24%]`}>{getMonthAndYear(answer.questionsAndAnswer[36])}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[31%]`}>{answer.questionsAndAnswer[37]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[35.5%]`}>{answer.questionsAndAnswer[38]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[40.5%]`}>{answer.questionsAndAnswer[39]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[45.5%]`}>{answer.questionsAndAnswer[40]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[50.5%]`}>{answer.questionsAndAnswer[18]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[58%]`}>{answer.questionsAndAnswer[19]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[64.5%]`}>{answer.questionsAndAnswer[20]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[72.5%]`}>{answer.questionsAndAnswer[21]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[78%]`}>{answer.questionsAndAnswer[22]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[85%]`}>{answer.questionsAndAnswer[23]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[92%]`}>{answer.questionsAndAnswer[24]}</span>
                            </div>
                        ))
                    }
                </div>
                <div className='relative'>
                    <img src={pageSix} alt="page-six" />
                    {
                        membersData?.map((answer, idx) => (
                            answer?.questionsAndAnswer?.length > 0 &&
                            <div className="tracking-tighter text-xs" key={idx}>
                                <span className={`absolute top-[${topVal[idx]}] left-[6%]`}>{answer.questionsAndAnswer[0]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[18%]`}>{answer.questionsAndAnswer[1]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[21%]`}>{answer.questionsAndAnswer[3]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[24%]`}>{answer.questionsAndAnswer[25]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[31%]`}>{answer.questionsAndAnswer[26]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[37.5%]`}>{answer.questionsAndAnswer[27]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[43.5%]`}>{answer.questionsAndAnswer[28]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[50.5%]`}>{answer.questionsAndAnswer[29]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[58.5%]`}>{answer.questionsAndAnswer[30]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[64.5%] w-[60px] whitespace-pre-wrap text-[10px]`}>{answer.questionsAndAnswer[31]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[70.6%] w-[80px] whitespace-pre-wrap text-[10px]`}>{answer.questionsAndAnswer[32]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[77.3%] w-[90px] whitespace-pre-wrap text-[10px]`}>{answer.questionsAndAnswer[33]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[86%]`}>{answer.questionsAndAnswer[34]}</span>
                                <span className={`absolute top-[${topVal[idx]}] left-[94%]`}>{answer.questionsAndAnswer[35]}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PrintableForm