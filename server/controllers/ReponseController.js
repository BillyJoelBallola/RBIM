import { responseModel } from "../models/ResponseModel.js";
import { HTTP_STATUS } from "../helper/httpStatus.js"

export const getAllResponseByQuestionId = async (req, res) => {
  try {
    const questionId = req.params.question_id
    const result = await responseModel.getResponseByQuestionId(questionId)    
    return res.json({ success: true, data: result})
  } catch (error) {
    return res.json({ success: false, message: "Internal server error"})
  }
}

export const addResponse = async (req, res) => {
  try {
    const { responseData, questionId } = await req.body; 
    const result = await responseModel.addResponse(responseData, questionId)
    return res.json({ success: true, data: result})
  } catch (error) {
    return res.json({ success: false, message: "Internal server error"})
  }
}

export const getAllResponse = async (req, res) => {
  try {
    const responses = await responseModel.getAllResponse()
    return res.json({ success: true, data: responses })
  } catch (error) {
    return res.json({ success: false, message: "Internal server error"})
  }
}