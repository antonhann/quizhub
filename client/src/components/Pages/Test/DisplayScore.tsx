import React from "react"

interface DisplayScoreProps{
    score: number
}
const DisplayScore : React.FC<DisplayScoreProps> = ({
    score
}) => {
  return (
    <div>
      {score}
    </div>
  )
}

export default DisplayScore
