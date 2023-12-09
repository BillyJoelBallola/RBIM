import { Router } from "express"
import { getAllQuestions } from "../controllers/QuestionController.js"

const route = Router()

route.get("/questions", getAllQuestions)

export default route