'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Wrong from './Wrong';

export default function QuizPage({ initialQuestions }) {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log('Current Question Index:', currentQuestionIndex);
    console.log('Current Question:', currentQuestion);
    console.log('Questions:', questions);
  }, [currentQuestionIndex, currentQuestion, questions]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions]);

  const handleAnswer = (selectedAnswer) => {
    console.log('Selected Answer:', selectedAnswer);
    console.log('Correct Answer:', currentQuestion.answer);

    if (selectedAnswer === currentQuestion.answer) {
      // Correct answer logic
      switch(currentQuestionIndex) {
        case 0:
          console.log('Setting Level 1');
          setCurrentLevel(
            <Level1 
              onVideoEnd={() => {
                console.log('Level 1 video ended');
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
              setCurrentQuestion(questions[1]);
              setCurrentLevel(null);
              }} 
            />
          );
          break;
        case 1:
          console.log('Setting Level 2');
          setCurrentLevel(
            <Level2 
              onVideoEnd={() => {
                console.log('Level 2 video ended');
                setCurrentQuestionIndex(2);
                setCurrentQuestion(questions[2]);
                setCurrentLevel(null);
              }} 
            />
          );
          break;
        case 2:
          console.log('Setting Level 3');
          setCurrentLevel(
            <Level3 
              onVideoEnd={() => {
                console.log('Level 3 video ended');
                router.push('/completion');
              }} 
            />
          );
          break;
        default:
          console.log('Unexpected question index');
          router.push('/completion');
      }
    } else {
      // Wrong answer logic
      console.log('Wrong answer');
      setIsWrong(true);
    }
  };

  const handleRetry = () => {
    console.log('Retrying quiz');
    // Reset quiz to the first question
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setIsWrong(false);
    setCurrentLevel(null);
  };

  // If questions are not loaded yet
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  // If wrong answer is given
  if (isWrong) {
    return <Wrong onRetry={handleRetry} />;
  }

  // If a level component should be displayed
  if (currentLevel) {
    return currentLevel;
  }

  // Question rendering
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md bg-[#121212] shadow-2xl rounded-2xl overflow-hidden border-1 border-white">
        <div className="bg-[#121212] p-4">
          <h2 className="text-2xl text-grey-300 text-center">
            Question {currentQuestionIndex + 1}
          </h2>
        </div>

        <div className="p-6">
          <h3 className="text-2xl text-[#00f5d0] mb-6 text-center">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4">
            {['option1', 'option2', 'option3', 'option4'].map((optionKey, index) => (
              <button
                key={optionKey}
                onClick={() => handleAnswer(currentQuestion[optionKey])}
                className={`
                  w-full p-4 rounded-lg text-left transition-all duration-300
                  bg-[#1E1E1E] text-white hover:bg-[#2E2E2E]
                `}
              >
                <span className="text-lg font-medium">
                  {String.fromCharCode(65 + index)}. {currentQuestion[optionKey]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}