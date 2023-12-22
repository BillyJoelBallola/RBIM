import React, { useContext } from 'react'
import { SurveyFormContext } from '../../../context/SurveyFormContext';

import { FaArrowLeftLong } from "react-icons/fa6";
import CustomDropdown from '../CustomDropdown';

const Form6 = ({ navigate, questions }) => {
  const { questionsAndResponses, household, membersData, handleInputChange } = useContext(SurveyFormContext)
  const filteredQuestions = questions?.filter(question => (question.id >= 50 && question.id <= 64))
  const { household_id } = household

  return (
    <div className='py-4 grid gap-6'>
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        {/* 1st column */}
        <div className='grid gap-4 md:gap-8'>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[0]?.question_code} : {filteredQuestions[0]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q45']?.responses}
              selected={membersData[0].questionsAndAnswer[49]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  49, 
                  { 
                    id: member?.questionsAndAnswer[49]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q45', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[1]?.question_code} : {filteredQuestions[1]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q46']?.responses}
              selected={membersData[0].questionsAndAnswer[50]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  50, 
                  { 
                    id: member?.questionsAndAnswer[50]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q46', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[2]?.question_code} : {filteredQuestions[2]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q47']?.responses}
              selected={membersData[0].questionsAndAnswer[51]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  51, 
                  { 
                    id: member?.questionsAndAnswer[51]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q47', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[3]?.question_code} : {filteredQuestions[3]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q48']?.responses}
              selected={membersData[0].questionsAndAnswer[52]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  52, 
                  { 
                    id: member?.questionsAndAnswer[52]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q48', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[4]?.question_code} : {filteredQuestions[4]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q49']?.responses}
              selected={membersData[0].questionsAndAnswer[53]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  53, 
                  { 
                    id: member?.questionsAndAnswer[53]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q49', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[5]?.question_code} : {filteredQuestions[5]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q50A']?.responses}
              selected={membersData[0].questionsAndAnswer[54]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  54, 
                  { 
                    id: member?.questionsAndAnswer[54]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q50A', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[6]?.question_code} : {filteredQuestions[6]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q50B']?.responses}
              selected={membersData[0].questionsAndAnswer[55]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  55, 
                  { 
                    id: member?.questionsAndAnswer[55]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q50B', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[7]?.question_code} : {filteredQuestions[7]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q51']?.responses}
              selected={membersData[0].questionsAndAnswer[56]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  56, 
                  { 
                    id: member?.questionsAndAnswer[56]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q51', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[8]?.question_code} : {filteredQuestions[8]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q52']?.responses}
              selected={membersData[0].questionsAndAnswer[57]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  57, 
                  { 
                    id: member?.questionsAndAnswer[57]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q52', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
        </div>
        {/* 2nd column */}
        <div className='flex flex-col gap-4 md:gap-8'>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[9]?.question_code} : {filteredQuestions[9]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q53']?.responses}
              selected={membersData[0].questionsAndAnswer[58]?.response || null}
              onSelect={(value) => 
                handleInputChange(
                  58, 
                  { 
                    id: member?.questionsAndAnswer[58]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q53', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[10]?.question_code} : {filteredQuestions[10]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[59]?.response || ''}  
              onChange={(value) => 
                handleInputChange(
                  59, 
                  { 
                    id: member?.questionsAndAnswer[59]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q54', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[11]?.question_code} : {filteredQuestions[11]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[60]?.response || ''}  
              onChange={(value) => 
                handleInputChange(
                  60, 
                  { 
                    id: member?.questionsAndAnswer[60]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q55', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[12]?.question_code} : {filteredQuestions[12]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[61]?.response || ''}  
              onChange={(value) => 
                handleInputChange(
                  61, 
                  { 
                    id: member?.questionsAndAnswer[61]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q56', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[13]?.question_code} : {filteredQuestions[13]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[62]?.response || ''}  
              onChange={(value) => 
                handleInputChange(
                  62, 
                  { 
                    id: member?.questionsAndAnswer[62]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q57', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[14]?.question_code} : {filteredQuestions[14]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[63]?.response || ''}  
              onChange={(value) => 
                handleInputChange(
                  63, 
                  { 
                    id: member?.questionsAndAnswer[63]?.id,
                    household_id: household_id,
                    member_no: 1,
                    question: 'Q58', 
                    response: value
                  }, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
        </div>
      </div>

      <div className='flex justify-start mt-4'>
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form5')}>
          <FaArrowLeftLong />
          <span>Back</span>
        </button>
      </div>
    </div>
  )
}

export default Form6