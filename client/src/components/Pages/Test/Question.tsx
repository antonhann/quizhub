import React, { ReactNode } from "react"

interface QuestionProps {
    children: ReactNode; // ReactNode is more specific and covers all valid React elements
}
export const Question: React.FC<QuestionProps> = ({ children }) => {
    return (
        <div className="question">
            {children}
        </div>
    );
};
interface TFProps {
    term: string,
    displayAnswer: string
}
export const TrueFalseQuestion : React.FC<TFProps> = ({
    term,
    displayAnswer,
}) => {
    return(
        
        <Question>
            <div className="trueFalse">
                <h3>
                    {term}
                </h3>
                <h3>
                    {displayAnswer}
                </h3>
            </div>
        </Question>
    )
}
interface MCProps {
    term: string
    choices: string[]
    index: number
    userAnswer: string | undefined | boolean
    handleMCAnswer : (index: number, answer: string) => void;
}
export const MultipleChoiceQuestion : React.FC<MCProps> = ({
    term,
    index,
    userAnswer,
    choices,
    handleMCAnswer
}) => {
    return(
        <div className="d-flex flex-column">
            <div>
                {term}
            </div>
            <div className="d-flex">
                {
                    choices.map((choice) => {
                        return(
                            <button 
                                className = {choice == userAnswer ? `active` : ""} 
                                onClick={() => handleMCAnswer(index, choice)}
                            >
                                {choice}
                            </button>
                        )   
                    })
                }
            </div>
            
        </div>
    )
}