'use client'; 
import React, { useState, useRef, useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { AlertTriangle, Code, ShieldAlert, Skull } from 'lucide-react'; 
import QuizPage from './QuizPage'; 
import MatrixNumberRain from './MatrixNumberRain';  
import BreachButton from './BreachButton';

export default function QuizStartPage({ initialQuestions }) {   
  const [stage, setStage] = useState('initial-text');   
  const [instructionText, setInstructionText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();   
  const videoRef = useRef(null);    

  const fullInstructionText = "The system security of Hackerz is protected by a three-tier firewall mechanism. To gain access, all levels of the firewall must be successfully bypassed.";

  useEffect(() => {
    if (stage === 'initial-text') {
      const timer = setTimeout(() => {
        setStage('start-text');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'start-text') {
      let index = 0;
      setInstructionText(''); // Reset instruction text
      setShowButton(false);
      const typingInterval = setInterval(() => {
        if (index < fullInstructionText.length) {
          setInstructionText(fullInstructionText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setShowButton(true);
        }
      }, 10); // Adjust speed of typing here
  
      return () => clearInterval(typingInterval);
    }
  }, [stage]);

  const handleStartBreaching = () => {     
    console.log('Start Breaching button clicked');     
    setStage('video');     
    setTimeout(() => {       
      if (videoRef.current) {         
        console.log('Video element found', videoRef.current);                  
        videoRef.current.play()           
          .then(() => {             
            console.log('Video started playing successfully');           
          })           
          .catch((error) => {             
            console.error('Error playing video:', error);             
            alert('Please interact with the page to start the video');           
          });       
      } else {         
        console.error('Video ref is null');       
      }     
    }, 100);   
  };    

  if (stage === 'initial-text') {
    return (
      <div className="min-h-screen font-grotesk bg-black text-white flex items-center justify-center overflow-hidden relative">
        <MatrixNumberRain
          numColumns={typeof window !== 'undefined' ? Math.min(50, Math.floor(window.innerWidth / 20)) : 50}
          speed={30}
          density={0.8}
        />
        
        <div className="absolute inset-0 pointer-events-none bg-grid-white/[0.05] opacity-20 overflow-hidden">
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge"></div>
        </div>
        
        <div className="w-full max-w-xl mx-4 bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-10">
          <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
            <div className="flex items-center text-sm sm:text-base">
              <Code className="mr-2 text-red-500" size={16} />
              SYSTEM BREACH DETECTED
            </div>
          </div>
          
          <div className="p-4 sm:p-8 text-center">
            <div className="text-xl sm:text-2xl text-red-500 mb-6 animate-pulse">
              Initializing Breach Protocol...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'start-text') {
    return (
      <div className="min-h-screen bg-black font-grotesk text-white flex items-center justify-center overflow-hidden relative">
        <MatrixNumberRain
          numColumns={typeof window !== 'undefined' ? Math.min(50, Math.floor(window.innerWidth / 20)) : 50}
          speed={30}
          density={0.8}
        />
        
        <div className="absolute inset-0 pointer-events-none bg-grid-white/[0.05] opacity-20 overflow-hidden">
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge"></div>
        </div>
        
        <div className="w-full max-w-xl mx-4 bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-10">
          <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
            <div className="flex items-center text-sm sm:text-base">
              <Code className="mr-2 text-red-500" size={16} />
              SYSTEM BREACH DETECTED
            </div>
          </div>
          
          <div className="p-4 sm:p-8 text-center">
            <div className="text-3xl sm:text-6xl font-bold mb-6 text-red-500 uppercase tracking-widest animate-glitch-text flex items-center justify-center flex-wrap gap-2">
              <ShieldAlert className="animate-pulse" size={window.innerWidth < 640 ? 32 : 48}  />
              <span>Start</span>
              <Skull className="text-white animate-bounce"size={window.innerWidth < 640 ? 32 : 48}  />
              <AlertTriangle className="animate-pulse" size={window.innerWidth < 640 ? 32 : 48}  />
            </div>
            
            <div className="text-base sm:text-2xl text-white font-grotesk opacity-70 mb-6 animate-subtle-glitch px-2">
              {instructionText}
              <span className="animate-blink">|</span>
            </div>
            
            {showButton && (
              <div className="flex justify-center">
                <BreachButton onClick={handleStartBreaching} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
   
  if (stage === 'video') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src="/lvl1.mp4"
          autoPlay
          playsInline
          className="w-full h-full object-contain"
          onEnded={() => setStage('quiz')}
        />
      </div>
    );
  }
   
  return <QuizPage initialQuestions={initialQuestions} />; 
}