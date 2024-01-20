import db from '../dbConnect.js'

const getAllSurveyFormsData = async () => {
    try {
        const surveyFormResult = await new Promise(( resolve, reject ) => {
          db.query('SELECT `survey_form`.*, `household`.*, `address`.*, `questions_and_response`.* FROM `survey_form` INNER JOIN `household` ON `survey_form`.`id` = `household`.`survey_form_id` INNER JOIN `questions_and_response` ON `household`.`id` = `questions_and_response`.`household_id` INNER JOIN `address` ON `address`.`id` = `household`.`address`',
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
        throw error;
    }
}

export const reportModel = {
    getAllSurveyFormsData
} 