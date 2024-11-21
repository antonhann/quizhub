import React, { useEffect, useState } from 'react'
import { DEFAULT_QD, QuestionDistribution } from '.'
import { StudyCard } from '../../../models/StudyCard'

interface TestProps{
  questionDistribution: QuestionDistribution,
  terms: StudyCard[]
}
const Test: React.FC<TestProps> = ({
  questionDistribution,
  terms
}) => {
  useEffect(() => {
    console.log(questionDistribution, "from testing")
  }, [questionDistribution])
  return (
    <div>
      {
        questionDistribution.trueFalse
      }
    </div>
  )
}

export default Test
