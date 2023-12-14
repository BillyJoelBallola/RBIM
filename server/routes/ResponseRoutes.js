import { Router } from "express";
import { addResponse, getAllResponse, getAllResponseByQuestionId } from "../controllers/ReponseController.js";

const route = Router()

route.get("/response", getAllResponse)
route.get("/response/:question_id", getAllResponseByQuestionId)
route.post("/response", addResponse)

export default route