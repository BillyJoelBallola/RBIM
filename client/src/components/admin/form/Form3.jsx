import React, { useContext } from 'react'

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { SurveyFormContext } from '../../../context/SurveyFormContext';
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
    code: 'Q15',
    description: 'MONTHLY INCOME'
  },
  {
    code: 'Q16',
    description: 'SOURCE OF INCOME'
  },
  {
    code: 'Q17',
    description: 'STATUS OF WORK/BUSINESS'
  },
  {
    code: 'Q18',
    description: 'PLACE OF WORK/BUSINESS'
  },
  {
    code: 'Q19',
    description: 'PLACE OF DELIVERY'
  },
  {
    code: 'Q20',
    description: 'BIRTH ATTENDANT'
  },
  {
    code: 'Q21',
    description: 'IMMUZATION'
  },
  {
    code: 'Q22',
    description: 'LIVING CHILDREN'
  },
  {
    code: 'Q23',
    description: 'FAMILY PLANING (FP) USE'
  },
  {
    code: 'Q24',
    description: 'SOURCE OF FP METHOD'
  },
  {
    code: 'Q25',
    description: 'INTENTION TO USE FP'
  }
]

const Form3 = ({ navigate, questions}) => {
  const { membersData, questionsAndResponses, handleInputChange } = useContext(SurveyFormContext)
  const newQuestions = questions?.filter(question => (question.id >= 15 && question.id <= 25))
  const filteredQuestions = [[{ question_text: 'Copy from previous response' }, { question_text: '' }, { question_text: '' }], newQuestions].flat()

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
                      B. ECONOMIC ACTIVITY
                    </th>
                    <th scope="col" colSpan={7} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      C. HEALTH INFORMATION
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" colSpan={3} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR ALL HOUSEHOLD MEMBERS
                    </th>
                    <th scope="col" colSpan={4} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 15 YEARS OLD & ABOVE
                    </th>
                    <th scope="col" colSpan={3} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 0 TO 11 MONTHS OLD
                    </th>
                    <th scope="col" colSpan={4} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR WOMEN 10 TO 54 YEARS
                    </th>
                  </tr>
                  <tr>
                    {
                      questionHeader.map((header, idx) => (
                        <th scope="col" className="border text-sm font-bold text-gray-900 p-2 text-center" key={idx}>
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
                                value={member?.questionsAndAnswer[0] || ''} 
                                disabled
                              />
                            </td>
                            <td className='p-2'>
                              <select 
                                disabled
                                className='w-28'
                                value={member?.questionsAndAnswer[2] || ''} 
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
                                value={member?.questionsAndAnswer[3] || ''}
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                className='w-full'
                                value={member?.questionsAndAnswer[14] || ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    14, 
                                    e.target.value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q16']?.responses}
                                selected={member?.questionsAndAnswer[15] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    15, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q17']?.responses}
                                selected={member?.questionsAndAnswer[16] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    16, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                className='w-full'
                                value={member?.questionsAndAnswer[17] || ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    17, 
                                    e.target.value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q19']?.responses}
                                selected={member?.questionsAndAnswer[18] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    18, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q20']?.responses}
                                selected={member?.questionsAndAnswer[19] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    19, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                value={member?.questionsAndAnswer[20] || ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    20, 
                                    e.target.value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                value={member?.questionsAndAnswer[21] || ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    21, 
                                    e.target.value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q23']?.responses}
                                selected={member?.questionsAndAnswer[22] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    22, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q24']?.responses}
                                selected={member?.questionsAndAnswer[23] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    23, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                className='w-40'
                                type="text" 
                                value={member?.questionsAndAnswer[24] || ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    24, 
                                    e.target.value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)} 
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
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form2')}>
          <FaArrowLeftLong />
          <span>Back</span>
        </button>
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form4')}>
          <span>Next</span>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  )
}

export default Form3