import React, { useEffect, useState } from 'react'
import { QuestionDistribution } from '.'
import { StudyCard } from '../../../models/StudyCard'
import { MultipleChoiceQuestion, TrueFalseQuestion } from './Question'
import { shuffle } from '../Flashcard'
import DisplayScore from './DisplayScore'

interface TestProps{
  questionDistribution: QuestionDistribution,
  terms: StudyCard[]
}
interface QuestionType{
  term: string
  answer: string
  userAnswer?: string | boolean
}
export interface TFType extends QuestionType{
  displayAnswer: string
  trueOrFalse: boolean
}
export interface MCType extends QuestionType{
  choices: string[]
} 
const Test: React.FC<TestProps> = ({
  questionDistribution,
  terms
}) => {
  const [trueFalseQuestions, setTrueFalseQuestions] = useState<TFType[]>([])
  const [multipleChoiceQuestions, setMCQuestions] = useState<MCType[]>([])
  const [score, setScore] = useState<number>(0)
  const [submitted, setSubmitted] = useState<boolean>(false)

  //On load, generate questions
  useEffect(() => {
    getQuestions()
  }, [])
  const getQuestions = () => {
    const availableTerms = [...terms];
    const tfQuestions = [];
    for(let i = 0; i < questionDistribution.trueFalse; i++){
      const randomIndex = Math.floor(Math.random() * availableTerms.length);
      const randomTerm = availableTerms[randomIndex]
      const displayAnswer = getRandomTFChoices(randomTerm.answer,terms)
      tfQuestions.push({
        term: randomTerm.term,
        answer: randomTerm.answer,
        displayAnswer: displayAnswer,
        trueOrFalse: randomTerm.answer == displayAnswer,
        userAnswer: undefined
      })
      availableTerms.splice(randomIndex, 1);
    }
    setTrueFalseQuestions(tfQuestions)

    const mcQuestions = [];
    for(let i = 0; i < questionDistribution.multipleChoice; i++) {
      const randomIndex = Math.floor(Math.random() * availableTerms.length);
      const randomTerm = availableTerms[randomIndex]
      const choices = getRandomMCChoices(randomTerm.answer,terms)
      mcQuestions.push({
        term: randomTerm.term,
        answer: randomTerm.answer,
        choices: shuffle(choices),
        userAnswer: undefined
      })
      availableTerms.splice(randomIndex, 1);
    }
    setMCQuestions(mcQuestions)
  }

  
  const handleTFAnswer = (index: number, answer: boolean) => {
    // Update user's answer for the question
    const updatedQuestions = [...trueFalseQuestions];
    updatedQuestions[index].userAnswer = answer;
    setTrueFalseQuestions(updatedQuestions);
  };
  const handleMCAnswer = (index: number, answer: string) => {
    const updatedQuestions = [...multipleChoiceQuestions];
    updatedQuestions[index].userAnswer = answer;
    setMCQuestions(updatedQuestions)
  }
  const handleSubmit = () => {
    // Calculate the score
    let totalQuestions = (
      questionDistribution.trueFalse +
      questionDistribution.multipleChoice
    )
    let totalScore = 0;
    trueFalseQuestions.forEach((question) => {
      if (question.userAnswer === question.trueOrFalse) {
        totalScore++;
      }
    });
    multipleChoiceQuestions.forEach((question) => {
      if(question.userAnswer == question.answer){
        totalScore ++;
      }
    })
    setScore((totalScore / totalQuestions) * 100)
    setSubmitted(true)
  };
  const handleTryAgain = () => {
    setSubmitted(false)
    setScore(0)
    getQuestions()
  }
  if(submitted){
    return(
      <DisplayScore score = {score} handleTryAgain={handleTryAgain}/>
    )
  }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center gap-4'>
      <h1>Good Luck!</h1>
      {
        trueFalseQuestions.map((question, index) => {
          return(
            <div key = {index}>
              <TrueFalseQuestion
                term = {question.term}
                displayAnswer= {question.displayAnswer}
                userAnswer = {question.userAnswer}
                handleTFAnswer = {handleTFAnswer}
                index = {index}
              />
            </div>
          )
        })
      }
      {
        multipleChoiceQuestions.map((question,index) => {
          return(
            <div key={index}>
              <MultipleChoiceQuestion
                term = {question.term}
                choices = {question.choices}
                userAnswer = {question.userAnswer}
                index = {index}
                handleMCAnswer={handleMCAnswer}
              >

              </MultipleChoiceQuestion>
            </div>
          )
        })
      }
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Test

const getRandomTFChoices = (
  correctAnswer: string,
  terms: StudyCard[],
) => {
  let correct = Math.floor(Math.random() * 2)
  if (correct){
    return correctAnswer
  }else{
    const incorrectAnswers = terms
      .filter(term => term.answer !== correctAnswer) // Exclude correct answer
      .map(term => term.answer);

    // Fallback: If no incorrect answers exist, return the correct answer
    if (incorrectAnswers.length === 0) {
      return correctAnswer;
    }

    // Pick a random incorrect answer
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
    return incorrectAnswers[randomIndex];
  }
}

const getRandomMCChoices = (
  correctAnswer: string,
  terms: StudyCard[]
) => {
  let result = [correctAnswer];

  // Remove the correct answer from the available terms.
  let availableTerms = terms.filter(term => term.answer !== correctAnswer);

  // Pick 3 incorrect answers.
  for (let i = 0; i < 3; i++) {
    if (availableTerms.length === 0) {
      break; // Exit if there are no more available incorrect answers.
    }

    const randomIndex = Math.floor(Math.random() * availableTerms.length);
    const selectedTerm = availableTerms[randomIndex];

    result.push(selectedTerm.answer);

    // Remove the selected term from the available terms to avoid duplicates.
    availableTerms.splice(randomIndex, 1);
  }

  return result;
}
