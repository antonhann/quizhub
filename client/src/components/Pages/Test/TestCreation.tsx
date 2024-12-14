import React, { useState } from "react";
import { ToggleButton } from "../../reusables/tools/ToggleButton";
import { QuestionDistribution } from ".";

interface TestCreationProps {
  length: number;
  handleFormSubmit: (_ : QuestionDistribution) => void;
}

const TestCreation: React.FC<TestCreationProps> = ({ 
  length, 
  handleFormSubmit
 }) => {
  const [totalQuestions, setTotalQuestions] = useState<number>(Math.round(length / 2));
  // const [answerWithTerms, setAnswerWithTerms] = useState<boolean>(true);
  const [trueFalse, setTrueFalse] = useState<boolean>(true); // True/False questions toggle
  const [multipleChoice, setMultipleChoice] = useState<boolean>(false); // Multiple Choice questions toggle

  const handleTotalQuestionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    // Check if the value is a number and it's within the acceptable range
    if (!isNaN(value) && value >= 0 && value <= length) {
      setTotalQuestions(value);
    } else {
      // Optionally handle the case where the value is invalid (e.g., show an error message)
    }
  };

  // Toggle functions for each type of question
  const toggleTrueFalse = () => setTrueFalse(!trueFalse);
  const toggleMultipleChoice = () => setMultipleChoice(!multipleChoice);
  // const handleAnswerWithChange = (answerWith: boolean) => {
  //   setAnswerWithTerms(answerWith);
  // };

  // Handle the "Create Test" button logic
  const handleCreateTest = () => {
    let activeButtons = 0
    if (trueFalse) activeButtons++;
    if (multipleChoice) activeButtons++;
    if (activeButtons === 0) {
        alert("Please select at least one question type");
        return; // Prevent further action if no type is selected
    }
    let questionsPerType = Math.floor(totalQuestions / activeButtons); // Equal distribution
    let remainder = totalQuestions % activeButtons;
    const questionDistribution = {
        trueFalse: trueFalse ? questionsPerType : 0,
        multipleChoice: multipleChoice ? questionsPerType : 0,
    };
    if (remainder > 0) {
        if (trueFalse) questionDistribution.trueFalse++;
        else if (multipleChoice) questionDistribution.multipleChoice++;
    }
    handleFormSubmit(questionDistribution)
  };

  return (
    <div className="yes-center d-flex flex-column">
        <h2>Create a New Test</h2>
        <div className="d-flex flex-column gap-3">
            <div>
            <label htmlFor="totalQuestions">Total Number of Questions:</label>
            <input
                type="text"
                id="totalQuestions"
                value={totalQuestions}
                onChange={handleTotalQuestionsChange}
                min={0}
                placeholder="Enter total number of questions"
            />
            </div>
            <div>
            {/* <label>Answer With:</label>
            <div>
                <input
                type="radio"
                id="terms"
                name="answerWith"
                checked={answerWithTerms}
                onChange={() => handleAnswerWithChange(true)}
                />
                <label htmlFor="terms">Terms</label>
                <input
                type="radio"
                id="answers"
                name="answerWith"
                checked={!answerWithTerms}
                onChange={() => handleAnswerWithChange(false)}
                />
                <label htmlFor="answers">Answers</label>
            </div> */}
            </div>
            <ToggleButton
                toggleFunction={toggleTrueFalse}
                label="True/False Questions?"
                check={trueFalse}
            />
            <ToggleButton
                toggleFunction={toggleMultipleChoice}
                label="Multiple Choice Questions?"
                check={multipleChoice}
            />
            {/* <ToggleButton
                toggleFunction={toggleWritten}
                label="Written Questions"
                check={written}
            /> */}

            <button type="button" onClick={handleCreateTest}>
                Create Test
            </button>
        </div>
    </div>
  );
};

export default TestCreation;
