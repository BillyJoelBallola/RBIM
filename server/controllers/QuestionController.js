import { questionModel } from '../models/QuestionModel.js'

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionModel.getAllQuestion()
    return res.json({ success: true, data: questions });
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error' });
  }
}