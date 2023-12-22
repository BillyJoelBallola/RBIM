import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SurveyFormContext = createContext({})

export const SurveyFormContextProvider = ({ children }) => {
  const [questionsAndResponses, setQuestionsAndResponses] = useState([])
  const [questionsAndAnswerMember1, setQuestionAndAnswerMember1] = useState([])
  const [questionsAndAnswerMember2, setQuestionAndAnswerMember2] = useState([])
  const [questionsAndAnswerMember3, setQuestionAndAnswerMember3] = useState([])
  const [questionsAndAnswerMember4, setQuestionAndAnswerMember4] = useState([])
  const [questionsAndAnswerMember5, setQuestionAndAnswerMember5] = useState([])
  const [questionsAndAnswerMember6, setQuestionAndAnswerMember6] = useState([])
  const [questionsAndAnswerMember7, setQuestionAndAnswerMember7] = useState([])
  const [questionsAndAnswerMember8, setQuestionAndAnswerMember8] = useState([])
  const [questionsAndAnswerMember9, setQuestionAndAnswerMember9] = useState([])
  const [questionsAndAnswerMember10, setQuestionAndAnswerMember10] = useState([])
  const [surveyForm, setSurveyForm] = useState({
    survey_form_id: '',
    first_visit_date: '',
    first_visit_time_start: '',
    first_visit_time_end: '',
    first_visit_result: '',
    first_visit_date_next_visit: '',
    first_visit_interviewer: '',
    first_visit_supervisor: '',
    second_visit_date: '',
    second_visit_time_start: '',
    second_visit_time_end: '',
    second_visit_result: '',
    second_visit_date_next_visit: '',
    second_visit_interviewer: '',
    second_visit_supervisor: '',
    date_encoded: '',
    encoder_name: '',
    supervisor_name: '',
  })
  const [household, setHousehold] = useState({
    household_id: '',
    household_number: '',
    living_type: 'household',
    respondent_name: '',
    household_head: '',
    household_member_no: '',
    address: '',
    unit_no: '',
    house_no: '',
    street: '',
  })

  const membersData = [
    { questionsAndAnswer: questionsAndAnswerMember1, setQuestionAndAnswer: setQuestionAndAnswerMember1 },
    { questionsAndAnswer: questionsAndAnswerMember2, setQuestionAndAnswer: setQuestionAndAnswerMember2 },
    { questionsAndAnswer: questionsAndAnswerMember3, setQuestionAndAnswer: setQuestionAndAnswerMember3 },
    { questionsAndAnswer: questionsAndAnswerMember4, setQuestionAndAnswer: setQuestionAndAnswerMember4 },
    { questionsAndAnswer: questionsAndAnswerMember5, setQuestionAndAnswer: setQuestionAndAnswerMember5 },
    { questionsAndAnswer: questionsAndAnswerMember6, setQuestionAndAnswer: setQuestionAndAnswerMember6 },
    { questionsAndAnswer: questionsAndAnswerMember7, setQuestionAndAnswer: setQuestionAndAnswerMember7 },
    { questionsAndAnswer: questionsAndAnswerMember8, setQuestionAndAnswer: setQuestionAndAnswerMember8 },
    { questionsAndAnswer: questionsAndAnswerMember9, setQuestionAndAnswer: setQuestionAndAnswerMember9 },
    { questionsAndAnswer: questionsAndAnswerMember10, setQuestionAndAnswer: setQuestionAndAnswerMember10 },
  ];

  const handleInputChange = (index, value, array, onChange) => {
    const newArray = [...array]

    if (!newArray[index]) {
      newArray[index] = {}; 
    }

    newArray[index] = value;

    onChange(newArray);
  } 

  const handleInputUpdateChange = (idx, updatedItem, dataArray, setArray) => {
    const updatedArray = [...dataArray];
    updatedArray[idx] = updatedItem;
    setArray(updatedArray);
  };

  const handleInputChangeForSurveyForm = (e) => {
    setSurveyForm(current => ({
      ...current,
      [e.target.name]: e.target.value
    }))
  }

  const handleInputChangeForHousehold = (e) => {
    setHousehold(current => ({
      ...current,
      [e.target.name]: e.target.value
    }))
  }

  const getQuestionsAndResponsesOfMember = (response, memberNo) => {
    const result = []

    if(response.length > 0){
      response.forEach(item => {
        if(item.member_no === memberNo){
          const { id, household_id, member_no, question, response } = item
          result.push({ id, household_id, member_no, question, response })
        }
      })
    }
    
    return result
  }

  const questionsAndResponsesArray = [
    questionsAndAnswerMember1,
    questionsAndAnswerMember2,
    questionsAndAnswerMember3,
    questionsAndAnswerMember4,
    questionsAndAnswerMember5,
    questionsAndAnswerMember6,
    questionsAndAnswerMember7,
    questionsAndAnswerMember8,
    questionsAndAnswerMember9,
    questionsAndAnswerMember10
  ]

  useEffect(() => {
    const fetchAllResponses = async () => {
      const { data } = await axios.get("/api/response")
      if(data.success){
        const questionsData = await data.data
        const formattedData = {};

        questionsData.forEach(item => {
          const questionCode = item.question_code;
          const questionText = item.question_text;
          const responseCode = item.response_code;
          const responseText = item.response_text;

          if (!formattedData[questionCode]) {
            formattedData[questionCode] = {
              questionCode,
              questionText,
              responses: [],
            };
          }

          formattedData[questionCode].responses.push({
            responseCode,
            responseText,
          });

        }); 

        setQuestionsAndResponses(formattedData);
      }
    }

    fetchAllResponses()
  }, [])

  return (
    <SurveyFormContext.Provider
      value={{  
        membersData,
        surveyForm,
        household,
        setSurveyForm,
        setHousehold,
        questionsAndResponsesArray,
        handleInputChange,
        handleInputUpdateChange,
        getQuestionsAndResponsesOfMember,
        handleInputChangeForSurveyForm,
        handleInputChangeForHousehold,
        questionsAndResponses
      }}
    >
      {children}
    </SurveyFormContext.Provider>
  )
}