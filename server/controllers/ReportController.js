import { reportModel } from "../models/ReportModel.js";
import { addressModel } from "../models/AddressModel.js";
import { getCauseOfDeathArray, getEthnicityArray, getImmuzationArray, getPrimaryNeedsArray, getReasonOfDeathArray, getReligionsArray } from "../helper/getHeaders.js";

export const getAllSurveyFormsData = async (req, res) => {
    try {
        const result = await reportModel.getAllSurveyFormsData();
        return res.json({ success: true, data: result})
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"})
    }
}

const isDateInRange = (date, startDate, endDate) => {
    const dateObj = new Date(date);
    const startObj = new Date(startDate);
    const endObj = new Date(endDate);
  
    return dateObj >= startObj && dateObj <= endObj;
};

export const getTableOneReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)


        const data = [
            { age: '0-4' },
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];
        
        const migrantCodes = {
            nonMigrant: 1,
            migrant: 2,
            transient: 3
        };

        for (const [migrant, migrantCode] of Object.entries(migrantCodes)) {
            data[0][`${migrant}Male`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[0][`${migrant}Female`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[0][`total`] = result?.filter(item => Number(item.Q4) <= 4 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[1][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[1][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[1][`total`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[2][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[2][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[2][`total`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[3][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[3][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[3][`total`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[4][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[4][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[4][`total`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[5][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[5][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[5][`total`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[6][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[6][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[6][`total`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[7][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[7][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[7][`total`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[8][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[8][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[8][`total`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[9][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[9][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[9][`total`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[10][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[10][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[10][`total`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[11][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[11][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[11][`total`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[12][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[12][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[12][`total`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[13][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[13][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[13][`total`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[14][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[14][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[14][`total`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[15][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[15][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[15][`total`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;

            data[16][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[16][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2)?.length || 0;
            data[16][`total`] = result?.filter(item => Number(item.Q4) >= 80 && [1, 2, 3].includes(Number(item.Q36)) && [1, 2].includes(Number(item.Q3)))?.length || 0;
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwoReport = async (req, res) => {
    try {
        
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThreeReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '0-4' },
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];
        
        const maritalStatus = {
            single: 1,
            married: 2,
            livingIn: 3,
            widowed: 4,
            separated: 5,
            divorced: 6,
            unknown: 7
        };

        const migrantCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [marital, maritalCode] of Object.entries(maritalStatus)) {
            migrantCodes.map((resident, idx) => {
                data[0][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[0][`total`] = result?.filter(item => 
                    Number(item.Q4) <= 4 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;
                
                data[1][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0; 
                data[1][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0; 

                data[2][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[2][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[3][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[3][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[4][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[4][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[5][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[5][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[6][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[6][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[7][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[7][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[8][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[8][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[9][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[9][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[10][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[10][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[11][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[11][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[12][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[12][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[13][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[13][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[14][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[14][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[15][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[15][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0;

                data[16][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[16][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 80 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q8)) && 
                    [1, 2, 3].includes(Number(item.Q36)))?.length || 0})
        }

        return res.json({ success: true, data: data});
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableFourReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { status: 'single' },
            { status: 'married' },
            { status: 'livingIn' },
            { status: 'widowed' },
            { status: 'separated' },
            { status: 'divorced' },
            { status: 'unknown' }
        ];

        const migrantCodes = {
            nonMigrant: 1,
            migrant: 2,
            transient: 3
        };

        for (const [migrant, migrantCode] of Object.entries(migrantCodes)) {
            data[0][`${migrant}Male`] = result?.filter(item => Number(item.Q8) === 1 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[0][`${migrant}Female`] = result?.filter(item => Number(item.Q8) === 1 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2)?.length || 0;
            data[0][`total`] = result?.filter(item => Number(item.Q8) === 1 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[1][`${migrant}Male`] = result?.filter(item => Number(item.Q8) === 2 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[1][`${migrant}Female`] = result?.filter(item => Number(item.Q8) === 2 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2)?.length || 0;
            data[1][`total`] = result?.filter(item => Number(item.Q8) === 2 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[2][`${migrant}Male`] = result?.filter(item => Number(item.Q8) === 3 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[2][`${migrant}Female`] = result?.filter(item => Number(item.Q8) === 3 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2)?.length || 0;
            data[2][`total`] = result?.filter(item => Number(item.Q8) === 3 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[3][`${migrant}Male`] = result?.filter(item => Number(item.Q8) === 4 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[3][`${migrant}Female`] = result?.filter(item => Number(item.Q8) === 4 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2)?.length || 0;
            data[3][`total`] = result?.filter(item => Number(item.Q8) === 4 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[4][`${migrant}Male`] = result?.filter(item => Number(item.Q8) === 5 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[4][`${migrant}Female`] = result?.filter(item => Number(item.Q8) === 5 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2)?.length || 0;
            data[4][`total`] = result?.filter(item => Number(item.Q8) === 5 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[5][`${migrant}Male`] = result?.filter(item => Number(item.Q8) === 6 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[5][`${migrant}Female`] = result?.filter(item => Number(item.Q8) === 6 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2)?.length || 0;
            data[5][`total`] = result?.filter(item => Number(item.Q8) === 6 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[6][`${migrant}Male`] = result?.filter(item => Number(item.Q8) === 7 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[6][`${migrant}Female`] = result?.filter(item => Number(item.Q8) === 7 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2)?.length || 0;
            data[6][`total`] = result?.filter(item => Number(item.Q8) === 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableFiveReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        let data = getReligionsArray(result);

        const migrantCodes = {
            nonMigrant: 1,
            migrant: 2,
            transient: 3
        };

        data?.forEach((d) => {
            result.forEach((res) => {
                if (d.religion === res.Q9) {
                    for (const [migrant, migrantCode] of Object.entries(migrantCodes)) {
                        d[`${migrant}Male`] = result.filter((y) => y.Q9 === d.religion && Number(y.Q36) === migrantCode && Number(y.Q3) === 1).length || 0;
                        d[`${migrant}Female`] = result.filter((y) => y.Q9 === d.religion && Number(y.Q36) === migrantCode && Number(y.Q3) === 2).length || 0;
                        d[`total`] = result.filter((y) => y?.Q9?.includes(d.religion) && (Number(y.Q36) === 1 || Number(y.Q36) === 2 || Number(y.Q36) === 3) && (Number(y.Q3) === 1 || Number(y.Q3) === 2)).length || 0;
                    }
                }
            });
        });

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableSixReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        let data = getEthnicityArray(result);

        const migrantCodes = {
            nonMigrant: 1,
            migrant: 2,
            transient: 3
        };

        data?.forEach((d) => {
            result.forEach((res) => {
                if (d.ethnicity === res.Q10) {
                    for (const [migrant, migrantCode] of Object.entries(migrantCodes)) {
                        d[`${migrant}Male`] = result.filter((y) => y.Q10 === d.ethnicity && Number(y.Q36) === migrantCode && Number(y.Q3) === 1).length || 0;
                        d[`${migrant}Female`] = result.filter((y) => y.Q10 === d.ethnicity && Number(y.Q36) === migrantCode && Number(y.Q3) === 2).length || 0;
                        d[`total`] = result.filter((y) => y?.Q10?.includes(d.ethnicity) && (Number(y.Q36) === 1 || Number(y.Q36) === 2 || Number(y.Q36) === 3) && (Number(y.Q3) === 1 || Number(y.Q3) === 2)).length || 0;
                    }
                }
            });
        });

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableSevenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '6-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65+' },
        ];

        const educationLevel = {
            noEducation: 0,
            preSchool: 1,
            elementary: 2,
            elementaryGraduate: 3,
            highSchool: 4,
            highSchoolGraduate: 5,
            juniorHighSchool: 6,
            juniorHighSchoolGraduate: 7,
            seniorHighSchool: 8,
            seniorHighSchoolGraduate: 9,
            vocational: 10,
            college: 11,
            collegeGraduate: 12,
            postGraduate: 13
        };
        
        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [education, educationCode] of Object.entries(educationLevel)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 6 && Number(item.Q4) <= 9 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[0][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 6 && Number(item.Q4) <= 9 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => Number(item.Q4) >= 6 && Number(item.Q4) <= 9 && (Number(item.Q11) >= 0 || Number(item.Q11) <= 13) && (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 6 && Number(item.Q4) <= 9 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[1][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[2][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;

                data[3][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
            
                data[4][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[5][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[5][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[6][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[6][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[7][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[7][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[8][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[8][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[9][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[9][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[9][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[10][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[10][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[10][`total`] = result.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[11][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[11][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[11][`total`] = result.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[12][`${resident}${education}Male`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[12][`${resident}${education}Female`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q11) === educationCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[12][`total`] = result.filter(item => 
                    Number(item.Q4) >= 65 && 
                    (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && 
                    (Number(item.Q11) === 1 || Number(item.Q11) === 2 || Number(item.Q11) === 3 || 
                    Number(item.Q11) === 4 || Number(item.Q11) === 5 || Number(item.Q11) === 6 || 
                    Number(item.Q11) === 7 || Number(item.Q11) === 8 || Number(item.Q11) === 9 || 
                    Number(item.Q11) === 10 || Number(item.Q11) === 11 || Number(item.Q11) === 12 || Number(item.Q11) === 13) && 
                    (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
            })
        }

        return res.json({ success: true, data: data});
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableEightReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '3-4' },
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
        ];

        const enrolledStatus = {
            public: 1,
            private: 2,
            none: 3
        };
        
        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [enrolled, enrolledCode] of Object.entries(enrolledStatus)) {
            residentCodes?.map((resident, idx) => {
                data[0][`${resident}${enrolled}Male`] = result.filter(item => Number(item.Q4) >= 3 && Number(item.Q4) <= 4 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[0][`${resident}${enrolled}Female`] = result.filter(item => Number(item.Q4) >= 3 && Number(item.Q4) <= 4 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => Number(item.Q4) >= 3 && Number(item.Q4) <= 4 && (Number(item.Q12) === 1 || Number(item.Q12) === 2 || Number(item.Q12) === 3) && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[1][`${resident}${enrolled}Male`] = result.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}${enrolled}Female`] = result.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && (Number(item.Q12) === 1 || Number(item.Q12) === 2 || Number(item.Q12) === 3) && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[2][`${resident}${enrolled}Male`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}${enrolled}Female`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && (Number(item.Q12) === 1 || Number(item.Q12) === 2 || Number(item.Q12) === 3) && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[3][`${resident}${enrolled}Male`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <=19 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}${enrolled}Female`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <=19 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && (Number(item.Q12) === 1 || Number(item.Q12) === 2 || Number(item.Q12) === 3) && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
                
                data[4][`${resident}${enrolled}Male`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}${enrolled}Female`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q12) === enrolledCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && (Number(item.Q12) === 1 || Number(item.Q12) === 2 || Number(item.Q12) === 3) && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2)).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error" });
    }
}

export const getTableNineReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '3-4' },
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
        ];

        const schoolLevel = {
            preSchool: 0,
            elementary: 1,
            juniorHighSchool: 2,
            seniorHighSchool: 3,
            vocational: 4,
            college: 5
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [school, schoolCode] of Object.entries(schoolLevel)) {
            residentCodes?.map((resident, idx) => {
                data[0][`${resident}${school}Male`] = result.filter(item => Number(item.Q4) >= 3 && Number(item.Q4) <= 4 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[0][`${resident}${school}Female`] = result.filter(item => Number(item.Q4) >= 3 && Number(item.Q4) <= 4 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0]['total'] = result.filter(item => 
                    Number(item.Q4) >= 3 && Number(item.Q4) <= 4 &&
                    [1, 2, 3, 4, 5].includes(Number(item.Q13)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[1][`${resident}${school}Male`] = result.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}${school}Female`] = result.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1]['total'] = result.filter(item => 
                    Number(item.Q4) >= 5 && Number(item.Q4) <= 9 &&
                    [1, 2, 3, 4, 5].includes(Number(item.Q13)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[2][`${resident}${school}Male`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}${school}Female`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2]['total'] = result.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 &&
                    [1, 2, 3, 4, 5].includes(Number(item.Q13)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[3][`${resident}${school}Male`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <=19 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}${school}Female`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3]['total'] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 &&
                    [1, 2, 3, 4, 5].includes(Number(item.Q13)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[4][`${resident}${school}Male`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}${school}Female`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q13) === schoolCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4]['total'] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 &&
                    [1, 2, 3, 4, 5].includes(Number(item.Q13)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3))).length || 0;
            })

        }   

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const amounts = {
            _9K: [5000, 9999],
            _14K: [10000, 14999],
            _19K: [15000, 19999],
            _24K: [20000, 24999]
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [amount, amountCode] of Object.entries(amounts)) {
            residentCodes?.map((resident, idx) => {
                data[0][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[0][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[0][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    Number(item.Q15) > 5000 &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[1][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    (Number(item.Q15) >= 5000 || Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[2][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[3][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[4][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[5][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[5][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[5][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[6][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[6][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[6][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[7][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[7][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[7][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[8][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[8][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[8][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[9][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[9][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[9][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[9][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[9][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[9][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[9][`total`] = result.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[10][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[10][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[10][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[10][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[10][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[10][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[10][`total`] = result.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[11][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[11][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[11][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[11][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[11][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[11][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[11][`total`] = result.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[12][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[12][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[12][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[12][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[12][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[12][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[12][`total`] = result.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[13][`${resident}_5KMale`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[13][`${resident}_5KFemale`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q15) <= 5000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[13][`${resident}${amount}Male`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[13][`${resident}${amount}Female`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q15) >= amountCode[0] && Number(item.Q15) <= amountCode[1] && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[13][`${resident}_25KMale`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[13][`${resident}_25KFemale`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q15) >= 25000 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[13][`total`] = result.filter(item => 
                    Number(item.Q4) >= 80 && 
                    (Number(item.Q15) >= 5000 && Number(item.Q15) <= 25000) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableElevenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const sourceOfIncome = {
            employment: 1,
            business: 2,
            remittance: 3,
            investments: 4,
            others: 5
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [income, incomeCode] of Object.entries(sourceOfIncome)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[0][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[1][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[2][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[3][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[4][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[5][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[5][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[6][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[6][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[7][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[7][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[8][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[8][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[9][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[9][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[9][`total`] = result.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[10][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[10][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[10][`total`] = result.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[11][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[11][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[11][`total`] = result.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[12][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[12][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[12][`total`] = result.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[13][`${resident}${income}Male`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[13][`${resident}${income}Female`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q16) === incomeCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[13][`total`] = result.filter(item => 
                    Number(item.Q4) >= 80 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q16)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwelveReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const workStatus = {
            permanent: 1,
            casual: 2,
            contractual: 3,
            individual: 4,
            shared: 5,
            corporate: 6
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [work, workCode] of Object.entries(workStatus)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[0][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[1][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[2][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[3][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 &&
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[4][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 &&
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[5][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[5][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 &&
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[6][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[6][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 &&
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[7][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[7][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 &&
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[8][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[8][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 &&
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[9][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[9][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[9][`total`] = result.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 &&  
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[10][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[10][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[10][`total`] = result.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[11][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[11][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[11][`total`] = result.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[12][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[12][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[12][`total`] = result.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 &&
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[13][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[13][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[13][`total`] = result.filter(item => 
                    Number(item.Q4) >= 80 && 
                    [1, 2, 3, 4, 5, 6].includes(Number(item.Q17)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirteenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { delivery: 'Public hospital' },
            { delivery: 'Private hospital' },
            { delivery: 'Lying-in clinic' },
            { delivery: 'Home' }
        ];

        data[0][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q19) === 1 && Number(item.Q3) === 1).length || 0;
        data[0][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q19) === 1 && Number(item.Q3) === 2).length || 0;
        data[0][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            Number(item.Q19) === 1 && 
            [1, 2].includes(Number(item.Q3))).length || 0;

        data[1][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q19) === 2 && Number(item.Q3) === 1).length || 0;
        data[1][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q19) === 2 && Number(item.Q3) === 2).length || 0;
        data[1][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            Number(item.Q19) === 2 && 
            [1, 2].includes(Number(item.Q3))).length || 0;
            
        data[2][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q19) === 3 && Number(item.Q3) === 1).length || 0;
        data[2][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q19) === 3 && Number(item.Q3) === 2).length || 0;
        data[2][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            Number(item.Q19) === 3 && 
            [1, 2].includes(Number(item.Q3))).length || 0;

        data[3][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q19) === 4 && Number(item.Q3) === 1).length || 0;
        data[3][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q19) === 4 && Number(item.Q3) === 2).length || 0;
        data[3][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            Number(item.Q19) === 4 && 
            [1, 2].includes(Number(item.Q3))).length || 0;

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableFourteenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { attendant: 'Doctor' },
            { attendant: 'Nurse' },
            { attendant: 'Midwife' },
            { attendant: 'Hilot' },
            { attendant: 'Others' },
        ];

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        const codes = [1, 2, 3, 4];

        data[0][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q20) === 1 && Number(item.Q3) === 1).length || 0;
        data[0][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q20) === 1 && Number(item.Q3) === 2).length || 0;
        data[0][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            Number(item.Q20) === 1 && 
            [1, 2].includes(Number(item.Q3))).length || 0;

        data[1][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q20) === 2 && Number(item.Q3) === 1).length || 0;
        data[1][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q20) === 2 && Number(item.Q3) === 2).length || 0;
        data[1][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            Number(item.Q20) === 2 && 
            [1, 2].includes(Number(item.Q3))).length || 0;

        data[2][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q20) === 3 && Number(item.Q3) === 1).length || 0;
        data[2][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q20) === 3 && Number(item.Q3) === 2).length || 0;
        data[2][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            Number(item.Q20) === 3 && 
            [1, 2].includes(Number(item.Q3))).length || 0;

        data[3][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q20) === 4 && Number(item.Q3) === 1).length || 0;
        data[3][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && Number(item.Q20) === 4 && Number(item.Q3) === 2).length || 0;
        data[3][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            Number(item.Q20) === 4 && 
            [1, 2].includes(Number(item.Q3))).length || 0;

        data[4][`male`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && !codes.includes(Number(item.Q20)) && Number(item.Q3) === 1).length || 0;
        data[4][`female`] = result.filter(item => Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && !codes.includes(Number(item.Q20)) && Number(item.Q3) === 2).length || 0;
        data[4][`total`] = result.filter(item => 
            Number(item.Q4) >= 0 && Number(item.Q4) <= 11 && 
            !codes.includes(Number(item.Q20)) && 
            [1, 2].includes(Number(item.Q3))).length || 0;

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableFifteenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        let data = getImmuzationArray(result);

        data?.forEach((d) => {
            result.forEach((res) => {
                if (d.immuzation === res.Q21) {
                    d[`male`] = result.filter((y) => y.Q21 === d.immuzation && Number(y.Q4) >= 0 && Number(y.Q4) <= 11 && Number(y.Q3) === 1).length || 0;
                    d[`female`] = result.filter((y) => y.Q21 === d.immuzation && Number(y.Q4) >= 0 && Number(y.Q4) <= 11 && Number(y.Q3) === 2).length || 0;
                    d[`total`] = result.filter((y) => 
                        y?.Q21?.includes(d.immuzation) && 
                        Number(y.Q4) >= 0 && Number(y.Q4) <= 11 && 
                        [1, 2].includes(Number(y.Q3))).length || 0;
                }
            });
        });

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableSixteenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
        ];

        const numbers = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [number, numberCode] of Object.entries(numbers)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
                
                data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                if(numberCode === 10){
                    data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[0][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[1][`total`] = result.filter(item => 
                        Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[2][`total`] = result.filter(item => 
                        Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[3][`total`] = result.filter(item => 
                        Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[4][`total`] = result.filter(item => 
                        Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[5][`total`] = result.filter(item => 
                        Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[6][`total`] = result.filter(item => 
                        Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[7][`total`] = result.filter(item => 
                        Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[8][`total`] = result.filter(item => 
                        Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;
                }

            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableSeventeenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
        ];

        const numbers = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [number, numberCode] of Object.entries(numbers)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
                
                data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                if(numberCode === 10){
                    data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[0][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[1][`total`] = result.filter(item => 
                        Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[2][`total`] = result.filter(item => 
                        Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[3][`total`] = result.filter(item => 
                        Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[4][`total`] = result.filter(item => 
                        Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[5][`total`] = result.filter(item => 
                        Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[6][`total`] = result.filter(item => 
                        Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[7][`total`] = result.filter(item => 
                        Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[8][`total`] = result.filter(item => 
                        Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[0])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;
                }

            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableEighteenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
        ];

        const contraceptions = {
            femaleSterilization: 1,
            maleSterilization: 2,
            iud: 3,
            injectibles: 4,
            implants: 5,
            pill: 6,
            condom: 7,
            modern: 8,
            lam: 9,
            traditional: 10,
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [contraception, contraceptionCode] of Object.entries(contraceptions)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
                
                data[1][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[2][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[3][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[4][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[5][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[6][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[7][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[8][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableNineteenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { livingChildren: '1' },
            { livingChildren: '2' },
            { livingChildren: '3' },
            { livingChildren: '4' },
            { livingChildren: '5' },
            { livingChildren: '6' },
            { livingChildren: '7' },
            { livingChildren: '8' },
            { livingChildren: '9' },
            { livingChildren: '10+' },
        ];

        const contraceptions = {
            femaleSterilization: 1,
            maleSterilization: 2,
            iud: 3,
            injectibles: 4,
            implants: 5,
            pill: 6,
            condom: 7,
            modern: 8,
            lam: 9,
            traditional: 10,
        }

        const numbers = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            ten: 10,
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [contraception, contraceptionCode] of Object.entries(contraceptions)) {
            for (const [number, numberCode] of Object.entries(contraceptions)) {
                residentCodes.map((resident, idx) => {
                    data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[0][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;
                    
                    data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[1][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[2][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[3][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[4][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[5][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[6][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[7][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[8][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    data[9][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[9][`total`] = result.filter(item => 
                        Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item?.Q22?.split(",")[1])) && 
                        [1, 2, 3].includes(Number(item.Q36)) && 
                        Number(item.Q3) === 2).length || 0;

                    if(numberCode === 10){
                        data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[0][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[1][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[2][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[3][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[4][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[5][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[6][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[7][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[8][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;

                        data[9][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;    
                        data[9][`total`] = result.filter(item => 
                            Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && 
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(item.Q24)) && 
                            Number(item?.Q22?.split(",")[1]) >= 10 && 
                            [1, 2, 3].includes(Number(item.Q36)) && 
                            Number(item.Q3) === 2).length || 0;
                    }
                })
            }
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentyReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
        ];

        const fpSources = {
            goverment: 1,
            rhu: 2,
            healthStation: 3,
            private: 4,
            pharmacy: 5
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [source, sourceCode] of Object.entries(fpSources)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
                
                data[1][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[2][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[3][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[4][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[5][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[6][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[7][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[8][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;            
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5].includes(Number(item.Q24)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentyOneReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
        ];

        const intention = {
            withIntention: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            withoutIntention: [ "no", "No" ],
        }        

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [intent, intentCode] of Object.entries(intention)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
                
                data[1][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[2][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[3][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[4][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[5][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[6][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[7][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;

                data[8][`${resident}${intent}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && intentCode.includes(item?.Q25?.toString()) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;            
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    intentCode.includes(item?.Q25?.toString()) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentyTwoReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { FP: 'Female Sterilization / Ligation' },
            { FP: 'Male Sterilization / Vasectomy' },
            { FP: 'IUD' },
            { FP: 'Injectables' },
            { FP: 'Implants' },
            { FP: 'Pills' },
            { FP: 'Condom' },
            { FP: 'Modern Natural FP' },
            { FP: 'LAM' },
            { FP: 'Traditional' }
        ];

        const withIntention = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const intentCode of withIntention) {
            residentCodes.map((resident, idx) => {
                data[intentCode - 1][`${resident}WithIntention`] = result.filter(item => Number(item.Q25) === intentCode && Number(item.Q36) === idx - 1 && Number(item.Q3) === 2).length || 0;
                data[intentCode - 1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    Number(item.Q25) === intentCode && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    Number(item.Q3) === 2).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentyThreeReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '0-4' },
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const insuranceCodes = {
            philHealth: 1,
            philHealthDependent: 2,
            philHealthIndigent: 3,
            philHealthDependentIndigent: 4,
            GSIS: 5,
            SSS: 6,
            private: 7
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [insurance, insuranceCode] of Object.entries(insuranceCodes)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[0][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[0][`total`] = result?.filter(item => 
                    Number(item.Q4) <= 4 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;
                
                data[1][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0; 
                data[1][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0; 
                data[1][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0; 

                data[2][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[2][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[2][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[3][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[3][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[3][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[4][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[4][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[4][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[5][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[5][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[5][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[6][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[6][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[6][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[7][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[7][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[7][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[8][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[8][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[8][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[9][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[9][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[9][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[10][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[10][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[10][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[11][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[11][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[11][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[12][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[12][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[12][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[13][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[13][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[13][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[14][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[14][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[14][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[15][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[15][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[15][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0;

                data[16][`${resident}${insurance}Male`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1)?.length || 0;
                data[16][`${resident}${insurance}Female`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q26) === insuranceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2)?.length || 0;
                data[16][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 80 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q26)) && 
                    [1, 2, 3].includes((Number(item.Q36))))?.length || 0})
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentyFourReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { reason: 'Sick/Injured' },
            { reason: 'Prenatal/Postnata' },
            { reason: 'Gave birth' },
            { reason: 'Dental' },
            { reason: 'Medical check-up' },
            { reason: 'Medical requirement' },
            { reason: 'NHTS/CCT/4Ps requirement' }
        ];

        const reasonCodes = {
            sick: 1,
            prenatal: 2,
            gaveBirth: 3,
            dental: 4,
            checkUp: 5,
            requirement: 6,
            NHTS: 7
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [reason, reasonCode] of Object.entries(reasonCodes)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}Male`] = result?.filter(item => Number(item.Q8) === 1 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 1)?.length || 0;
                data[0][`${resident}Female`] = result?.filter(item => Number(item.Q8) === 1 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 2)?.length || 0;
                data[0][`total`] = result?.filter(item => 
                    Number(item.Q8) === 1 &&
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q28)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[1][`${resident}Male`] = result?.filter(item => Number(item.Q8) === 2 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 1)?.length || 0;
                data[1][`${resident}Female`] = result?.filter(item => Number(item.Q8) === 2 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 2)?.length || 0;
                data[1][`total`] = result?.filter(item => 
                    Number(item.Q8) === 2 &&
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q28)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[2][`${resident}Male`] = result?.filter(item => Number(item.Q8) === 3 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 1)?.length || 0;
                data[2][`${resident}Female`] = result?.filter(item => Number(item.Q8) === 3 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 2)?.length || 0;
                data[2][`total`] = result?.filter(item => 
                    Number(item.Q8) === 3 &&
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q28)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[3][`${resident}Male`] = result?.filter(item => Number(item.Q8) === 4 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 1)?.length || 0;
                data[3][`${resident}Female`] = result?.filter(item => Number(item.Q8) === 4 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 2)?.length || 0;
                data[3][`total`] = result?.filter(item => 
                    Number(item.Q8) === 4 &&
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q28)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[4][`${resident}Male`] = result?.filter(item => Number(item.Q8) === 5 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 1)?.length || 0;
                data[4][`${resident}Female`] = result?.filter(item => Number(item.Q8) === 5 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 2)?.length || 0;
                data[4][`total`] = result?.filter(item => 
                    Number(item.Q8) === 5 &&
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q28)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[5][`${resident}Male`] = result?.filter(item => Number(item.Q8) === 6 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 1)?.length || 0;
                data[5][`${resident}Female`] = result?.filter(item => Number(item.Q8) === 6 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 2)?.length || 0;
                data[5][`total`] = result?.filter(item => 
                    Number(item.Q8) === 6 &&
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q28)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[6][`${resident}Male`] = result?.filter(item => Number(item.Q8) === 7 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 1)?.length || 0;
                data[6][`${resident}Female`] = result?.filter(item => Number(item.Q8) === 7 && Number(item.Q36) === idx + 1 && Number(item.Q28) === reasonCode && Number(item.Q3) === 2)?.length || 0;
                data[6][`total`] = result?.filter(item => 
                    Number(item.Q8) === 7 &&
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q28)) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentyFiveReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '0-4' },
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const facilityCodes = {
            hospital: 1,
            rhu: 2,
            healthStation: 3,
            privateHospital: 4,
            privateClinic: 5,
            pharmacy: 6,
            hilot: 7,
        }
        
        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [facility, facilityCode] of Object.entries(facilityCodes)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[0][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[0][`total`] = result?.filter(item => 
                    Number(item.Q4) <= 4 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[1][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[1][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[1][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[2][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[2][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[2][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[3][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[3][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[3][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[4][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[4][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[4][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[5][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[5][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[5][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[6][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[6][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[6][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[7][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[7][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[7][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[8][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[8][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[8][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[9][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[9][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[9][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[10][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[10][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[10][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[11][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[11][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[11][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[12][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[12][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[12][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[13][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[13][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[13][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[14][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[14][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[14][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
               
                data[15][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[15][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[15][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[16][`${resident}${facility}Male`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 1)?.length || 0;
                data[16][`${resident}${facility}Female`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === idx + 1 && Number(item.Q27) === facilityCode && Number(item.Q3) === 2)?.length || 0;
                data[16][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 80 && 
                    [1, 2, 3, 4, 5, 6, 7].includes(Number(item.Q27)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentySixReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '0-4' },
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const disabilities = {
            sensory: ["5"," 7"],
            physical: ["6"],
            mental: ["1", "2", "3", "4", "8", "9"],
        }
        
        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [disability, disabilityCode] of Object.entries(disabilities)) {
            residentCodes.map((resident, idx) => {
                data[0][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[0][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[0][`total`] = result?.filter(item => 
                    Number(item.Q4) <= 4 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[1][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[1][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[1][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[2][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[2][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[2][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[3][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[3][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[3][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[4][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[4][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[4][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[5][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[5][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[5][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[6][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[6][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[6][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[7][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[7][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[7][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[8][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[8][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[8][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[9][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[9][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[9][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[10][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[10][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[10][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[11][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[11][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[11][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[12][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[12][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[12][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[13][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[13][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[13][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[14][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[14][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[14][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
               
                data[15][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[15][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[15][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[16][`${resident}${disability}Male`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 1)?.length || 0;
                data[16][`${resident}${disability}Female`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === idx + 1 && disabilityCode.includes(item.Q29) && Number(item.Q3) === 2)?.length || 0;
                data[16][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 80 && 
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(item.Q29)) &&
                    [1, 2, 3].includes(Number(item.Q36)) &&
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentySevenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '0-4' },
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];
        
        data[0]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) <= 4)?.length || 0;
        data[1]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 5 && Number(item?.Q54?.split(",")[0]) <= 9)?.length || 0;
        data[2]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 10 && Number(item?.Q54?.split(",")[0]) <= 14)?.length || 0;
        data[3]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 15 && Number(item?.Q54?.split(",")[0]) <= 19)?.length || 0;
        data[4]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 20 && Number(item?.Q54?.split(",")[0]) <= 24)?.length || 0;
        data[5]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 25 && Number(item?.Q54?.split(",")[0]) <= 29)?.length || 0;
        data[6]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 30 && Number(item?.Q54?.split(",")[0]) <= 34)?.length || 0;
        data[7]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 35 && Number(item?.Q54?.split(",")[0]) <= 39)?.length || 0;
        data[8]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 40 && Number(item?.Q54?.split(",")[0]) <= 44)?.length || 0;
        data[9]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 45 && Number(item?.Q54?.split(",")[0]) <= 49)?.length || 0;
        data[10]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 50 && Number(item?.Q54?.split(",")[0]) <= 54)?.length || 0;
        data[11]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 55 && Number(item?.Q54?.split(",")[0]) <= 59)?.length || 0;
        data[12]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 60 && Number(item?.Q54?.split(",")[0]) <= 64)?.length || 0;
        data[13]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 65 && Number(item?.Q54?.split(",")[0]) <= 69)?.length || 0;
        data[14]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 70 && Number(item?.Q54?.split(",")[0]) <= 74)?.length || 0;
        data[15]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 75 && Number(item?.Q54?.split(",")[0]) <= 79)?.length || 0;
        data[16]['mortality'] = result?.filter(item => Number(item?.Q54?.split(",")[0]) >= 80)?.length || 0;

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentyEightReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        let data = getCauseOfDeathArray(result);

        data?.forEach((d) => {
            result.forEach((res) => {
                if (res?.Q54?.split(",")[1] !== undefined && res?.Q54?.split(",")[1].includes(d.cause)) {
                    d['mortality'] = result.filter((y) => y?.Q54?.split(",")[1] === d.cause).length || 0;
                }
            });
        });

        return res.json({ success: true, data: data?.filter(d => d.cause !== undefined) });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableTwentyNineReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '0' },
            { age: '1' },
            { age: '2' },
            { age: '3' },
            { age: '4' },
            { age: '5' },
        ];
        
        data[0]['male'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 0 && ['M', 'm', 'Male', 'male'].includes((item?.Q55?.split(",")[1])))?.length || 0;
        data[0]['female'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 0 && ['F', 'f', 'Female', 'female'].includes((item?.Q55?.split(",")[1])))?.length || 0;

        data[1]['male'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 1 && ['M', 'm', 'Male', 'male'].includes((item?.Q55?.split(",")[1])))?.length || 0;
        data[1]['female'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 1 && ['F', 'f', 'Female', 'female'].includes((item?.Q55?.split(",")[1])))?.length || 0;

        data[2]['male'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 2 && ['M', 'm', 'Male', 'male'].includes((item?.Q55?.split(",")[1])))?.length || 0;
        data[2]['female'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 2 && ['F', 'f', 'Female', 'female'].includes((item?.Q55?.split(",")[1])))?.length || 0;

        data[3]['male'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 3 && ['M', 'm', 'Male', 'male'].includes((item?.Q55?.split(",")[1])))?.length || 0;
        data[3]['female'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 3 && ['F', 'f', 'Female', 'female'].includes((item?.Q55?.split(",")[1])))?.length || 0;

        data[4]['male'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 4 && ['M', 'm', 'Male', 'male'].includes((item?.Q55?.split(",")[1])))?.length || 0;
        data[4]['female'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 4 && ['F', 'f', 'Female', 'female'].includes((item?.Q55?.split(",")[1])))?.length || 0;

        data[5]['male'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 5 && ['M', 'm', 'Male', 'male'].includes((item?.Q55?.split(",")[1])))?.length || 0;
        data[5]['female'] = result?.filter(item => Number(item?.Q55?.split(",")[0]) === 5 && ['F', 'f', 'Female', 'female'].includes((item?.Q55?.split(",")[1])))?.length || 0;

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtyReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        let data = getReasonOfDeathArray(result);

        data?.forEach((d) => {
            result.forEach((res) => {
                if (res?.Q55?.split(",")[1] !== undefined && res?.Q55?.split(",")[2]?.includes(d.cause)) {
                    d['male'] = result.filter((y) => y?.Q55?.split(",")[2]?.trim() === d?.cause && ['M', 'm', 'Male', 'male'].includes(y?.Q55?.split(",")[1]?.trim())).length || 0;
                    d['female'] = result.filter((y) => y?.Q55?.split(",")[2]?.trim() === d?.cause && ['F', 'f', 'Female', 'female'].includes((y?.Q55?.split(",")[1]?.trim()))).length || 0;
                }
            });
        });

        return res.json({ success: true, data: data?.filter(d => d.cause !== undefined) });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtyOneReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        let dataReason = getReasonOfDeathArray(result);
        let dataCause = getCauseOfDeathArray(result);

        const data = [...dataCause, ...dataReason]

        data.map((d, idx) => {
            result.forEach((res) => {
                if (
                    res?.Q54?.split(",")[1] !== undefined && res?.Q55?.split(",")[2] !== undefined && 
                    (res?.Q54?.split(",")[1]?.includes(d.cause) || res?.Q55?.split(",")[2]?.includes(d.cause))
                ) {
                    d['total'] = result.filter((y) => y?.Q54?.split(",")[1]?.trim() === d.cause || y?.Q55?.split(",")[2]?.trim() === d.cause).length || 0;
                }
            });
        })

        return res.json({ success: true, data: data?.filter(d => d.cause !== undefined) });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtyTwoReport = async (req, res) => {
    try {
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtyThreeReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { sex: 'Male' },
            { sex: 'Female' }
        ]

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        residentCodes.map((resident, idx) => {
            data[0][`${resident}Registered`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q31) === 1 && Number(item.Q3) === 1)?.length || 0;
            data[0][`${resident}UnRegistered`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q31) === 2 && Number(item.Q3) === 1)?.length || 0;
            data[0][`total`] = result.filter(item => 
                Number(item.Q4) >= 60 && 
                [1, 2].includes(Number(item.Q31)) && 
                Number(item.Q3) === 1)?.length || 0;

            data[1][`${resident}Registered`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q31) === 1 && Number(item.Q3) === 2)?.length || 0;
            data[1][`${resident}UnRegistered`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q31) === 2 && Number(item.Q3) === 2)?.length || 0;
            data[1][`total`] = result.filter(item => 
                Number(item.Q4) >= 60 && 
                [1, 2].includes(Number(item.Q31)) && 
                Number(item.Q3) === 2)?.length || 0;
        })

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtyFourReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const responseAddress = await addressModel.getAllAddress();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === Number(address))

        const barangay = address !== 0 ? responseAddress?.find(item => Number(item.id) === Number(address))?.barangay?.toLowerCase() : null

        const data = [
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const voterCodes = [
            "registered",
            "registeredInOther",
            "unRegistered",
        ]

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        residentCodes.map((resident, idx) => {
            data[0][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[0][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[0][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[0][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[0][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[0][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[0][`total`] = result.filter(item => 
                Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[1][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[1][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[1][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[1][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[1][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[1][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[1][`total`] = result.filter(item => 
                Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[2][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[2][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[2][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[2][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[2][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[2][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[2][`total`] = result.filter(item => 
                Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[3][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[3][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[3][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[3][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[3][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[3][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[3][`total`] = result.filter(item => 
                Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[4][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[4][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[4][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[4][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[4][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[4][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[4][`total`] = result.filter(item => 
                Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[5][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[5][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[5][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[5][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[5][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[5][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[5][`total`] = result.filter(item => 
                Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[6][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[6][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[6][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[6][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[6][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[6][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[6][`total`] = result.filter(item => 
                Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[7][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[7][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[7][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[7][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[7][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[7][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[7][`total`] = result.filter(item => 
                Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[8][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[8][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[8][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[8][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[8][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[8][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[8][`total`] = result.filter(item => 
                Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[9][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[9][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[9][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[9][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[9][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[9][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[9][`total`] = result.filter(item => 
                Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[10][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[10][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[10][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[10][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[10][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[10][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[10][`total`] = result.filter(item => 
                Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[11][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[11][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[11][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[11][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[11][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[11][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[11][`total`] = result.filter(item => 
                Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[12][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[12][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[12][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[12][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[12][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[12][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[12][`total`] = result.filter(item => 
                Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;

            data[13][`${resident}RegisteredMale`] = result.filter(item => Number(item.Q4) >= 80 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[13][`${resident}RegisteredInOtherMale`] = result.filter(item => Number(item.Q4) >= 80 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[13][`${resident}UnRegisteredMale`] = result.filter(item => Number(item.Q4) >= 80 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
            data[13][`${resident}RegisteredFemale`] = result.filter(item => Number(item.Q4) >= 80 && item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[13][`${resident}RegisteredInOtherFemale`] = result.filter(item => Number(item.Q4) >= 80 && !item?.Q32?.toLowerCase()?.includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[13][`${resident}UnRegisteredFemale`] = result.filter(item => Number(item.Q4) >= 80 && ['n/a'].includes(barangay) && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            data[13][`total`] = result.filter(item => 
                Number(item.Q4) >= 80 && 
                (item?.Q32?.toLowerCase()?.includes(barangay) || !item?.Q32?.toLowerCase()?.includes(barangay) || ['n/a'].includes(barangay)) && 
                [1, 2, 3].includes(Number(item.Q36)) && 
                [1, 2].includes(Number(item.Q3))).length || 0;
        })

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtyFiveReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const skills = {
            aircondition: 1,
            automotive: 2,
            metal: 3,
            wiring: 4,
            equipment: 5,
            plumbing: 6,
            welding: 7,
            carpentry: 8,
            baking: 9,
            dressmaking: 10,
            linguist: 11,
            graphics: 12,
            painting: 13,
            beauty: 14,
            cooking: 15,
            housekeeping: 16,
            massage: 17,
            others: 18,
        }

        const residentCodes = [
            "nonMigrant",
            "migrant",
            "transient"
        ];

        for (const [skill, skillCode] of Object.entries(skills)) {
            residentCodes?.map((resident, idx) => {
                data[0][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[0][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[0][`total`] = result.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
                
                data[1][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`total`] = result.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[2][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`total`] = result.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[3][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`total`] = result.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[4][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`total`] = result.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[5][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[5][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`total`] = result.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[6][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[6][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`total`] = result.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[7][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[7][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`total`] = result.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[8][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[8][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`total`] = result.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[9][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[9][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[9][`total`] = result.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[10][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[10][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[10][`total`] = result.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[11][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[11][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[11][`total`] = result.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[12][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[12][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[12][`total`] = result.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;

                data[13][`${resident}${skill}Male`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[13][`${resident}${skill}Female`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q44) === skillCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[13][`total`] = result.filter(item => 
                    Number(item.Q4) >= 80 && 
                    [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19].includes(Number(item.Q44)) &&
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3))).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtySixReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        let data = getPrimaryNeedsArray(result);

        data.map((d) => {
            result.forEach((res) => {
                if (res.Q57 !== undefined && res.Q57 !== null && res?.Q57?.includes(d.need)) {
                    d['total'] = result.filter((y) => y?.Q57?.includes(d.need)).length || 0;
                }
            });
        })

        return res.json({ success: true, data: data?.filter(d => d.need !== undefined) });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtySevenReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const calculateDate = {
            sixMonthsAgo: (date) => {
                const sixMonthsAgo = new Date(date);
                sixMonthsAgo.setMonth(date.getMonth() - 6);
                return sixMonthsAgo;
            },
            oneYearAgo: (date) => {
                const oneYearAgo = new Date(date);
                oneYearAgo.setFullYear(date.getFullYear() - 1);
                return oneYearAgo;
            },
            twoYearsAgo: (date) => {
                const twoYearsAgo = new Date(date);
                twoYearsAgo.setFullYear(date.getFullYear() - 2);
                return twoYearsAgo;
            },
            threeYearsAgo: (date) => {
                const threeYearsAgo = new Date(date);
                threeYearsAgo.setFullYear(date.getFullYear() - 3);
                return threeYearsAgo;
            },
            fourYearsAgo: (date) => {
                const fourYearsAgo = new Date(date);
                fourYearsAgo.setFullYear(date.getFullYear() - 4);
                return fourYearsAgo;
            },
        }

        const currentDate = new Date()

        data[0][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[0][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[0][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[0][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[0][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[0][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[0][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[0][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[0][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[0][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[0][`total`] = result?.filter(item => 
            Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[1][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[1][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[1][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[1][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[1][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[1][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[1][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[1][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[1][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[1][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[1][`total`] = result?.filter(item => 
            Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[2][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[2][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[2][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[2][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[2][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[2][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[2][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[2][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[2][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[2][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[2][`total`] = result?.filter(item => 
            Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[3][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[3][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[3][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[3][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[3][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[3][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[3][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[3][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[3][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[3][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[3][`total`] = result?.filter(item => 
            Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[4][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[4][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[4][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[4][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[4][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[4][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[4][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[4][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[4][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[4][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[4][`total`] = result?.filter(item => 
            Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[5][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[5][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[5][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[5][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[5][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[5][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[5][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[5][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[5][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[5][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[5][`total`] = result?.filter(item => 
            Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[6][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[6][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[6][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[6][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[6][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[6][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[6][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[6][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[6][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[6][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[6][`total`] = result?.filter(item => 
            Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[7][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[7][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[7][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[7][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[7][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[7][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[7][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[7][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[7][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[7][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[7][`total`] = result?.filter(item => 
            Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[8][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[8][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[8][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[8][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[8][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[8][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[8][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[8][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[8][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[8][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[8][`total`] = result?.filter(item => 
            Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[9][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[9][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[9][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[9][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[9][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[9][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[9][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[9][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[9][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[9][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[9][`total`] = result?.filter(item => 
            Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[10][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[10][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[10][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[10][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[10][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[10][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[10][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[10][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[10][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[10][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[10][`total`] = result?.filter(item => 
            Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[11][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[11][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[11][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[11][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[11][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[11][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[11][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[11][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[11][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[11][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[11][`total`] = result?.filter(item => 
            Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[12][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[12][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[12][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[12][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[12][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[12][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[12][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[12][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[12][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[12][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[12][`total`] = result?.filter(item => 
            Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[13][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[13][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[13][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[13][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[13][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[13][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[13][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[13][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[13][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[13][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[13][`total`] = result?.filter(item => 
            Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[14][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[14][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[14][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[14][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[14][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[14][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[14][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[14][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[14][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[14][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[14][`total`] = result?.filter(item => 
            Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        data[15][`sixMonthMale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[15][`oneYearAgoMale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[15][`twoYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[15][`threeYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[15][`fourYearsAgoMale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 1 )?.length || 0;
        data[15][`sixMonthFemale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[15][`oneYearAgoFemale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[15][`twoYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[15][`threeYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[15][`fourYearsAgoFemale`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === 2 && new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate) && Number(item.Q3) === 2)?.length || 0;
        data[15][`total`] = result?.filter(item => 
            Number(item.Q4) >= 80 && 
            Number(item.Q36) === 2 && 
            [1, 2].includes(Number(item.Q3)) &&
            (
                new Date(item.Q37) >= calculateDate.sixMonthsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.oneYearAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.twoYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.threeYearsAgo(currentDate) ||
                new Date(item.Q37) >= calculateDate.fourYearsAgo(currentDate)
            )
        )?.length || 0;

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirtyEightReport = async (req, res) => {
    
}

export const getTableThirtyNineReport = async (req, res) => {
    
}

export const getTableFortyReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { age: '5-9' },
            { age: '10-14' },
            { age: '15-19' },
            { age: '20-24' },
            { age: '25-29' },
            { age: '30-34' },
            { age: '35-39' },
            { age: '40-44' },
            { age: '45-49' },
            { age: '50-54' },
            { age: '55-59' },
            { age: '60-64' },
            { age: '65-69' },
            { age: '70-74' },
            { age: '75-79' },
            { age: '80+' }
        ];

        const yearCodes = {
            one: '1',
            two: '2',
            three: '3',
            four: '4'
        }

        const residentStatus = [
            "migrant",
            'transient'
        ]

        const noAlphabeticRegex = /^[^A-Za-z]+$/;

        response.map(item => {
            console.log(noAlphabeticRegex.test(item.Q41) && Number(item.Q41));
        })

        for(const [year, yearCode] of Object.entries(yearCodes)){
            residentStatus.map((resident, idx) => {
                data[0][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[0][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[0][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[0][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[0][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[0][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[0][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[1][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[1][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[1][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[1][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[1][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[1][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[1][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[2][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[2][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[2][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[2][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[2][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[2][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[2][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[3][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[3][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[3][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[3][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[3][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[3][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[3][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[4][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[4][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[4][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[4][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[4][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[4][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[4][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[5][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[5][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[5][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[5][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[5][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[5][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[5][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[6][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[6][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[6][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[6][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[6][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[6][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[6][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
    
                data[7][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[7][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[7][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[7][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[7][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[7][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[7][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
                    
                data[8][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[8][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[8][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[8][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[8][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[8][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[8][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
                    
                data[9][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[9][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[9][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[9][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[9][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[9][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[9][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
                    
                data[10][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[10][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[10][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[10][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[10][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[10][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[10][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
                    
                data[11][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[11][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[11][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[11][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[11][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[11][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[11][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
                    
                data[12][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[12][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[12][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[12][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[12][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[12][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[12][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
                    
                data[13][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[13][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[13][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[13][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[13][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[13][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[13][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
                    
                data[14][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[14][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[14][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[14][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[14][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[14][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[14][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
                    
                data[15][`${resident}${year}Male`] = result?.filter(item => Number(item.Q4) >= 80 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[15][`${resident}sixMale`] = result?.filter(item => Number(item.Q4) >= 80 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[15][`${resident}willNotTansferMale`] = result?.filter(item => Number(item.Q4) >= 80 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 1)?.length || 0;
                data[15][`${resident}${year}Female`] = result?.filter(item => Number(item.Q4) >= 80 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) === yearCode) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[15][`${resident}sixFemale`] = result?.filter(item => Number(item.Q4) >= 80 && (noAlphabeticRegex.test(item.Q41) && Number(item.Q41) >= 6) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[15][`${resident}willNotTansferFemale`] = result?.filter(item => Number(item.Q4) >= 80 && ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41) && Number(item.Q36) === idx + 2 && Number(item.Q3) === 2)?.length || 0;
                data[15][`total`] = result?.filter(item => 
                    Number(item.Q4) >= 80 && 
                    ((noAlphabeticRegex.test(item.Q41) ? Number(item.Q41) === yearCode || Number(item.Q41) >= 6: ['forever', 'Forever', 'Lifetime', 'lifetime'].includes(item.Q41))) && 
                    [1, 2, 3].includes(Number(item.Q36)) && 
                    [1, 2].includes(Number(item.Q3)))?.length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableFortyOneReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { place: 'Current barangay' },
            { place: 'Other place' }
        ];  

        data[0]['total'] = result.filter(item => item?.Q33?.split(",")[0]?.includes(item.Q32))?.length || 0;
        data[1]['total'] = result.filter(item => !item?.Q33?.split(",")[0]?.includes(item.Q32))?.length || 0;

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableFortyTwoReport = async (req, res) => {
    try {
        const { address, dateFrom, dateTo } = req.params;
        const response = await reportModel.getAllSurveyFormsData();
        const result = address !== 0 ? 
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo)) :
            response.filter(data => isDateInRange(data?.date_encoded, dateFrom, dateTo) && Number(data.address) === address)

        const data = [
            { housing: 'Ownership of Housing Unit' },
            { housing: 'Rent-free without consent of owner' },
            { housing: 'Rent-free with consent of owner' },
            { housing: 'Rented' },
            { housing: 'Owned/being amortized' },
        ];  

        data[0]['total'] = result.filter(item => Number(item.Q46) === 1)?.length || 0;
        data[1]['total'] = result.filter(item => Number(item.Q46) === 2)?.length || 0;
        data[2]['total'] = result.filter(item => Number(item.Q46) === 3)?.length || 0;
        data[3]['total'] = result.filter(item => Number(item.Q46) === 4)?.length || 0;
        data[4]['total'] = result.filter(item => Number(item.Q46) === 5)?.length || 0;

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}