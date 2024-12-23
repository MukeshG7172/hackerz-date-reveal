'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Code, ShieldAlert, Skull } from 'lucide-react';
import MatrixNumberRain from './MatrixNumberRain';
import BreachButton from './EndBreach';

export default function QuizStartPage({ initialQuestions }) {
  const [stage, setStage] = useState('initial-text');
  const [instructionText, setInstructionText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const router = useRouter();
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const fullInstructionText = "You have Successfully Bypassed all the Three Firewalls. You can now Access the Hackerz System";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsWideScreen(window.innerWidth > window.innerHeight);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      setInstructionText('');
      setShowButton(false);

      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }

      const typingInterval = setInterval(() => {
        if (index < fullInstructionText.length) {
          setInstructionText(fullInstructionText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setShowButton(true);
        }
      }, 10);
  
      return () => {
        clearInterval(typingInterval);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
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
            setIsVideoLoading(false);
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
        <audio ref={audioRef} src="/ending.mp3" />
        <MatrixNumberRain
          numColumns={window.innerWidth < 768 ? 20 : 50}
          speed={30}
          density={0.8}
        />
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/logo1.png"
            alt="Logo"
            className="w-[200px] h-[200px] object-contain mx-auto mt-4 relative z-10"
          />
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge z-0">
          </div>
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
              Finishing Breach Protocol...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'start-text') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center font-grotesk justify-center overflow-hidden relative">
        <audio ref={audioRef} src="/ending.mp3" />
        <MatrixNumberRain
          numColumns={window.innerWidth < 768 ? 20 : 50}
          speed={30}
          density={0.8}
        />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/logo1.png"
            alt="Logo"
            className="w-[200px] h-[200px] object-contain mx-auto mt-4 relative z-10"
          />
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge z-0">
          </div>
        </div>
        
        <div className="w-full mt-[150px] max-w-xl mx-4 bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-10">
          <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
            <div className="flex items-center text-sm sm:text-base">
              <Code className="mr-2 text-red-500" size={16} />
              SYSTEM BREACH DETECTED
            </div>
          </div>
          
          <div className="p-4 sm:p-8 text-center">
            <div className="text-3xl sm:text-6xl font-bold mb-6 text-red-500 uppercase tracking-widest animate-glitch-text flex flex-col sm:flex-row items-center justify-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <ShieldAlert className="mr-2 sm:mr-4 animate-pulse" size={window.innerWidth < 640 ? 32 : 48} />
                BREACHED
              </div>
              <div className="flex items-center">
                <Skull className="mx-2 text-white animate-bounce" size={window.innerWidth < 640 ? 32 : 48} />
                <AlertTriangle className="ml-2 sm:ml-4 animate-pulse" size={window.innerWidth < 640 ? 32 : 48} />
              </div>
            </div>
            
            <div className="text-base sm:text-2xl text-white font-grotesk opacity-70 mb-6 animate-subtle-glitch px-2">
              {instructionText}
              <span className="animate-blink">|</span>
            </div>
            
            {showButton && (
              <BreachButton onClick={handleStartBreaching} />
            )}
          </div>
        </div>
      </div>
    );
  }
   
  if (stage === 'video') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        {isVideoLoading && (
          <div className="absolute z-50 bg-black/80 p-6 rounded-lg border-2 border-red-600/50 shadow-[0_0_40px_rgba(255,0,0,0.5)]">
            <div className="text-red-500 text-xl animate-pulse">
              Retrieving Data...
            </div>
          </div>
        )}
        <div className={`relative w-full h-full ${isWideScreen ? 'flex items-center justify-center' : ''}`}>
          <video
            ref={videoRef}
            src="/ending.mp4"
            autoPlay
            playsInline
            className={`${
              isWideScreen
                ? 'w-full h-full object-cover'
                : 'w-full h-full object-contain'
            }`}
            onEnded={() => router.push('/comments')}
            onPlaying={() => setIsVideoLoading(false)}
          />
        </div>
      </div>
    );
  }
}