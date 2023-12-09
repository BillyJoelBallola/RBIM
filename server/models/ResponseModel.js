import db from '../dbConnect.js'

const getResponseByQuestionId = async (questinId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM response WHERE question_id = ?', [questinId], ((error, results) => {
        if (error) {
          reject(error);
        }else{
          resolve(results);
        }
      }))
    })

    return response && response.length > 0 ? response : null 
  } catch (error) {
    throw error
  }
}

const addResponse = async (responseData, questionId) => {
  try {
    const deleteResult = await new Promise((resolve, reject) => {
      db.query('DELETE FROM response WHERE question_id = ?', [questionId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    const insertResult = await new Promise((resolve, reject) => {
      const values = responseData.map(({ response_code, response_text }) => [questionId, response_code, response_text]);
      db.query('INSERT INTO response (question_id, response_code, response_text) VALUES ?', [values], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    })
      
    return insertResult.length > 0 ? insertResult[0].insertId : null;
  } catch (error) {
    throw error
  }
}

const removeResponse = async (responseId) => {
  try {
    const response = await new Promise((resolve, reject) => {
      db.query('DELETE FROM response WHERE id = ?', [responseId], ((error, results) => {
        if (error) {
          reject(error);
        }else{
          resolve(results);
        }
      }))
    })
    return response && response.affectedRows  > 0 ? responseId : null 
  } catch (error) {
    throw error
  }
}

export const responseModel = {
  getResponseByQuestionId,
  addResponse,
  removeResponse
}