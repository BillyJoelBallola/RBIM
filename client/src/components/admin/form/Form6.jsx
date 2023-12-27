import React, { useContext } from 'react'
import { SurveyFormContext } from '../../../context/SurveyFormContext';

import { FaArrowLeftLong } from "react-icons/fa6";
import CustomDropdown from '../CustomDropdown';

const Form6 = ({ navigate, questions }) => {
  const { questionsAndResponses, membersData, handleInputChange } = useContext(SurveyFormContext)
  const filteredQuestions = questions?.filter(question => (question.id >= 50 && question.id <= 64))
  
  return (
    <div className='py-4 grid gap-6'>
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        {/* 1st column */}
        <div className='grid gap-4 md:gap-8'>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[0]?.question_code} : {filteredQuestions[0]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q45']?.responses}
              selected={membersData[0].questionsAndAnswer[49] || null}
              onSelect={(value) => 
                handleInputChange(
                  49, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[1]?.question_code} : {filteredQuestions[1]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q46']?.responses}
              selected={membersData[0].questionsAndAnswer[50] || null}
              onSelect={(value) => 
                handleInputChange(
                  50, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[2]?.question_code} : {filteredQuestions[2]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q47']?.responses}
              selected={membersData[0].questionsAndAnswer[51] || null}
              onSelect={(value) => 
                handleInputChange(
                  51, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[3]?.question_code} : {filteredQuestions[3]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q48']?.responses}
              selected={membersData[0].questionsAndAnswer[52] || null}
              onSelect={(value) => 
                handleInputChange(
                  52, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[4]?.question_code} : {filteredQuestions[4]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q49']?.responses}
              selected={membersData[0].questionsAndAnswer[53] || null}
              onSelect={(value) => 
                handleInputChange(
                  53, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[5]?.question_code} : {filteredQuestions[5]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q50A']?.responses}
              selected={membersData[0].questionsAndAnswer[54] || null}
              onSelect={(value) => 
                handleInputChange(
                  54, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[6]?.question_code} : {filteredQuestions[6]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q50B']?.responses}
              selected={membersData[0].questionsAndAnswer[55] || null}
              onSelect={(value) => 
                handleInputChange(
                  55, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[7]?.question_code} : {filteredQuestions[7]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q51']?.responses}
              selected={membersData[0].questionsAndAnswer[56] || null}
              onSelect={(value) => 
                handleInputChange(
                  56, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[8]?.question_code} : {filteredQuestions[8]?.question_text}</label>
            <CustomDropdown 
              options={questionsAndResponses['Q52']?.responses}
              selected={membersData[0].questionsAndAnswer[57] || null}
              onSelect={(value) => 
                handleInputChange(
                  57, 
                  value, 
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
              selected={membersData[0].questionsAndAnswer[58] || null}
              onSelect={(value) => 
                handleInputChange(
                  58, 
                  value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[10]?.question_code} : {filteredQuestions[10]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[59] || ''}  
              onChange={(e) => 
                handleInputChange(
                  59, 
                  e.target.value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[11]?.question_code} : {filteredQuestions[11]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[60] || ''}  
              onChange={(e) => 
                handleInputChange(
                  60, 
                  e.target.value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[12]?.question_code} : {filteredQuestions[12]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[61] || ''}  
              onChange={(e) => 
                handleInputChange(
                  61, 
                  e.target.value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[13]?.question_code} : {filteredQuestions[13]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[62] || ''}  
              onChange={(e) => 
                handleInputChange(
                  62, 
                  e.target.value, 
                  membersData[0]?.questionsAndAnswer, 
                  membersData[0]?.setQuestionAndAnswer)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className='font-semibold'>{filteredQuestions[14]?.question_code} : {filteredQuestions[14]?.question_text}</label>
            <input 
              type="text" 
              value={membersData[0].questionsAndAnswer[63] || ''}  
              onChange={(e) => 
                handleInputChange(
                  63, 
                  e.target.value, 
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