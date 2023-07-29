import React, { useState, useEffect } from 'react';

function App() {
  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'London', isCorrect: false },
        { answerText: 'Berlin', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Rome', isCorrect: false },
      ],
    },
    {
      questionText: 'Which planet is closest to the Sun?',
      answerOptions: [
        { answerText: 'Mars', isCorrect: false },
        { answerText: 'Mercury', isCorrect: true },
        { answerText: 'Venus', isCorrect: false },
        { answerText: 'Jupiter', isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const handleAnswerClick = (isCorrect) => {
    if (!showScore) {
      if (isCorrect) {
        setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setCountdown(10);
      } else {
        setShowScore(true);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (currentQuestion < questions.length && !showScore && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleAnswerClick(false); 
    }

    return () => clearTimeout(timer);
  }, [currentQuestion, countdown, showScore]);

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setCountdown(10);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Quiz App</h1>
        {showScore ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              You scored {score} out of {questions.length}
            </h2>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleRestartQuiz}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-xl font-semibold">{questions[currentQuestion].questionText}</p>
              <p className="text-lg">Time Left: {countdown} seconds</p>
            </div>
            <div>
              {questions[currentQuestion].answerOptions.map((option, index) => (
                <button
                  key={index}
                  className={`${
                    countdown === 0 || showScore
                      ? option.isCorrect
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : 'bg-blue-500'
                  } hover:bg-blue-600 text-white px-4 py-2 rounded block w-full mb-2`}
                  disabled={countdown === 0 || showScore}
                  onClick={() => handleAnswerClick(option.isCorrect)}
                >
                  {option.answerText}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
