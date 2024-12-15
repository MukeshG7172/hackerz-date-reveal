'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Skull, ShieldAlert, Zap, Code, Cpu, AlertTriangle } from 'lucide-react';
import Level1 from './level1';
import Level2 from './level2';
import Level3 from './level3';
import Wrong from './wrong';
import MatrixNumberRain from './MatrixNumberRain';

export default function HackerQuizPage({ initialQuestions }) {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [hackEffect, setHackEffect] = useState(false);
  const [ghostHover, setGhostHover] = useState(null);
  const [systemWarnings, setSystemWarnings] = useState([]);
  const [backgroundNoise, setBackgroundNoise] = useState(false);
  const ghostTimerRef = useRef(null);
  const warningTimerRef = useRef(null);

  // Enhanced hacking simulation effects
  const generateSystemWarning = () => {
    const warnings = [
      "INTRUSION DETECTED",
      "FIREWALL BREACH"
    ];
    const newWarning = {
      id: Date.now(),
      message: warnings[Math.floor(Math.random() * warnings.length)],
      type: ['error', 'warning', 'critical'][Math.floor(Math.random() * 3)]
    };

    setSystemWarnings(prev => [
      ...prev.slice(-5), 
      newWarning
    ]);

    // Trigger background noise
    setBackgroundNoise(true);
    setTimeout(() => setBackgroundNoise(false), 200);
  };

  const simulateGhostHover = () => {
    const options = ['option1', 'option2', 'option3', 'option4'];
    const randomOption = options[Math.floor(Math.random() * options.length)];
    
    setGhostHover(randomOption);
    
    ghostTimerRef.current = setTimeout(() => {
      setGhostHover(null);
    }, Math.random() * 500 + 500);
  };

  useEffect(() => {
    // Set up periodic system warnings and ghost hovering
    const warningInterval = setInterval(generateSystemWarning, 2000);
    const hoverInterval = setInterval(simulateGhostHover, 2000);

    return () => {
      clearInterval(warningInterval);
      clearInterval(hoverInterval);
      if (ghostTimerRef.current) {
        clearTimeout(ghostTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setCurrentQuestion(questions[0]);
    }
  }, [questions]);

  const triggerHackEffect = () => {
    setHackEffect(true);
    setTimeout(() => setHackEffect(false), 500);
  };

  const handleAnswer = (selectedAnswer) => {
    triggerHackEffect();
    generateSystemWarning(); // Additional warning on interaction
    
    if (selectedAnswer === currentQuestion.answer) {
      switch(currentQuestionIndex) {
        case 0:
          setCurrentLevel(
            <Level1 
              onVideoEnd={() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setCurrentQuestion(questions[1]);
                setCurrentLevel(null);
              }} 
            />
          );
          break;
        case 1:
          setCurrentLevel(
            <Level2 
              onVideoEnd={() => {
                setCurrentQuestionIndex(2);
                setCurrentQuestion(questions[2]);
                setCurrentLevel(null);
              }} 
            />
          );
          break;
        case 2:
          setCurrentLevel(
            <Level3 
              onVideoEnd={() => {
                router.push('/completion');
              }} 
            />
          );
          break;
        default:
          router.push('/completion');
      }
    } else {
      setIsWrong(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setIsWrong(false);
    setCurrentLevel(null);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500 animate-pulse">
        <Terminal className="mr-2" />
        INITIALIZING SYSTEM...
      </div>
    );
  }

  if (isWrong) {
    return <Wrong onRetry={handleRetry} />;
  }

  if (currentLevel) {
    return currentLevel;
  }
  return (
    <div className={`
      min-h-screen 
      bg-black 
      text-white 
      flex 
      items-center 
      justify-center 
      overflow-hidden 
      relative
      p-4  // Added padding for smaller screens
      ${hackEffect ? 'animate-glitch-screen' : ''}
      ${backgroundNoise ? 'animate-background-noise' : ''}
    `}>
      <MatrixNumberRain 
        numColumns={50}  
        speed={30}       
        density={0.8}     
      />
      
      {/* Background Grid */}
      <div className="
        absolute 
        inset-0 
        pointer-events-none 
        bg-grid-white/[0.05] 
        opacity-20
        overflow-hidden
      ">
        <div className="
          absolute 
          inset-0 
          bg-red-500/10 
          animate-glitch-overlay 
          mix-blend-color-dodge
        "></div>
      </div>

      {/* Firewall Breach Indicator */}
      {currentQuestionIndex > 0 && (
        <div className="
          mt-[30px]
          fixed 
          top-4 
          left-0 
          right-0 
          flex 
          justify-center 
          z-50
          px-4  // Added horizontal padding
        ">
          <div className="
            bg-red-900/80 
            text-white 
            px-4 
            py-2 
            rounded-full 
            text-sm 
            sm:text-base 
            md:text-xl 
            uppercase 
            tracking-wider 
            animate-pulse
            flex 
            items-center
            max-w-full 
            overflow-hidden 
            text-ellipsis
          ">
            <ShieldAlert className="mr-2 flex-shrink-0" size={16} />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {currentQuestionIndex === 1 ? 'Firewall 1 has been breached' : 'Firewall 2 has been breached'}
            </span>
          </div>
        </div>
      )}

      {/* System Warning Ticker */}
      <div className="
        fixed 
        top-0 
        left-0 
        right-0 
        bg-red-900/50 
        text-red
        p-2 
        flex 
        items-center 
        justify-center 
        overflow-hidden
        text-xs 
        sm:text-sm
      ">
        {systemWarnings.map(warning => (
          <div 
            key={warning.id} 
            className={`
              mr-2 
              sm:mr-4 
              flex 
              items-center 
              animate-slide-in
              ${warning.type === 'critical' ? 'text-red-500' : 
                warning.type === 'warning' ? 'text-red-500' : 'text-red'}
            `}
          >
            {warning.type === 'critical' ? (
              <AlertTriangle className="mr-1 sm:mr-2" size={window.innerWidth < 640 ? 12 : 16}  />
            ) : warning.type === 'warning' ? (
              <ShieldAlert className="mr-1 sm:mr-2" size={window.innerWidth < 640 ? 12 : 16} />
            ) : (
              <Cpu className="mr-1 sm:mr-2" size={window.innerWidth < 640 ? 12 : 16}  />
            )}
            <span className="truncate">{warning.message}</span>
          </div>
        ))}
      </div>

      {/* Terminal-like container */}
      <div className="
        w-full 
        max-w-md 
        md:max-w-lg 
        lg:max-w-xl 
        bg-[#0a0a0a] 
        border-2 
        border-red-600/50 
        rounded-xl 
        shadow-[0_0_40px_rgba(255,0,0,0.5)]
        overflow-hidden
        relative
        animate-terminal-flicker
        mt-16 
        md:mt-20 
        lg:mt-24
      ">
        {/* Hacker status bar */}
        <div className="
          bg-red-900/30 
          text-white 
          p-2 
          flex 
          items-center 
          justify-between
          border-b 
          border-red-600/30
          text-xs 
          sm:text-sm
        ">
          <div className="flex items-center">
          <Code 
  className="mr-1 sm:mr-2 text-red-500" 
  size={window.innerWidth < 640 ? 12 : 16} 
/>

            SYSTEM BREACH: LEVEL {currentQuestionIndex + 1}
          </div>
          <div className="text-grey-300 animate-pulse">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Question Content */}
        <div className="p-4 sm:p-6">
          <h2 className="
            text-base 
            sm:text-xl 
            text-red-500 
            mb-2 
            sm:mb-4 
            flex 
            items-center 
            uppercase 
            tracking-widest
            animate-glitch-text
          ">
            <ShieldAlert className="mr-1 sm:mr-2" size={window.innerWidth < 640 ? 16 : 20}  />
            Security Challenge
          </h2>

          <h3 className="
            text-lg 
            sm:text-2xl 
            text-white 
            mb-4 
            sm:mb-6 
            text-center 
            opacity-80
            hover:opacity-100
            transition-opacity
            cursor-default
            animate-subtle-glitch
          ">
            {currentQuestion.question}
          </h3>

          <div className="space-y-2 sm:space-y-4 relative">
            {['option1', 'option2', 'option3', 'option4'].map((optionKey, index) => (
              <button
                key={optionKey}
                onClick={() => handleAnswer(currentQuestion[optionKey])}
                className={`
                  w-full 
                  p-2 
                  sm:p-4 
                  rounded-lg 
                  text-left 
                  transition-all 
                  duration-300
                  bg-[#1a1a1a] 
                  border 
                  border-red-900/30
                  text-grey-300
                  hover:bg-red-900/20
                  hover:border-red-500
                  hover:text-white
                  group
                  relative
                  overflow-hidden
                  text-sm 
                  sm:text-base
                  ${ghostHover === optionKey 
                    ? 'bg-red-900/50 border-red-500 text-white animate-pulse' 
                    : ''
                  }
                `}
              >
                {/* Ghost hover indicator */}
                {ghostHover === optionKey && (
                  <div className="
                    absolute 
                    inset-0 
                    border-2 
                    border-red-500 
                    animate-ghost-border
                    pointer-events-none
                  "></div>
                )}

                {/* Cyber glitch effect */}
                <div className="
                  absolute 
                  inset-0 
                  bg-gradient-to-r 
                  from-transparent 
                  via-red-500/10 
                  to-transparent 
                  opacity-0 
                  group-hover:opacity-50 
                  transition-opacity
                "></div>

                <span className="
                  text-sm 
                  sm:text-lg 
                  font-mono 
                  relative 
                  z-10
                  flex 
                  items-center
                ">
                  <Skull className="mr-1 sm:mr-2 text-red-500 opacity-50 group-hover:opacity-100" size={window.innerWidth < 640 ? 12 : 16}  />
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