import db from '../dbConnect.js'

const getAllQuestion = async () => {
  try {
    const questions = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM question', ((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }))
    })
   
    return questions && questions.length > 0 ? questions : null
  } catch (error) {
    throw error;
  }
}

export const questionModel = {
  getAllQuestion
}