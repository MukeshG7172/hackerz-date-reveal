'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Code, ShieldAlert, Skull } from 'lucide-react';
import QuizPage from './QuizPage';
import MatrixNumberRain from './MatrixNumberRain';

export default function QuizStartPage({ initialQuestions }) {
  const [stage, setStage] = useState('start-text');
  const router = useRouter();
  const videoRef = useRef(null);

  const handleStartBreaching = () => {
    console.log('Start Breaching button clicked');
    
    // Attempt to change stage first
    setStage('video');

    // Use a small timeout to ensure DOM update
    setTimeout(() => {
      if (videoRef.current) {
        console.log('Video element found', videoRef.current);
        
        // Attempt to play with error handling
        videoRef.current.play()
          .then(() => {
            console.log('Video started playing successfully');
          })
          .catch((error) => {
            console.error('Error playing video:', error);
            // Fallback mechanism if autoplay fails
            alert('Please interact with the page to start the video');
          });
      } else {
        console.error('Video ref is null');
      }
    }, 100);
  };

  if (stage === 'start-text') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
        <MatrixNumberRain 
          numColumns={50}  
          speed={30}       
          density={0.8}     
        />

        <div className="absolute inset-0 pointer-events-none bg-grid-white/[0.05] opacity-20 overflow-hidden">
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge"></div>
        </div>

        <div className="w-full max-w-xl bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-10">
          <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
            <div className="flex items-center">
              <Code className="mr-2 text-red-500" size={16} />
              SYSTEM BREACH DETECTED
            </div>
          </div>

          <div className="p-8 text-center">
            <div className="text-6xl font-bold mb-6 text-red-500 uppercase tracking-widest animate-glitch-text flex items-center justify-center">
              <ShieldAlert className="mr-4 animate-pulse" size={48} />
              Start 
              <Skull className="ml-4 text-white animate-bounce" size={48} />
              <AlertTriangle className="ml-4 animate-pulse" size={48} />
            </div>
            <div className="text-xl text-white opacity-70 mb-6 animate-subtle-glitch">
              Preparing breach protocol...
            </div>
            
            <button 
              onClick={handleStartBreaching}
              className="
                bg-red-600 
                text-white 
                px-6 
                py-3 
                rounded-lg 
                hover:bg-red-700 
                transition-colors 
                duration-300 
                animate-pulse
                uppercase 
                font-bold
                tracking-wider
                focus:outline-none
                active:scale-95
              "
            >
              Start Breaching
            </button>
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