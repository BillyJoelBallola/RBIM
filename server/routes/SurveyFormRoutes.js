import { Router } from "express";
import { addIndividualImage, addSurveyForm, getAllIndividual, getAllSurveyForms, getSurveyFormById, updateSurveyForm } from "../controllers/SurveyFormController.js";

const route = Router()

route.get('/survey_forms', getAllSurveyForms)
route.get('/individuals', getAllIndividual)
route.get('/survey_form/:id', getSurveyFormById)
route.post('/survey_form', addSurveyForm)
route.put('/survey_form', updateSurveyForm)
route.put('/individual_image', addIndividualImage)

export default route