import React from "react"
import { useNavigate, useParams } from "react-router";

interface DisplayScoreProps{
    score: number
    handleTryAgain: () => void
}
const DisplayScore : React.FC<DisplayScoreProps> = ({
    score,
    handleTryAgain
}) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Test Score!</h1>
      <h4>You scored a whopping {score}%!</h4>
      <p>{score >= 70 ? "Congrats you understand the set pretty well!" : "Please study some more!"}</p>
      <div>
        <button onClick={handleTryAgain}>Try again?</button>
        <button onClick={ () => navigate(`/view-set/${params.id}`)}>Go back</button>
      </div>
      
    </div>
  )
}

export default DisplayScore
