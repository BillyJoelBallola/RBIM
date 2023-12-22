import { Router } from "express";
import { addSurveyForm, getAllSurveyForms, getSurveyFormById, updateSurveyForm } from "../controllers/SurveyFormController.js";

const route = Router()

route.get('/survey_forms', getAllSurveyForms)
route.get('/survey_form/:id', getSurveyFormById)
route.post('/survey_form', addSurveyForm)
route.put('/survey_form', updateSurveyForm)

export default route