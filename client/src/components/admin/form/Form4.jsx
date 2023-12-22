import React, { useContext } from 'react'
import { SurveyFormContext } from '../../../context/SurveyFormContext';

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import CustomDropdown from '../CustomDropdown';

const questionHeader = [
  {
    code: 'Q1',
    description: 'NAME'
  },
  {
    code: 'Q3',
    description: 'SEX'
  },
  {
    code: 'Q4',
    description: 'AGE'
  },
  {
    code: 'Q26',
    description: 'HEALTH INSURANCE'
  },
  {
    code: 'Q27',
    description: 'FACILITY VISITED IN PAST 12 MONTHS'
  },
  {
    code: 'Q28',
    description: 'REASON FOR VISIT HEALTH FACILITY'
  },
  {
    code: 'Q29',
    description: 'DISABILITY'
  },
  {
    code: 'Q30',
    description: 'SOLO PARENT'
  },
  {
    code: 'Q31',
    description: 'REGISTERED SENIOR CITIZEN'
  },
  {
    code: 'Q32',
    description: 'REGISTERED VOTER'
  },
  {
    code: 'Q33, Q34',
    description: 'PREVIOUS RESIDENCE'
  },
  {
    code: 'Q35',
    description: 'LENGTH OF STAY IN THE BARANGAY'
  },
  {
    code: 'Q36',
    description: 'TYPE OF RESIDENT'
  }
]

const Form4 = ({ navigate, questions }) => {
  const { membersData, questionsAndResponses, household, handleInputChange } = useContext(SurveyFormContext)
  const newQuestions = questions?.filter(question => (question.id >= 26 && question.id <= 36))
  const filteredQuestions = [[{ question_text: 'Copy from previous response' }, { question_text: '' }, { question_text: '' }], newQuestions].flat()
  const { household_id } = household

  return (
    <div className='py-4 grid gap-6'>
      <>
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="inline-block min-w-full">
            <div className="overflow-x-hidden drop-shadow-md rounded-lg border border-gray-300">
              <table className="min-w-full bg-gray-100 table-auto">
                <thead className="border-b">
                  <tr>
                    <th scope="col" rowSpan={4} className="border text-sm font-bold text-gray-900 px-2 text-center">
                      LINE LIST NO.
                    </th>
                    <th scope="col" colSpan={3} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      A. DEMOGRAPHIC CHARACTERISTICS
                    </th>
                    <th scope="col" colSpan={4} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      C. HEALTH INFORMATION
                    </th>
                    <th scope="col" colSpan={3} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      D. SOCIO-CIVIC PARTICIPATION
                    </th>
                    <th scope="col" colSpan={4} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      E. MIGRATION INFORMATION
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" colSpan={7} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR ALL HOUSEHOLD MEMBERS
                    </th>
                    <th scope="col" className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 10 ABOVE
                    </th>
                    <th scope="col" className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 60 ABOVE
                    </th>
                    <th scope="col" className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 15 ABOVE
                    </th>
                    <th scope="col" colSpan={4} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR ALL HOUSEHOLD MEMBERS
                    </th>
                  </tr>
                  <tr>
                    {
                      questionHeader.map((header, idx) => (
                        <th scope="col" colSpan={header.code.includes('33') ? 2 : 0} className="border text-sm font-bold text-gray-900 p-2 text-center" key={idx}>
                          {header.code}<br/>{header.description} 
                        </th>
                      ))
                    }
                  </tr>
                  <tr>
                    {
                      filteredQuestions?.map((question, idx) => (
                        <th scope="col" className="border text-xs font-medium text-gray-900 px-4 py-2 text-center" key={idx}>
                          {question.question_text}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className="bg-white text-sm">
                  {
                    membersData.length > 0 &&
                    membersData?.map((member, idx) => (
                      <tr className='border-b' key={idx}>
                        {
                          member.questionsAndAnswer.length > 0 &&
                          <>
                            <td className="p-2 whitespace-nowrap text-center border">{idx + 1}</td>
                            <td className='p-2'>
                              <input type="text" 
                                value={member?.questionsAndAnswer[0]?.response ?? ''} 
                                disabled
                              />
                            </td>
                            <td className='p-2'>
                              <select 
                                disabled
                                className='w-28'
                                value={member?.questionsAndAnswer[2]?.response ?? ''} 
                              >
                                <option value="">select</option>
                                {
                                  questionsAndResponses['Q3']?.responses.map((response, idx) => (
                                    <option value={response.responseCode} key={idx}>{response.responseCode} - {response.responseText}</option>
                                  ))
                                }
                              </select>
                            </td>
                            <td className='p-2'>
                              <input type="number" 
                                disabled
                                className='w-14'
                                value={member?.questionsAndAnswer[3]?.response ?? ''}
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q26']?.responses}
                                selected={member?.questionsAndAnswer[25]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    25, 
                                    { 
                                      id: member?.questionsAndAnswer[25]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q26', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q27']?.responses}
                                selected={member?.questionsAndAnswer[26]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    26, 
                                    { 
                                      id: member?.questionsAndAnswer[26]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q27', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q28']?.responses}
                                selected={member?.questionsAndAnswer[27]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    27, 
                                    { 
                                      id: member?.questionsAndAnswer[27]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q28', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q29']?.responses}
                                selected={member?.questionsAndAnswer[28]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    28, 
                                    { 
                                      id: member?.questionsAndAnswer[28]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q29', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q30']?.responses}
                                selected={member?.questionsAndAnswer[29]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    29, 
                                    { 
                                      id: member?.questionsAndAnswer[29]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q30', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q31']?.responses}
                                selected={member?.questionsAndAnswer[30]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    30, 
                                    { 
                                      id: member?.questionsAndAnswer[30]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q31', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                value={member?.questionsAndAnswer[31]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    31, 
                                    { 
                                      id: member?.questionsAndAnswer[31]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q32', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                value={member?.questionsAndAnswer[32]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    32, 
                                    { 
                                      id: member?.questionsAndAnswer[32]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q33', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                value={member?.questionsAndAnswer[33]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    33, 
                                    { 
                                      id: member?.questionsAndAnswer[33]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q34', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="number" 
                                className='w-full'
                                value={member?.questionsAndAnswer[34]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    34, 
                                    { 
                                      id: member?.questionsAndAnswer[34]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q35', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q36']?.responses}
                                selected={member?.questionsAndAnswer[35]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    35, 
                                    { 
                                      id: member?.questionsAndAnswer[35]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q36', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                          </>
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
      <div className='flex justify-between'>
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form3')}>
          <FaArrowLeftLong />
          <span>Back</span>
        </button>
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form5')}>
          <span>Next</span>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  )
}

export default Form4