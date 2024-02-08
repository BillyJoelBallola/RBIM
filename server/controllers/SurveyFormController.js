import fs from 'fs'
import { surveyFormModel } from '../models/SurveyFormModel.js'

export const getAllSurveyForms = async (req, res) => {
  try {
    const surveyForms = await surveyFormModel.getAllSurvey() 
    return res.json({ success: true, data: surveyForms })
  } catch (error) {
    return res.json({ success: false, message: `Internal server error` })
  }
}

export const getAllIndividual = async (req, res) => {
  try {
    const individualRecords = await surveyFormModel.getAllIndividual() 
    return res.json({ success: true, data: individualRecords })
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

export const updateIndividualImage = async (req, res) => {
  try {
    const individualData = await req.body
    await surveyFormModel.updateIndividualImage(individualData)
    return res.json({ success: true, message: 'Uploaded successfully' })
  } catch (error) {
    return res.json({ success: false, message: `Internal server error` })
  }
}

export const removeIndividualImage = async (req, res) => {
  try {
      const individual = await req.body
      const { image } = individual
      const newIndividualData = { ...individual, image: '' }
      individual?.id && await surveyFormModel.updateIndividualImage(newIndividualData);
      fs.unlink(`uploads/${image?.slice(1, -1) + image?.slice(-1)}`, (err) => {
        if (err) throw err
          return res.json({ success: true, message: 'Image removed successfully' });
      })
  } catch (error) {
      return res.json({ success: false, message: 'Internal Server Error'});
  }
}

export const updateSurveyFormStatus = async (req, res) => {
  try {
      const surveyForm = await req.body
      const { status, id } = surveyForm
      await surveyFormModel.updateSurveyFormStatus(status, id);
      return res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
      return res.json({ success: false, message: 'Internal Server Error'});
  }
}