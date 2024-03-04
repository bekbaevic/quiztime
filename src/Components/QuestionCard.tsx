import { AnswerObject } from "../App";
import { ButtonWrapper } from "./QuestionCard.styles";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => {
    return (
        <div>
            <p className="text-[14px] text-left px-3 text-gray-700 mb-1">Question: {questionNr} / {totalQuestions}</p>
            <p className="font-[600]" dangerouslySetInnerHTML={{ __html: question }} />
            <div className=" flex flex-col gap-2 my-2">
                {answers.map(answer => (
                    <ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer} className="border shadow-md border-gray-800 rounded-sm  cursor-pointer" key={answer}>
                        <button className="cursor-pointer w-full h-full p-1" disabled={userAnswer ? true : false} value={answer} onClick={callback}><span dangerouslySetInnerHTML={{ __html: answer }}></span></button>
                    </ButtonWrapper>
                ))}
            </div>
        </div>
    )
}

export default QuestionCard