import db from '../dbConnect.js'

const convertData = (originalData, householdId) => {
  const result = [];
  
  originalData.forEach((array) => {
    if(array.length > 0){
      if(array.length === 65){
        result.push([ householdId, ...array ])
      }
  
      if(array.length < 65){
        const fillerArr = Array(65 - array.length).fill(null)
        result.push([ householdId, ...array, ...fillerArr ])
      }
    }
  });

  return result;
};

const getAllSurvey = async () => {
  try {
    const surveyFormsResults= await new Promise(( resolve, reject ) => {
      db.query('SELECT * FROM survey_form INNER JOIN household ON survey_form.id = household.survey_form_id', 
      ((error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }))
    })

    return surveyFormsResults && surveyFormsResults.length > 0 ? surveyFormsResults : null
  } catch (error) {
    throw error
  }
}

const addSurveyForm = async ({ household, surveyForm, questionsAndResponses }) => {
  try {
    const surveyFormResult = await new Promise(( resolve, reject ) => {
      db.query('INSERT INTO `survey_form`(`first_visit_date`, `first_visit_time_start`, `first_visit_time_end`, `first_visit_result`, `first_visit_date_next_visit`, `first_visit_interviewer`, `first_visit_supervisor`, `second_visit_date`, `second_visit_time_start`, `second_visit_time_end`, `second_visit_result`, `second_visit_date_next_visit`, `second_visit_interviewer`, `second_visit_supervisor`, `date_encoded`, `encoder_name`, `supervisor_name`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [surveyForm.first_visit_date, surveyForm.first_visit_time_start, surveyForm.first_visit_time_end, surveyForm.first_visit_result, surveyForm.first_visit_date_next_visit, surveyForm.first_visit_interviewer, surveyForm.first_visit_supervisor, surveyForm.second_visit_date, surveyForm.second_visit_time_start, surveyForm.second_visit_time_end, surveyForm.second_visit_result, surveyForm.second_visit_date_next_visit, surveyForm.second_visit_interviewer, surveyForm.second_visit_supervisor, surveyForm.date_encoded, surveyForm.encoder_name, surveyForm.supervisor_name], 
      (( error, result ) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      }))
    })

    const householdResult = await new Promise(( resolve, reject ) => {
      db.query('INSERT INTO `household`(`survey_form_id`, `household_number`, `living_type`, `respondent_name`, `household_head`, `household_member_no`, `address`, `unit_no`, `house_no`, `street`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [surveyFormResult, household.household_number, household.living_type, household.respondent_name, household.household_head, household.household_member_no, household.address, household.unit_no, household.house_no, household.street], 
      (( error, result ) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      }))
    })
    
    await new Promise(( resolve, reject ) => {
      const arrayWithHouseholdId = convertData(questionsAndResponses, householdResult)
      db.query('INSERT INTO `questions_and_response`(`household_id`, `member_no`, `Q1`, `Q2`, `Q3`, `Q4`, `Q5`, `Q6`, `Q7`, `Q8`, `Q9`, `Q10`, `Q11`, `Q12`, `Q13`, `Q14`, `Q15`, `Q16`, `Q17`, `Q18`, `Q19`, `Q20`, `Q21`, `Q22`, `Q23`, `Q24`, `Q25`, `Q26`, `Q27`, `Q28`, `Q29`, `Q30`, `Q31`, `Q32`, `Q33`, `Q34`, `Q35`, `Q36`, `Q37`, `Q38A`, `Q38B`, `Q38C`, `Q39`, `Q40A`, `Q40B`, `Q40C`, `Q41`, `Q42A`, `Q42B`, `Q43`, `Q44`, `Q45`, `Q46`, `Q47`, `Q48`, `Q49`, `Q50A`, `Q50B`, `Q51`, `Q52`, `Q53`, `Q54`, `Q55`, `Q56`, `Q57`, `Q58`) VALUES ?', 
      [arrayWithHouseholdId], 
      (( error, result ) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      }))
    })

    return surveyFormResult ? surveyFormResult : null
  } catch (error) {
    throw error
  }
}

const getSurveyFormById = async (surveyFormId) => {
  try {
    const surveyFormResult = await new Promise(( resolve, reject ) => {
      db.query('SELECT DISTINCT `survey_form`.*, `household`.*, `address`.*, `questions_and_response`.* FROM `survey_form` INNER JOIN `household` ON `survey_form`.`id` = `household`.`survey_form_id` INNER JOIN `questions_and_response` ON `household`.`id` = `questions_and_response`.`household_id` INNER JOIN `address` ON `address`.`id` = `household`.`address` WHERE `survey_form`.`id` = ?', 
      [surveyFormId],
      ((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }))
    })
    
    return surveyFormResult && surveyFormResult.length > 0 ? surveyFormResult : null
  } catch (error) {
    throw error
  }
}

export const updateSurveyForm = async ({ household, surveyForm, questionsAndResponses }) => {
  try {
    const { 
      survey_form_id,
      first_visit_date,
      first_visit_time_start,
      first_visit_time_end,
      first_visit_result,
      first_visit_date_next_visit,
      first_visit_interviewer,
      first_visit_supervisor,
      second_visit_date,
      second_visit_time_start,
      second_visit_time_end,
      second_visit_result,
      second_visit_date_next_visit,
      second_visit_interviewer,
      second_visit_supervisor,
      date_encoded,
      encoder_name,
      supervisor_name, 
    } = surveyForm
    const {
      household_id,
      household_number,
      living_type,
      respondent_name,
      household_head,
      household_member_no,
      address,
      unit_no,
      house_no,
      street,
    } = household

    const surveyFormResult = await new Promise((resolve, reject) => {
      db.query('UPDATE `survey_form` SET `first_visit_date`= ? , `first_visit_time_start`= ? , `first_visit_time_end`= ? , `first_visit_result`= ? , `first_visit_date_next_visit`= ? , `first_visit_interviewer`= ? , `first_visit_supervisor`= ? , `second_visit_date`= ? , `second_visit_time_start`= ? , `second_visit_time_end`= ? , `second_visit_result`= ? , `second_visit_date_next_visit`= ? , `second_visit_interviewer`= ? , `second_visit_supervisor`= ? WHERE `id` = ?',
      [ 
        first_visit_date,
        first_visit_time_start,
        first_visit_time_end,
        first_visit_result,
        first_visit_date_next_visit,
        first_visit_interviewer,
        first_visit_supervisor,
        second_visit_date,
        second_visit_time_start,
        second_visit_time_end,
        second_visit_result,
        second_visit_date_next_visit,
        second_visit_interviewer,
        second_visit_supervisor,
        survey_form_id
      ],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    })

    await new Promise((resolve, reject) => {
      db.query('UPDATE `household` SET `survey_form_id`= ?, `household_number`= ?, `living_type`= ?, `respondent_name`= ?, `household_head`= ?, `household_member_no`= ?, `address`= ?, `unit_no`= ?, `house_no`= ?, `street`= ? WHERE `id` = ?' , 
      [
        survey_form_id,
        household_number,
        living_type,
        respondent_name,
        household_head,
        household_member_no,
        address,
        unit_no,
        house_no,
        street,
        household_id
      ],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    })

    await Promise.all(
      questionsAndResponses.map(async (data) => {
        try {
          if(data.length > 0){
            const [row] = await db.query(
              `UPDATE questions_and_response 
              SET Q1 = ?, Q2 = ?, Q3 = ?, Q4 = ?, Q5 = ?, Q6 = ?, Q7 = ?, Q8 = ?, Q9 = ?, Q10 = ?, Q11 = ?, Q12 = ?, Q13 = ?, Q14 = ?, Q15 = ?, Q16 = ?, Q17 = ?, Q18 = ?, Q19 = ?, Q20 = ?, Q21 = ?, Q22 = ?, Q23 = ?, Q24 = ?, Q25 = ?, Q26 = ?, Q27 = ?, Q28 = ?, Q29 = ?, Q30 = ?, Q31 = ?, Q32 = ?, Q33 = ?, Q34 = ?, Q35 = ?, Q36 = ?, Q37 = ?, Q38A = ?, Q38B = ?, Q38C = ?, Q39 = ?, Q40A = ?, Q40B = ?, Q40C = ?, Q41 = ?, Q42A = ?, Q42B = ?, Q43 = ?, Q44 = ?, Q45 = ?, Q46 = ?, Q47 = ?, Q48 = ?, Q49 = ?, Q50A = ?, Q50B = ?, Q51 = ?, Q52 = ?, Q53 = ?, Q54 = ?, Q55 = ?, Q56 = ?, Q57 = ?, Q58 = ?
              WHERE id = ?`,
              [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12], data[13], data[14], data[15], data[16], data[17], data[18], data[19], data[20], data[21], data[22], data[23], data[24], data[25], data[26], data[27], data[28], data[29], data[30], data[31], data[32], data[33], data[34], data[35], data[36], data[37], data[38], data[39], data[40], data[41], data[42], data[43], data[44], data[45], data[46], data[47], data[48], data[49], data[50], data[51], data[52], data[53], data[54], data[55], data[56], data[57], data[58], data[59], data[60], data[61], data[62], data[63], data[64], data[65]]
            );
    
            return row;
          }
        } catch (error) {
          return error
        }
      })
    );

    return surveyFormResult && surveyFormResult.affectedRows > 0 ? surveyFormResult : null
  } catch (error) {
    throw error
  }
}

export const surveyFormModel = {
  getAllSurvey,
  addSurveyForm,
  getSurveyFormById,
  updateSurveyForm
} 