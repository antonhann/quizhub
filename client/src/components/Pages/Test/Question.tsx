import React from "react"

interface QuestionProps{
    term: string
    answer: string
}
export const TrueFalseQuestion : React.FC<QuestionProps> = ({
    term,
    answer
}) => {
    return(
        
        <div>
            <div>
                <h3>
                    {term}
                </h3>
                <h3>
                    {answer}
                </h3>
            </div>
            <div>
                TRUE OR FALSE
            </div>
        </div>
    )
}