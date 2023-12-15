import { surveyFormModel } from '../models/SurveyFormModel.js'

export const addSurveyForm = async (req, res) => {
  try {
    const { household, surveyForm, questionsAndResponses } = await req.body
    await surveyFormModel.addSurveyForm({ household, surveyForm, questionsAndResponses })
    return res.json({ success: true, message: "Survey form added successfully" })
  } catch (error) {
    return res.json({ success: false, message: `Internal server error: ${error}` })
  }
}