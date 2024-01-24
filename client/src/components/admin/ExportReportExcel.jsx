import axios from "axios"
import moment from "moment"
import * as XLSX from 'xlsx'

export const exportReportExcel = async (uri, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'
    let reportData = [];

    const fetchTableOneReport = async () => {
        try {
            const { data } = await axios.get(`/api/${uri}`);
            if (data.success) {
                reportData.push(...data.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (uri) {
        await fetchTableOneReport();
    }

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(reportData)
    XLSX.utils.book_append_sheet(wb, ws, 'MySheet')
    XLSX.writeFile(wb, fileName + `[${moment(new Date).format('l')}]` + fileExtension)
}