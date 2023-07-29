import { QuizData } from "../data/quiz-data";
import QuizResult from "./quiz-result";
import { useState } from "react";

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0); //for question to be display on screen.
    const [score, setScore] = useState(0);// for correct answer to be clicked. conditions applied.
    const [clickedOption, setClickedOption] = useState(0); //for the options to be clicked
    const [showResult, setShowResult] = useState(false); // initially false.
    // now the changeQuestion is for next button functionality as the conditions given below.
    const changeQuestion = () => {
        updateScore(); //for updating the score when correct answer is clicked.
        if (currentQuestion < QuizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0); //0 because we want next question's options are not previously selected.
        } else {
            setShowResult(true) //as all the questions were being answered.
        }
    }
    const updateScore = () => {
        if (clickedOption === QuizData[currentQuestion].answer) {
            setScore(score + 1);
        }
    }
    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setScore(0);
        setClickedOption(0);
    }
    return (
        <div>
            <p className="heading-txt">Quiz</p>
            <div className="container">
                {showResult ? (
                    <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
                ) : (
                    <>
                        <div className="question">
                            <span id="question-number">{currentQuestion + 1}. </span>
                            <span>{QuizData[currentQuestion].question}</span>
                        </div>
                        <div className="option-container">
                            {QuizData[currentQuestion].options.map((option, i) => {
                                return (
                                    <button className={`option-btn ${clickedOption == i + 1 ? "checked" : null}`} key={i} onClick={() => setClickedOption(i + 1)}>{option}</button>
                                )
                            })}
                        </div>
                        <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
                    </>
                )}

            </div>
        </div>
    );
}

export default Quiz