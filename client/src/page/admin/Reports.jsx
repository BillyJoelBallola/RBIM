import React, { useContext, useRef, useState } from 'react'
import Header from '../../components/admin/Header'
import { barangay } from '../../static/Geography'
import { reportTables } from '../../static/ReportTables'
import { UserContext } from '../../context/UserContext'
import ReportTableContainer from '../../components/admin/ReportTableContainer'
import { NavigationContext } from '../../context/NavigationContext'

import { ConfirmDialog } from 'primereact/confirmdialog'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import html2canvas from 'html2canvas'
import moment from 'moment'
import jsPDF from 'jspdf'

const Reports = () => {
  const toast = useRef(null)
  const printReportRef = useRef(null) 
  const { setIsNavigateOpen } = useContext(NavigationContext)
  const { loggedUser } = useContext(UserContext)
  const [orientation, setOrientation] = useState('')
  const [selectedReport, setSelectedReport] = useState(null)
  const [fileType, setFileType] = useState(1)
  const [preview, setPreview] = useState(false)

  const showToast = (severity, summary, detail) => {
    return toast.current.show({ severity: severity, summary: summary, detail: detail})
  }

  // const reportDialog = (id) => {
  //   confirmDialog({
  //       draggable: false,
  //       message: 'Are you sure you want to download this report table?',
  //       header: 'Confirmation',
  //       accept: () => handleSelectReportTable(id)
  //   });
  // };

  const handleSelectReportTable = (id) => {
    if(
      id === 1 || 
      id === 3 ||
      id === 4 ||
      id === 5 ||
      id === 6 ||
      id === 13 ||
      id === 14 ||
      id === 15
    ){
      setSelectedReport(id)
      setOrientation('portrait')
    }else if (
      id === 7 ||
      id === 8 ||
      id === 9 ||
      id === 10 ||
      id === 11 ||
      id === 12
    ){
      setSelectedReport(id)
      setOrientation('landscape')
    }
  }

  const downloadPDFFile = async () => {
    const selectedInfo = reportTables.find(item => item.id === selectedReport)

    if (printReportRef.current && selectedInfo) {
      const doc = new jsPDF(orientation, 'px', 'letter');
      const pages = await printReportRef.current.children;

      if (pages.length === 1) {
        const page = pages[0];

        const canvas = await html2canvas(page);
        const imgData = canvas.toDataURL('image/png', 1);
        const aspectRatio = canvas.width / canvas.height;
        const imgWidth = doc.internal.pageSize.getWidth();
        const imgHeight = doc.internal.pageSize.getWidth() / aspectRatio;

        doc.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
        const success = doc.save(`${selectedInfo.label}-${moment(new Date()).format('l')}.pdf`);
        
        if (success) {
          setOrientation('');
          setSelectedReport(null);
          setPreview(false);
          return showToast('success', 'Success', 'Report file has been downloaded');
        } else {
          return showToast('error', 'Failed', 'Failed to download report file, please try again');
        }

      } else if (pages.length > 1) {

        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];

          const canvas = await html2canvas(page);
          const imgData = canvas.toDataURL('image/png');
          const aspectRatio = canvas.width / canvas.height;
          const imgWidth = doc.internal.pageSize.getWidth();
          const imgHeight = doc.internal.pageSize.getWidth() / aspectRatio;

          if (i > 0) {
            doc.addPage();
          }

          doc.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);

          if (i === pages.length - 1) {
            const success = doc.save(`${selectedInfo.label}-${moment(new Date()).format('l')}.pdf`);
            
            if (success) {
              setOrientation('');
              setSelectedReport(null);
              setPreview(false);
              return showToast('success', 'Success', 'Report file has been downloaded');
            } else {
              return showToast('error', 'Failed', 'Failed to download report file, please try again');
            }
          }
        }
      }

    }else{
      setOrientation('');
      setSelectedReport(null);
      setPreview(false);
      return showToast('error', 'Failed', 'Failed to download report file, please try again')
    }
  }

  return (
    <>
      <ConfirmDialog />
      <Toast ref={toast} />
      <ReportTableContainer 
        forwardRef={printReportRef} 
        orientation={orientation} 
        reportId={selectedReport} 
        setReportId={setSelectedReport}
        preview={preview} 
        setPreview={setPreview}
        downloadPDFFile={downloadPDFFile}
      />
      <Header pageName={"Reports"} />
      <div className="content bg-white">
        <div className='flex gap-4 items-center flex-wrap'>
          <div className="form-group">
            <label htmlFor="search">Search Report</label>
            <input type="text" id='search' placeholder='Type to search'/>
          </div>
          {/* <div className="form-group">
            <label htmlFor="month">Month/Year</label>
            <input type="month" id="month" />
          </div> */}
          {
            loggedUser?.role === 'administrator' && 
            <div className="form-group">
              <label htmlFor="barangay">Location</label>
              <select id="barangay">
                <option value="">Municipal</option>
                {
                  barangay?.map((place, idx) => (
                    <option key={idx} value={place}>{place}</option>
                  ))
                }
              </select>
            </div>
          }
          <div className="form-group">
            <label htmlFor="barangay">File Type</label>
            <select id="barangay" onChange={(e) => setFileType(e.target.value)}>
              <option value={1}>PDF</option>
              <option value={2}>Excel</option>
            </select>
          </div>
        </div>
        <div className='my-6'>
          <p className='text-gray-400 mb-4'>Select from the tables below that you want to export/download</p>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {
              reportTables?.map((report, idx) => (
                <button 
                  onClick={() => {
                    setPreview(true)
                    handleSelectReportTable(report.id)
                    setIsNavigateOpen(true)
                  }}
                  className='bg-gray-100 rounded-md p-4 text-gray-500 text-left border drop-shadow-md hover:bg-green-100 duration-150' 
                  key={idx}
                >
                  <span className='font-semibold'>{report.label}</span>{" "}
                  <span>{report.detail}</span>
                </button>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports