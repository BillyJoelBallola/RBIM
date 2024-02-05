import { Router } from "express";
import { addSurveyForm, getAllIndividual, getAllSurveyForms, getSurveyFormById, removeIndividualImage, updateIndividualImage, updateSurveyForm } from "../controllers/SurveyFormController.js";

const route = Router()

route.get('/survey_forms', getAllSurveyForms)
route.get('/individuals', getAllIndividual)
route.get('/survey_form/:id', getSurveyFormById)
route.post('/survey_form', addSurveyForm)
route.put('/survey_form', updateSurveyForm)
route.put('/individual_image', updateIndividualImage)
route.put('/individual_remove_image', removeIndividualImage)

export default route