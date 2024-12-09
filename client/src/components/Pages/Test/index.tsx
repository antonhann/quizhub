import { useLocation, useParams } from "react-router";
import { StudyCard } from "../../../models/StudyCard";
import { useState } from "react";
import TestCreation from "./TestCreation";
import Test from "./Test";
import Popup from "../../reusables/dashboard/Popup";
export interface QuestionDistribution {
  trueFalse: number,
  multipleChoice: number,
};

export const DEFAULT_QD = {
  trueFalse: 0,
  multipleChoice: 0,
}
const TestDisplay = () => {
  const params = useParams();
  const location = useLocation();
  // const navigate = useNavigate();
  const terms : StudyCard[] = location.state.originalStudySet.terms
  const [questionDistribution, setQuestionDistribution] = useState<QuestionDistribution | null>(null);
  const [createdTest, setCreatedTest] = useState<boolean>(false)
  const handleFormSubmit = (newQD : QuestionDistribution) => {
    setQuestionDistribution(newQD); // Update question distribution
    setCreatedTest(true)
  };
  if(!createdTest){
    return(
      <TestCreation
          length={terms.length}
          handleFormSubmit={handleFormSubmit}
      />
    )
  }
  return (
    <>
      {
      questionDistribution && 
      <Test
      questionDistribution={questionDistribution}
       terms = {terms}
      />
      }
    </>
      
  )
}

export default TestDisplay
