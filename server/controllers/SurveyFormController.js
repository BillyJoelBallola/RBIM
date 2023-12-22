import { surveyFormModel } from '../models/SurveyFormModel.js'

export const getAllSurveyForms = async (req, res) => {
  try {
    const surveyForms = await surveyFormModel.getAllSurvey() 
    return res.json({ success: true, data: surveyForms })
  } catch (error) {
    return res.json({ success: false, message: `Internal server error` })
  }
}

export const addSurveyForm = async (req, res) => {
  try {
    const { household, surveyForm, questionsAndResponses } = await req.body
    await surveyFormModel.addSurveyForm({ household, surveyForm, questionsAndResponses })
    return res.json({ success: true, message: "Survey form added successfully" })
  } catch (error) {
    return res.json({ success: false, message: `Internal server error` })
  }
}

export const updateSurveyForm = async (req, res) => {
  try {
    const { household, surveyForm, questionsAndResponses } = await req.body
    await surveyFormModel.updateSurveyForm({ household, surveyForm, questionsAndResponses })
    return res.json({ success: true, message: "Survey form added successfully" })
  } catch (error) {
    return res.json({ success: false, message: `Internal server error: ${error}` })
  }
} 

export const getSurveyFormById = async (req, res) => {
  try {
    const surveyFormId = await req.params.id
    const surveyForm = await surveyFormModel.getSurveyFormById(surveyFormId) 
    return res.json({ success: true, data: surveyForm })
  } catch (error) {
    return res.json({ success: false, message: `Internal server error` })
  }
}