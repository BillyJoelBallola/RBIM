import React, { useEffect, useRef, useState } from 'react'
import SettingsHeader from './SettingsHeader'
import { Toast } from 'primereact/toast';
import CustomTable from './CustomTable'
import axios from 'axios'

import { LuTrash2 } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog'; 

const SurveyForm = ({ title, description }) => {
  const toast = useRef(null)
  const [questionData, setQuestionData] = useState([])
  const [responsesOfSelectedQuestions, setResponsesOfSelectedQuestions] = useState([])
  const [responseForm, setResponseForm] = useState({
    question_id: '',
    response_code: '',
    response_text: ''
  })
  const [selectedQuestion, setSelectedQuestion] = useState({
    id: '',
    code: '',
    text: ''
  })

  const headers = [{ key: "response_code", label: "Code" }, { key: "response_text", label: "Responses" }]
  
  const actions = [{ label: <MdOutlineEdit />, onClick: ({idx}) => editResponse(idx) }, { label: <LuTrash2 />, onClick: ({idx}) => deleteDialog(idx) }]

  const showToast = (severity, summary, detail) => {
    return toast.current.show({ severity: severity, summary: summary, detail: detail})
  }

  useEffect(() => {
    axios.get("/api/questions").then(({ data }) => {
      setQuestionData(data.data);
    }).catch((err) => {
      setQuestionData([]);
    })
  }, [])

  const resetResponseForm = () => {
    setResponseForm({
      question_id: '',
      response_code: '',
      response_text: ''
    })
  }
 
  const handleInputFormChange = (e) => {
    setResponseForm(current => ({
      ...current,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelectQuestion = (questionId) => {
    const selectedQuestion = questionData[questionId - 1];

    setSelectedQuestion(selectedQuestion ? {
      id: selectedQuestion.id,
      code: selectedQuestion.question_code,
      text: selectedQuestion.question_text
    } :{
      id: 0,
      code: "",
      text: ""
    })

    if(selectedQuestion){
      setSelectedQuestion({
        id: selectedQuestion.id,
        code: selectedQuestion.question_code,
        text: selectedQuestion.question_text
      })

      axios.get(`/api/response/${selectedQuestion.id}`)
        .then(({ data }) => {
          const transformedData = data.data ? data.data.map(({ id, ...rest }) => rest) : [];
          setResponsesOfSelectedQuestions(transformedData)
        })
    }else{
      setSelectedQuestion({
        id: 0,
        code: "",
        text: ""
      })
      setResponsesOfSelectedQuestions([])
    }
  }

  const handleSubmitResponse = (e) => {
    e.preventDefault()

    const existingCode = responsesOfSelectedQuestions.filter(value => value.response_code === responseForm.response_code)

    if(existingCode?.length > 0){
      resetResponseForm()
      return showToast('error', 'Failed', 'Existing response code, try other codes')
    }

    if(!selectedQuestion.id) return showToast('error', 'Failed', 'Question not found, select question first')

    if(responseForm.response_code !== '' && responseForm.response_text !== ''){
      setResponsesOfSelectedQuestions(current => ([
        ...current, {
          question_id: selectedQuestion.id,
          response_code: responseForm.response_code,
          response_text: responseForm.response_text
        }
      ]))
      resetResponseForm()
    }else{
      return showToast('error', 'Failed', 'Fill up all fields')
    }
  }

  const handleEditResponse = (e) => {
    e.preventDefault();
    const indexOfEditedResponse = responsesOfSelectedQuestions.findIndex(value => value.response_code === responseForm.response_code)
    const updatedReponses = [...responsesOfSelectedQuestions]
    updatedReponses[indexOfEditedResponse] = {
      question_id: responseForm.question_id,
      response_code: responseForm.response_code,
      response_text: responseForm.response_text
    }
    setResponsesOfSelectedQuestions(updatedReponses)
    resetResponseForm()
  }

  const editResponse = (idx) => {
    const selectedResponse = responsesOfSelectedQuestions[idx]
    setResponseForm({
      question_id: selectedResponse.question_id,
      response_code: selectedResponse.response_code,
      response_text: selectedResponse.response_text
    })
  }

  const saveChanges = async () => {
    try {
      const { data } = await axios.post("/api/response", { responseData: responsesOfSelectedQuestions, questionId: selectedQuestion.id })
      if(data.success){
        setSelectedQuestion({
          id: '',
          code: '',
          text: ''
        })
        setResponsesOfSelectedQuestions([])
        return showToast("success", "Success", "Response successfully updated")
      }else{
        return showToast("error", "Failed", "Failed to update response, please try again")
      }
    } catch (error) {
      return showToast("error", "Failed", "An unexpected error occurred. Please try again later")
    }
  }

  const handleRemoveResponse = (idx) => {
    const newResponse = [...responsesOfSelectedQuestions]
    newResponse.splice(idx, 1)
    setResponsesOfSelectedQuestions(newResponse)
    return showToast("success", "Success", "Response remove successfully")
  }

  const deleteDialog = (idx) => {
    confirmDialog({
        draggable: false,
        message: 'Are you sure you want to delete?',
        header: 'Confirmation',
        accept: () => handleRemoveResponse(idx)
    });
  };

  const saveDialog = () => {
    confirmDialog({
        draggable: false,
        message: 'Are you sure you want to save changes?',
        header: 'Save Changes',
        accept: () => saveChanges()
    });
  };

  const cancelEditResponse = () => {
    resetResponseForm()
  }

  return (
    <>
      <ConfirmDialog />
      <Toast ref={toast} />
      <SettingsHeader title={title} description={description} />
      <div className='grid gap-4 mb-8'>
        <div className="form-group">
          <label htmlFor="question">Question Code</label>
          <select name="" id="question" value={selectedQuestion.id} onChange={(e) => handleSelectQuestion(e.target.value)}>
            <option value="">-- select questions --</option>
            {
              questionData.map((question, idx) => (
                <option value={question.id} key={idx}>{question?.question_code}</option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="details">Question Detail</label>
          <div className='bg-gray-100 drop-shadow-md text-gray-600 border rounded-md p-4 grid gap-2' id='details'>
            {
              selectedQuestion.id ?
              <p><span className='font-semibold'>{selectedQuestion.code} :</span> {selectedQuestion.text}</p>
              :
              <p>No selected question</p>
            }
          </div>
        </div>
        <div>
          <form className='mb-4' onSubmit={responseForm.question_id === '' ? handleSubmitResponse : handleEditResponse}>
            <div className='grid md:flex md:flex-row items-center gap-4'>
              <div className='form-group basis-1/4'>
                <label htmlFor="response_code">Code</label>
                <input type="text" name='response_code' id='response_code' placeholder='Code' value={responseForm.response_code} onChange={handleInputFormChange}/>
              </div>
              <div className='form-group w-full'>
                <label htmlFor="response_text">Response</label>
                <input type="text" name='response_text' id='response_text' placeholder='Response' value={responseForm.response_text} onChange={handleInputFormChange}/>
              </div>
              <div className='flex gap-2 self-end'>
                <button type='submit' className='p-2 max-w-min bg-[#008605] text-white font-semibold rounded-md'>
                  <FaCheck /> 
                </button>
                {
                  responseForm.question_id !== '' && 
                  <button type='button' onClick={cancelEditResponse} className='p-2 max-w-min bg-[#008605] font-semibold rounded-md'>
                    <TiCancel className='text-white text-lg'/> 
                  </button>
                }
              </div>
            </div>
          </form>
          <CustomTable limit={5} headers={headers} actions={actions} data={responsesOfSelectedQuestions}/>
        </div>
        <button onClick={saveDialog} className='mt-4 w-min whitespace-nowrap rounded-md bg-[#008605] text-white text-sm py-2 px-6 font-semibold'>SAVE CHANGES</button>
      </div>
    </>
  )
}

export default SurveyForm