import db from '../dbConnect.js'

const convertData = (originalData, householdId) => {
  const result = [];

  originalData.forEach(array => {
    array.forEach((item) => {
      const { memberNo, question, response } = item;
      result.push([ householdId, memberNo, question, response ]);
    });
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

    const questionsAnsResponsesResult = await new Promise(( resolve, reject ) => {
      const newQuestionsAndResponses = convertData(questionsAndResponses, householdResult)
      db.query('INSERT INTO `question_response`(`household_id`, `member_no`, `question`, `response`) VALUES ?', 
      [newQuestionsAndResponses], 
      (( error, result ) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      }))
    })

    return questionsAnsResponsesResult && questionsAnsResponsesResult.length > 0 ? questionsAnsResponsesResult[0] : null
  } catch (error) {
    throw error
  }
}

const getSurveyFormById = async (surveyFormId) => {
  try {
    const surveyFormResult = await new Promise(( resolve, reject ) => {
      db.query('SELECT DISTINCT `survey_form`.*, `household`.*, `address`.*, `question_response`.* FROM `survey_form` INNER JOIN `household` ON `survey_form`.`id` = `household`.`survey_form_id` INNER JOIN `question_response` ON `household`.`id` = `question_response`.`household_id` INNER JOIN `address` ON `address`.`id` = `household`.`address` WHERE `survey_form`.`id` = ?', 
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
    const formattedQuestionsAndResponses = []

    questionsAndResponses?.map(array => {
      array?.map(item => {
        const { id, household_id, member_no, question, response } = item
        formattedQuestionsAndResponses.push([id, household_id, member_no, question, response])
      })
    })

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
      db.query('UPDATE `survey_form` SET `first_visit_date`= ? , `first_visit_time_start`= ? , `first_visit_time_end`= ? , `first_visit_result`= ? , `first_visit_date_next_visit`= ? , `first_visit_interviewer`= ? , `first_visit_supervisor`= ? , `second_visit_date`= ? , `second_visit_time_start`= ? , `second_visit_time_end`= ? , `second_visit_result`= ? , `second_visit_date_next_visit`= ? , `second_visit_interviewer`= ? , `second_visit_supervisor`= ? , `date_encoded`= ? , `encoder_name`= ? , `supervisor_name`= ? WHERE `id` = ?',
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
        date_encoded,
        encoder_name,
        supervisor_name,
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
      formattedQuestionsAndResponses.map(async (data) => {
        console.log(data);
        try {
          const [row] = await db.query(
            `UPDATE question_response 
            SET member_no = ?, question = ?, response = ?
            WHERE id = ?`,
            [data[2], data[3], data[4], data[0]]
          );
  
          return row;
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