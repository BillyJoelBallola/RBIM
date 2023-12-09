import { Router } from "express";
import { addResponse, getAllResponseByQuestionId } from "../controllers/ReponseController.js";

const route = Router()

route.get("/response/:question_id", getAllResponseByQuestionId)
route.post("/response", addResponse)

export default route