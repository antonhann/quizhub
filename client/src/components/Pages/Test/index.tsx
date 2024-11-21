import { useLocation, useParams } from "react-router";
import { StudyCard } from "../../../models/StudyCard";
import { useState } from "react";
import TestCreation from "./TestCreation";
import Test from "./Test";
import Popup from "../../reusables/dashboard/Popup";
export interface QuestionDistribution {
  trueFalse: number,
  multipleChoice: number,
  written: number
};

export const DEFAULT_QD = {
  trueFalse: 0,
  multipleChoice: 0,
  written: 0,
}
const TestDisplay = () => {
  const params = useParams();
  const location = useLocation();
  // const navigate = useNavigate();
  const terms : StudyCard[] = location.state.originalStudySet.terms
  const [showPopup, setShowPopup] = useState<boolean>(true)
  const [questionDistribution, setQuestionDistribution] = useState<QuestionDistribution | null>(null);
  const handleFormSubmit = (newQD : QuestionDistribution) => {
    setQuestionDistribution(newQD); // Update question distribution
    setShowPopup(false); // Close the popup
  };
  return (
    <>
      <Popup
              title = "Test Creation"
              className="flashcardOptionsPopup"
              showPopup = {showPopup}
              setShowPopup={setShowPopup}
      >
        <TestCreation
          length={terms.length}
          setShowPopup={setShowPopup}
          handleFormSubmit={handleFormSubmit}
        />
      </Popup>
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
