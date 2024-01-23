import { reportModel } from "../models/ReportModel.js";
import { getEthnicityArray, getImmuzationArray, getReligionsArray } from "../helper/getHeaders.js";

export const getAllSurveyFormsData = async (req, res) => {
    try {
        const result = await reportModel.getAllSurveyFormsData();
        return res.json({ success: true, data: result})
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"})
    }
}

export const getTableOneReport = async (req, res) => {
    try {
        const result = await reportModel.getAllSurveyFormsData();
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
            data[0][`total`] = result?.filter(item => Number(item.Q4) <= 4 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[1][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[1][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[1][`total`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[2][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[2][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[2][`total`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[3][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[3][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[3][`total`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[4][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1)?.length || 0;
            data[4][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[4][`total`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[5][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[5][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[5][`total`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[6][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[6][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[6][`total`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[7][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[7][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[7][`total`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[8][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[8][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[8][`total`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[9][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[9][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[9][`total`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[10][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[10][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[10][`total`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[11][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[11][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[11][`total`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[12][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[12][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[12][`total`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[13][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[13][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[13][`total`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[14][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[14][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[14][`total`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[15][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[15][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[15][`total`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;

            data[16][`${migrant}Male`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === migrantCode && Number(item.Q3) === 1 )?.length || 0;
            data[16][`${migrant}Female`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q36) === migrantCode && Number(item.Q3) === 2 )?.length || 0;
            data[16][`total`] = result?.filter(item => Number(item.Q4) >= 80 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3) && (Number(item.Q3) === 1 || Number(item.Q3) === 2))?.length || 0;
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
        const result = await reportModel.getAllSurveyFormsData();
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
                data[0][`total`] = result?.filter(item => Number(item.Q4) <= 4 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;
                
                data[1][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0; 
                data[1][`total`] = result?.filter(item => Number(item.Q4) >= 5 && Number(item.Q4) <= 9 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0; 

                data[2][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[2][`total`] = result?.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[3][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[3][`total`] = result?.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[4][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[4][`total`] = result?.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[5][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[5][`total`] = result?.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[6][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[6][`total`] = result?.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[7][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[7][`total`] = result?.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[8][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[8][`total`] = result?.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[9][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[9][`total`] = result?.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[10][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[10][`total`] = result?.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[11][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[11][`total`] = result?.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[12][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[12][`total`] = result?.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[13][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[13][`total`] = result?.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[14][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[14][`total`] = result?.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[15][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[15][`total`] = result?.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0;

                data[16][`${resident}${marital}`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q8) === maritalCode && Number(item.Q36) === idx + 1)?.length || 0;
                data[16][`total`] = result?.filter(item => Number(item.Q4) >= 80 && Number(item.Q8) <= 7 && (Number(item.Q36) === 1 || Number(item.Q36) === 2 || Number(item.Q36) === 3))?.length || 0})

        }

        return res.json({ success: true, data: data});
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableFourReport = async (req, res) => {
    try {
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
                
                data[1][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[1][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[2][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[2][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[3][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[3][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[4][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[4][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[5][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[5][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[6][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[6][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[7][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[7][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[8][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[8][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 55 && Number(item.Q4) <= 59 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[9][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[9][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 60 && Number(item.Q4) <= 64 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[10][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[10][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 65 && Number(item.Q4) <= 69 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[11][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[11][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 70 && Number(item.Q4) <= 74 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[12][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[12][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 75 && Number(item.Q4) <= 79 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                data[13][`${resident}${work}Male`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 1).length || 0;
                data[13][`${resident}${work}Female`] = result.filter(item => Number(item.Q4) >= 80 && Number(item.Q17) === workCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableThirteenReport = async (req, res) => {
    try {
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
        const result = await reportModel.getAllSurveyFormsData();
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
                data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item?.Q22?.split(",")[0]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            
                if(numberCode === 10){
                    data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item?.Q22?.split(",")[0]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
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
        const result = await reportModel.getAllSurveyFormsData();
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
                data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                if(numberCode === 10){
                    data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 14 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
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
        const result = await reportModel.getAllSurveyFormsData();
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
                data[1][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 15 && Number(item.Q4) <= 19 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 20 && Number(item.Q4) <= 24 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 25 && Number(item.Q4) <= 29 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 30 && Number(item.Q4) <= 34 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 35 && Number(item.Q4) <= 39 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 40 && Number(item.Q4) <= 44 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 45 && Number(item.Q4) <= 49 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`${resident}${contraception}`] = result.filter(item => Number(item.Q4) >= 50 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}

export const getTableNineteenReport = async (req, res) => {
    try {
        const result = await reportModel.getAllSurveyFormsData();
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
                    data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                    data[9][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) === numberCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                
                    if(numberCode === 10){
                        data[0][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[1][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[2][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[3][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[4][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[5][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[6][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[7][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[8][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                        data[9][`${resident}${number}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === contraceptionCode && Number(item?.Q22?.split(",")[1]) >= 10 && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;    
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
        const result = await reportModel.getAllSurveyFormsData();
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
                data[0][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[1][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[2][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[3][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[4][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[5][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[6][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[7][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;
                data[8][`${resident}${source}`] = result.filter(item => Number(item.Q4) >= 10 && Number(item.Q4) <= 54 && Number(item.Q24) === sourceCode && Number(item.Q36) === idx + 1 && Number(item.Q3) === 2).length || 0;            })
        }

        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: "Internal server error"});
    }
}