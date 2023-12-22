import React, { useContext } from 'react'
import { SurveyFormContext } from '../../../context/SurveyFormContext';

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import CustomDropdown from '../CustomDropdown';

const questionHeader = [
  {
    code: 'Q1',
    description: 'SURNAME, FIRST NAME, MIDDLE NAME'
  },
  {
    code: 'Q2',
    description: 'RELATIONSHIP TO HHH'
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
    code: 'Q5',
    description: 'DATE OF BIRTH'
  },
  {
    code: 'Q6',
    description: 'PLACE OF BIRTH'
  },
  {
    code: 'Q7',
    description: 'NATIONALITY'
  },
  {
    code: 'Q8',
    description: 'MARITAL STATUS'
  },
  {
    code: 'Q9',
    description: 'RELIGION'
  },
  {
    code: 'Q10',
    description: 'ETHNICITY'
  },
  {
    code: 'Q11',
    description: 'HIGHEST LEVEL OF EDUCATION'
  },
  {
    code: 'Q12',
    description: 'CURRENTLY ENROLLED'
  },
  {
    code: 'Q13',
    description: 'SCHOOL LEVEL'
  },
  {
    code: 'Q14',
    description: 'PLACE OF SCHOOL'
  },
]

const Form2 = ({ navigate, questions }) => {
  const { questionsAndResponses, membersData, handleInputChange, household } = useContext(SurveyFormContext)
  const filteredQuestions = questions?.filter(question => (question.id <= 14))
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
                    <th scope="col" colSpan={14} className="border text-sm font-bold text-gray-900 py-4 text-center">
                      A. DEMOGRAPHIC CHARACTERISTICS
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" colSpan={10} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR ALL HOUSEHOLD MEMBERS
                    </th>
                    <th scope="col" className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 5 YEARS & ABOVE
                    </th>
                    <th scope="col" colSpan={3} className="border text-sm font-bold text-gray-900 p-2 text-center">
                      FOR 3-24 YEARS OLD
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
                      filteredQuestions?.map(question => (
                        <th scope="col" className="border text-xs font-medium text-gray-900 px-4 py-2 text-center" key={question.id}>
                          {question.question_text}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody className="bg-white text-sm">
                  {
                    membersData &&
                    membersData?.map((member, idx) => (
                      <tr className='border-b' key={idx}>
                        {
                          member.questionsAndAnswer.length > 0 &&
                          <>
                            <td className="p-2 whitespace-nowrap text-center border">{idx + 1}</td>
                            <td className='p-2'>
                              <input type="text" 
                                value={member?.questionsAndAnswer[0]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    0, 
                                    { 
                                      id: member?.questionsAndAnswer[0]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q1', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q2']?.responses}
                                selected={member?.questionsAndAnswer[1]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    1, 
                                    { 
                                      id: member?.questionsAndAnswer[1]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q2', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-32'}
                                options={questionsAndResponses['Q3']?.responses}
                                selected={member?.questionsAndAnswer[2]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    2, 
                                    { 
                                      id: member?.questionsAndAnswer[2]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q3', 
                                      response: value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)
                                }
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="number" 
                                className='w-full'
                                value={member?.questionsAndAnswer[3]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    3, 
                                    { 
                                      id: member?.questionsAndAnswer[3]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q4', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="date"
                                value={member?.questionsAndAnswer[4]?.response?.toString().slice(0, 10) ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    4, 
                                    { 
                                      id: member?.questionsAndAnswer[4]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q5', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}
                              />
                            </td>
                            <td className='p-2'>
                              <input type="text" 
                                value={member?.questionsAndAnswer[5]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    5, 
                                    { 
                                      id: member?.questionsAndAnswer[5]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q6', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q7']?.responses}
                                selected={member?.questionsAndAnswer[6]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    6, 
                                    { 
                                      id: member?.questionsAndAnswer[6]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q7', 
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
                                options={questionsAndResponses['Q8']?.responses}
                                selected={member?.questionsAndAnswer[7]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    7, 
                                    { 
                                      id: member?.questionsAndAnswer[7]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q8', 
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
                                value={member?.questionsAndAnswer[8]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    8, 
                                    { 
                                      id: member?.questionsAndAnswer[8]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q9', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <input 
                                type="text" 
                                value={member?.questionsAndAnswer[9]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    9, 
                                    { 
                                      id: member?.questionsAndAnswer[9]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q10', 
                                      response: e.target.value
                                    }, 
                                    member?.questionsAndAnswer, 
                                    member.setQuestionAndAnswer)}  
                              />
                            </td>
                            <td className='p-2'>
                              <CustomDropdown
                                width={'w-40'}
                                options={questionsAndResponses['Q11']?.responses}
                                selected={member?.questionsAndAnswer[10]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    10, 
                                    { 
                                      id: member?.questionsAndAnswer[10]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q11', 
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
                                options={questionsAndResponses['Q12']?.responses}
                                selected={member?.questionsAndAnswer[11]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    11, 
                                    { 
                                      id: member?.questionsAndAnswer[11]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q12', 
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
                                options={questionsAndResponses['Q13']?.responses}
                                selected={member?.questionsAndAnswer[12]?.response || null}
                                onSelect={(value) => 
                                  handleInputChange(
                                    12, 
                                    { 
                                      id: member?.questionsAndAnswer[12]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q13', 
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
                                value={member?.questionsAndAnswer[13]?.response ?? ''} 
                                onChange={(e) => 
                                  handleInputChange(
                                    13, 
                                    { 
                                      id: member?.questionsAndAnswer[13]?.id,
                                      household_id: household_id,
                                      member_no: idx + 1,
                                      question: 'Q14', 
                                      response: e.target.value
                                    }, 
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
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form1')}>
          <FaArrowLeftLong />
          <span>Back</span>
        </button>
        <button className='self-end px-6 py-2 bg-gray-600 rounded-md text-white flex gap-4 items-center' onClick={() => navigate('form3')}>
          <span>Next</span>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  )
}

export default Form2