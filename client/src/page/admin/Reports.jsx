import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../../components/admin/Header'
import { barangay } from '../../static/Geography'
import { reportTables } from '../../static/ReportTables'
import { UserContext } from '../../context/UserContext'
import ReportTableContainer from '../../components/admin/ReportTableContainer'
import { NavigationContext } from '../../context/NavigationContext'
import { exportReportExcel } from '../../components/admin/ExportReportExcel'

import { ConfirmDialog } from 'primereact/confirmdialog'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import html2canvas from 'html2canvas'
import moment from 'moment'
import jsPDF from 'jspdf'
import axios from 'axios'

const Reports = () => {
  const toast = useRef(null)
  const printReportRef = useRef(null) 
  const { setIsNavigateOpen } = useContext(NavigationContext)
  const { loggedUser } = useContext(UserContext)
  const [orientation, setOrientation] = useState('')
  const [addresses, setAddresses] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(0)
  const [selectedReport, setSelectedReport] = useState(null)
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [fileType, setFileType] = useState(1)
  const [preview, setPreview] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchAddresses = async () => {
      const { data } = await axios.get("/api/address")
      if(data.success){
        setAddresses(data.data)
      } 
    }

    fetchAddresses()
  }, [])

  const showToast = (severity, summary, detail) => {
    return toast.current.show({ severity: severity, summary: summary, detail: detail})
  }

  const reportDialog = (report) => {
    confirmDialog({
        draggable: false,
        message: 'Are you sure you want to download this excel file type of this report?',
        header: 'Confirmation',
        accept: () => exportReportExcel(report.uri, report.uri)
    });
  };

  const handleSelectReportTable = (id) => {
    if(
      id === 1 || 
      id === 2 ||
      id === 3 ||
      id === 4 ||
      id === 5 ||
      id === 6 ||
      id === 13 ||
      id === 14 ||
      id === 15 ||
      id === 16 ||
      id === 17 ||
      id === 18 ||
      id === 20 ||
      id === 22 ||
      id === 27 ||
      id === 28 ||
      id === 29 ||
      id === 30 ||
      id === 31 ||
      id === 36 ||
      id === 41 ||
      id === 42
    ){
      setSelectedReport(id)
      setOrientation('portrait')
    }else if (
      id === 7 || 
      id === 8 ||
      id === 9 ||
      id === 10 ||
      id === 11 ||
      id === 12 ||
      id === 19 ||
      id === 21 ||
      id === 23 ||
      id === 24 ||
      id === 25 ||
      id === 26 ||
      id === 32 ||
      id === 33 ||
      id === 34 ||
      id === 35 || 
      id === 37 ||
      id === 38 ||
      id === 39 ||
      id === 40
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
        const success = doc.save(`${selectedInfo.uri}[${moment(new Date()).format('l')}].pdf`);
        
        if (success) {
          // setOrientation('');
          // setSelectedReport(null);
          // setPreview(false);
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
            const success = doc.save(`${selectedInfo.uri}[${moment(new Date()).format('l')}].pdf`);
            
            if (success) {
              // setOrientation('');
              // setSelectedReport(null);
              // setPreview(false);
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

  const filteredReportTables = reportTables.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))

  return ( 
    preview ?
    <>
      <Toast ref={toast} />
      <ReportTableContainer 
        forwardRef={printReportRef} 
        orientation={orientation} 
        reportId={selectedReport} 
        setReportId={setSelectedReport}
        preview={preview} 
        setPreview={setPreview}
        addresses={addresses}
        downloadPDFFile={downloadPDFFile}
        address={selectedAddress}
        dateFrom={dateFrom}
        dateTo={dateTo}
      />
    </>
    :
    <>
      <ConfirmDialog />
      <Toast ref={toast} />
      <Header pageName={"Reports"} />
      <div className="content bg-white">
        <div className='flex gap-4 items-center justify-between flex-wrap'>
          <div className="form-group">
            <label htmlFor="search">Search Report</label>
            <input type="text" id='search' placeholder='Search table number' value={query} onChange={e => setQuery(e.target.value)}/>
          </div>
          <div className='flex gap-4 flex-wrap'>
            <div className="form-group">
              <label htmlFor="from">Date: From</label>
              <input type="date" id="from" value={dateFrom} onChange={e => setDateFrom(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="to">To</label>
              <input type="date" id="to" value={dateTo} onChange={e => setDateTo(e.target.value)}/>
            </div>
            {
              loggedUser?.role === 'administrator' && 
              <div className="form-group">
                <label htmlFor="barangay">Location</label>
                <select id="barangay" value={selectedAddress} onChange={e => setSelectedAddress(e.target.value)}>
                  <option value="0">Municipal</option>
                  {
                    addresses?.map((address) => (
                      <option key={address.id} value={address.id}>{address.barangay}</option>
                    ))
                  }
                </select>
              </div>
            }
            <div className="form-group">
              <label htmlFor="file">File Type</label>
              <select id="file" onChange={(e) => setFileType(e.target.value)}>
                <option value={1}>PDF</option>
                <option value={2}>Excel</option>
              </select>
            </div>
          </div>
        </div>
        <div className='my-6'>
          <p className='text-gray-400 mb-4'>Select from the tables below that you want to export/download</p>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {
              filteredReportTables?.length > 0 ?
              filteredReportTables?.map((report, idx) => (
                <button 
                  onClick={() => {
                    if(dateFrom === '' || dateTo === ''){
                      return showToast('error', 'Failed', 'Please select date [from - to]')
                    }else{
                      if(Number(fileType) === 1){
                        setPreview(true)
                        handleSelectReportTable(report.id)
                        setIsNavigateOpen(true)
                      }else if(Number(fileType) === 2){
                        reportDialog(report)
                      }
                    }
                  }}
                  className='bg-gray-100 rounded-md p-4 text-gray-500 text-left border drop-shadow-md hover:bg-green-200 duration-150' 
                  key={idx}
                >
                  <span className='font-semibold'>{report.label}</span>{" "}
                  <span>{report.detail}</span>
                </button>
              )) :
              <span className='text-xl text-gray-400 italic'>No report table found.</span>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Reports