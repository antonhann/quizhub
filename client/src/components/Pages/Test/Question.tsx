import React, { ReactNode } from "react"

interface QuestionProps {
    children: ReactNode; // ReactNode is more specific and covers all valid React elements
}
export const Question: React.FC<QuestionProps> = ({ children }) => {
    return (
        <div className="question center">
            {children}
        </div>
    );
};
interface TFProps {
    term: string
    displayAnswer: string
    userAnswer: string | undefined | boolean
    handleTFAnswer : (index : number, ans : boolean) => void
    index: number
}
export const TrueFalseQuestion : React.FC<TFProps> = ({
    term,
    displayAnswer,
    userAnswer,
    handleTFAnswer,
    index
}) => {
    return(
        
        <Question>
            <div className="trueFalse center">
                <h3>
                    {term}
                </h3>
                <div className="separator"></div>
                <h3>
                    {displayAnswer}
                </h3>
            </div>
            <div className='d-flex justify-content-center gap-3'>
                <button 
                  className = {userAnswer ? `active` : ""} 
                  onClick={() => handleTFAnswer(index, true)}
                >
                  True
                </button>
                <button 
                  className={userAnswer === false ? "active" : ""} 
                  onClick={() => handleTFAnswer(index, false)}
                >
                  False
                </button>
              </div>
        </Question>
    )
}
interface MCProps {
    term: string
    choices: string[]
    indexTerm: number
    userAnswer: string | undefined | boolean
    handleMCAnswer : (index: number, answer: string) => void;
}
export const MultipleChoiceQuestion : React.FC<MCProps> = ({
    term,
    indexTerm,
    userAnswer,
    choices,
    handleMCAnswer
}) => {
    return(
        <Question>
            <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <div>
                    {term}
                </div>
                <div className="d-flex gap-3">
                    {
                        choices.map((choice,index) => {
                            return(
                                <button 
                                    key = {index}
                                    className = {choice == userAnswer ? `active` : ""} 
                                    onClick={() => handleMCAnswer(indexTerm, choice)}
                                >
                                    {choice}
                                </button>
                            )   
                        })
                    }
                </div>
                
            </div>
        </Question>
        
    )
}