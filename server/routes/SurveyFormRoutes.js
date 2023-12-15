import { Router } from "express";
import { addSurveyForm } from "../controllers/SurveyFormController.js";

const route = Router()

route.post('/survey_form', addSurveyForm)

export default route