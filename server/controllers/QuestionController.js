import { HTTP_STATUS } from '../helper/httpStatus.js'
import { questionModel } from '../models/QuestionModel.js'

export const getAllQuestions = async (req, res) => {
  try {
    const result = await questionModel.getAllQuestion()
    return res.status(HTTP_STATUS.OK).json(result)
  } catch (error) {
    return res.json('Internal Server Error');
  }
}