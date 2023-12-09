import { responseModel } from "../models/ResponseModel.js";
import { HTTP_STATUS } from "../helper/httpStatus.js"

export const getAllResponseByQuestionId = async (req, res) => {
  try {
    const questionId = req.params.question_id
    const result = await responseModel.getResponseByQuestionId(questionId)    
    return res.status(HTTP_STATUS.OK).json(result)
  } catch (error) {
    return res.json('Internal Server Error')
  }
}

export const addResponse = async (req, res) => {
  try {
    const { responseData, questionId } = await req.body; 
    const result = await responseModel.addResponse(responseData, questionId)
    return res.status(HTTP_STATUS.OK).json(result)
  } catch (error) {
    return res.json('Internal Server Error')
  }
}