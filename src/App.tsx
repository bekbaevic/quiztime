import { useState } from "react"

//components
import QuestionCard from "./Components/QuestionCard"

//types 
import { QuestionState, Difficulty, fetchQuizQuestions } from "./API";


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //User answer
      const answer = e.currentTarget.value;
      //Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      //Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion)
    }
  }


  return (
    <div className="w-full h-screen flex justify-center items-center flex-col bg-gray-800">
      <div className="h-[400px] md:w-[500px] min-w-[300px] bg-slate-300 flex flex-col justify-between text-center p-4 rounded-lg">
        <div className="flex flex-col gap-4 justify-between">
          <h1 className="text-[24px] font-[700] tracking-widest border-b border-black pb-4 text-gray-800">Quiz Time</h1>

          {userAnswers.length === TOTAL_QUESTIONS ? <p className="font-[600] pl-5 text-[24px]">Score: {score}</p> : null}

          {loading && <p>Loading Question...</p>}
          {!loading && !gameOver && userAnswers.length !== TOTAL_QUESTIONS && (
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          )}
        </div>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="bg-indigo-600 p-1 text-white rounded-sm hover:bg-indigo-700" onClick={startTrivia}>{score===0 ? "Start" : "Restart"}</button>
        ) : null}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="bg-indigo-600 p-1 text-white rounded-sm hover:bg-indigo-700" onClick={nextQuestion}>Next Question</button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
