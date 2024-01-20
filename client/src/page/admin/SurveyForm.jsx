import React, { useContext, useEffect, useRef, useState } from 'react'
import { SurveyFormContext } from '../../context/SurveyFormContext'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import { Toast } from 'primereact/toast'
import Header from '../../components/admin/Header'
import CustomDialog from '../../components/admin/CustomDialog'
import Form1 from '../../components/admin/form/Form1'
import Form2 from '../../components/admin/form/Form2'
import Form3 from '../../components/admin/form/Form3'
import Form4 from '../../components/admin/form/Form4'
import Form5 from '../../components/admin/form/Form5'
import Form6 from '../../components/admin/form/form6'
import PrintableForm from '../../components/admin/PrintableForm'
import { NavigationContext } from '../../context/NavigationContext'

const SurveyForm = () => {
  const toast = useRef(null)
  const formId = useParams().id ? useParams().id  : ''
  const activeForm = useParams().form
  const navigate = useNavigate()
  const pathname = useLocation().pathname.slice(0, 17)
  const { setSurveyForm, setHousehold, membersData, getQuestionsAndResponsesOfMember, questionsAndResponsesArray, household, surveyForm } = useContext(SurveyFormContext)
  const { setIsNavigateOpen } = useContext(NavigationContext)
  const [questions, setQuestions] = useState([])
  const [visible, setVisible] = useState(false)
  const [update, setUpdate] = useState(null)
  const [address, setAddress] = useState(null)
  const [preview, setPreview] = useState(false)

  const alertMessage = (severity, summary, detail) => {
    return toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  const navigateRoutes = (form) => {
    navigate(`${pathname}/${form}/${formId}`)
  }

  useEffect(() => {
    const fetchAllQuestions = async () => {
      const { data } = await axios.get("/api/questions") 
      setQuestions(data.data)
    }

    const fetchAddress = async () => {
      const { data } = await axios.get("/api/address") 
      setAddress(data.data)
    }
    
    fetchAddress()
    fetchAllQuestions()
  }, [])
  
  useEffect(() => {
    const fetchSurveyFormById = async (formId) => {
      const { data } = await axios.get(`/api/survey_form/${formId}`) 
      if(data.success){
        const response = await data.data;
        setSurveyForm({
          survey_form_id: formId,
          first_visit_date: response[0].first_visit_date,
          first_visit_time_start: response[0].first_visit_time_start,
          first_visit_time_end: response[0].first_visit_time_end,
          first_visit_result: response[0].first_visit_result,
          first_visit_date_next_visit: response[0].first_visit_date_next_visit,
          first_visit_interviewer: response[0].first_visit_interviewer,
          first_visit_supervisor: response[0].first_visit_supervisor,
          second_visit_date: response[0].second_visit_date,
          second_visit_time_start: response[0].second_visit_time_start,
          second_visit_time_end: response[0].second_visit_time_end,
          second_visit_result: response[0].second_visit_result,
          second_visit_date_next_visit: response[0].second_visit_date_next_visit,
          second_visit_interviewer: response[0].second_visit_interviewer,
          second_visit_supervisor: response[0].second_visit_supervisor,
          date_encoded: response[0].date_encoded,
          encoder_name: response[0].encoder_name,
          supervisor_name: response[0].supervisor_name,
        })
        setHousehold({
          household_id: response[0].household_id,
          household_number: response[0].household_number,
          living_type: response[0].living_type,
          respondent_name: response[0].respondent_name,
          household_head: response[0].household_head,
          household_member_no: response[0].household_member_no,
          address: response[0].address,
          unit_no: response[0].unit_no,
          house_no: response[0].house_no,
          street: response[0].street,
          phone_no: response[0].phone_no || '',
        })
        for(let i = 0; i < membersData.length; i++){
          membersData[i]?.setQuestionAndAnswer(getQuestionsAndResponsesOfMember(response, i + 1))
        }
      }
    }

    if(formId || update !== null){  
      fetchSurveyFormById(formId)
      setUpdate(null)
    }
  }, [formId, update])

  const saveChanges = async () => {
    try {
      // const filledArrayResponses = questionsAndResponsesArray.filter(array => array.length > 0)

      // if (Object.values(household)?.some(answer => answer === '')) {
      //   return alertMessage('error', 'Failed', "Household Information: Submission failed, don't leave empty fields.")
      // }else if (Object.keys(surveyForm).filter((response, idx) => idx >= 0 && idx <= 6).some(response => response === '')) {
      //   return alertMessage('error', 'Failed', "Surveform Information: Submission failed, don't leave empty fields.")
      // }else if (filledArrayResponses.length > 0){
      //   if(filledArrayResponses[0].some(response => response === '' || filledArrayResponses[0].length < 50)){
      //     return alertMessage('error', 'Failed', "Household Questions: Submission failed, don't leave empty fields.")
      //   }
  
      //   for(let i = 1; i <= 10; i++){
      //     if(filledArrayResponses[i]?.length > 0){
      //       if(filledArrayResponses[i].some(response => response === '')){
      //         return alertMessage('error', 'Failed', "Household Members: Submission failed, don't leave empty fields.")
      //       }
      //     }
      //   }
      // }

      const { data } = await axios.put('/api/survey_form', { questionsAndResponses: questionsAndResponsesArray, household, surveyForm }) 
      if(data.success){
        setUpdate('updated')
        return alertMessage(
          'success',
          'Success',
          'Survey form updated successfully',
        );
      }else{
        return alertMessage(
          'success',
          'Success',
          'Failed to update survey form, please try again later.',
        );
      }
    } catch (error) {
      return alertMessage(
        'success',
        'Success',
        'An unexpected error occurred. Please try again later.',
      );
    }finally {
      setVisible(false)
    }
  }

  const footerContent = (
    <div className='flex justify-end'>
      <button className='px-6 py-2 rounded-md bg-transparent' onClick={() => setVisible(false)}>No</button>
      <button 
        className='px-6 py-2 rounded-md bg-[#008605] text-white' 
        onClick={() => saveChanges()}
      >
        Yes
      </button>
    </div>
  );

  return (
    <>
      <Toast ref={toast}/>
      <CustomDialog
        header={'Save Changes'}
        visible={visible}
        setVisible={setVisible} 
        footer={footerContent}
        classStyle={'w-[90%] md:w-[60%] lg:w-[40%]'}
        content={(
          <p>
            Are you sure you want to save the changes?
          </p>
        )}
      />
      <PrintableForm 
        address={address}
        preview={preview}
        setPreview={setPreview}
      />
      <div className='overflow-y-auto'>
        <Header pageName={"Survey Form"} />
        <div className='content'>
          <div className='pt-4 pb-3 flex gap-2'>
            <button className='bg-gray-600 text-white py-2 px-4 rounded-md' onClick={() => navigate('/rbim/citizen-information')}>Cancel</button>
            <button 
              className='bg-gray-500 text-white py-2 px-4 rounded-md' 
              onClick={() => {
                setPreview(true)
                setIsNavigateOpen(true)
              }}>Download</button>
            <button className='bg-[#008605] text-white py-2 px-4 rounded-md' onClick={() => setVisible(true)}>Save Changes</button>
          </div>
          {
            activeForm === 'form1' ?
            <Form1 navigate={navigateRoutes} /> :
            activeForm === 'form2' ?
            <Form2 navigate={navigateRoutes} questions={questions} /> :
            activeForm === 'form3' ?
            <Form3 navigate={navigateRoutes} questions={questions} /> :
            activeForm === 'form4' ?
            <Form4 navigate={navigateRoutes} questions={questions} /> :
            activeForm === 'form5' ?
            <Form5 navigate={navigateRoutes} questions={questions} /> :
            activeForm === 'form6' ?
            <Form6 navigate={navigateRoutes} questions={questions} /> :
            <></>
          }
        </div>
      </div>
    </>
  )
}

export default SurveyForm