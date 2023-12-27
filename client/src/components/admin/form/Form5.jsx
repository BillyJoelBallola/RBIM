import React, { useContext } from 'react'
import { SurveyFormContext } from '../../../context/SurveyFormContext'

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
    code: 'Q37',
    description: 'DATE OF TRANSFER'
  },
  {
    code: 'Q38A, Q38B, Q38C',
    description: 'REASON/S FOR LEAVING THE PREVIOUS RESIDENCE'
  },
  {
    code: 'Q39',
    description: 'RETURN TO PREVIOUS RESIDENCE'
  },
  {
    code: 'Q40A, Q40B, Q40C',
    description: 'DISABILITY'
  },
  {
    code: 'Q41',
    description: 'DURATION OF STAY IN CURRENT BARANGAY'
  },
  {
    code: 'Q42A, Q42B',
    description: 'CTC INFORMATION'
  },
  {
    code: 'Q43',
    description: 'SKILLS DEVELOPMENT TRAINING'
  },
  {
    code: 'Q44',
    description: 'SKILLS'
  }
]

const Form5 = ({ navigate, questions }) => {
  const { membersData, questionsAndResponses, handleInputChange } = useContext(SurveyFormContext)
  const newQuestions = questions?.filter(question => (question.id >= 37 && question.id <= 49))
  const mergedArray = newQuestions.reduce((acc, currentItem) => {
    const existingItem = acc.find(item => item.question_text === currentItem.question_text);
    
    if (existingItem) {
      Object.assign(existingItem, currentItem);
    } else {
      acc.push(currentItem);
    }
    
    return acc;
  }, []);
  const filteredQuestions = [[{ question_text: 'Copy from previous response' }, { question_text: '' }, { question_text: '' }], mergedArray].flat()

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
                    <th scope="col" colSpan={9} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      E. MIGRATION INFORMATION
                    </th>
                    <th scope="col" colSpan={2} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      F. COMMUNITY TAX CERTIFICATE
                    </th>
                    <th scope="col" colSpan={2} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      G. SKILLS DEVELOPMENT
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" colSpan={3} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR ALL HOUSEHOLD MEMBERS
                    </th>
                    <th scope="col" colSpan={9} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR MIGRANTS AND TRANSIENTS
                    </th>
                    <th scope="col" colSpan={2} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 18 ABOVE
                    </th>
                    <th scope="col" colSpan={2} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 15 ABOVE
                    </th>
                  </tr>
                  <tr>
                    {
                      questionHeader.map((header, idx) => (
                        <th scope="col" colSpan={header.code.includes('38') || header.code.includes('40') ? 3 : header.code.includes('42') ? 2 : 0} className="border text-sm font-bold text-gray-900 p-2 text-center" key={idx}>
                          {header.code}<br/>{header.description} 
                        </th>
                      ))
                    }
                  </tr>
                  <tr>
                    {
                      filteredQuestions?.map((question, idx) => (
                        <th scope="col" colSpan={question?.question_code?.includes('38') || question?.question_code?.includes('40') ? 3 : 0} className="border text-xs font-medium text-gray-900 px-4 py-2 text-center" key={idx}>
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
                                type="date" 
                                value={member?.questionsAndAnswer[36]?.toString().slice(0, 10) || ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    36, 
                                    e.target.value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q38A']?.responses}
                                selected={member?.questionsAndAnswer[37] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    37, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q38B']?.responses}
                                selected={member?.questionsAndAnswer[38] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    38, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q38B']?.responses}
                                selected={member?.questionsAndAnswer[39] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    39, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-30'}
                                options={questionsAndResponses['Q39']?.responses}
                                selected={member?.questionsAndAnswer[40] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    40, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-36'}
                                options={questionsAndResponses['Q40A']?.responses}
                                selected={member?.questionsAndAnswer[41] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    41, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q40B']?.responses}
                                selected={member?.questionsAndAnswer[42] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    42, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q40C']?.responses}
                                selected={member?.questionsAndAnswer[43] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    43, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                value={member?.questionsAndAnswer[44] || ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    44, 
                                    e.target.value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q42A']?.responses}
                                selected={member?.questionsAndAnswer[45] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    45, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q42B']?.responses}
                                selected={member?.questionsAndAnswer[46] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    46, 
                                    value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                value={member?.questionsAndAnswer[47] || ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    47, 
                                    e.target.value, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q44']?.responses}
                                selected={member?.questionsAndAnswer[48] || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    48, 
                                    value, 
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
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form4')}>
          <FaArrowLeftLong />
          <span>Back</span>
        </button>
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form6')}>
          <span>Next</span>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  )
}

export default Form5