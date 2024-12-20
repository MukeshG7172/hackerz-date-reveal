'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Code, ShieldAlert, Skull, Shield } from 'lucide-react';
import QuizPage from './QuizPage';
import MatrixNumberRain from './MatrixNumberRain';
import BreachButton from './BreachButton';

export default function QuizStartPage({ initialQuestions }) {
  const [stage, setStage] = useState('disclaimer');
  const [instructionText, setInstructionText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const fullInstructionText = "The System Security of Hackerz is Protected by a Three-tier Firewall Mechanism. To Gain Access, all levels of the Firewall must be successfully Bypassed.";

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
        audioRef.current.currentTime = 0;
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

  const handleAcknowledge = () => {
    setStage('initial-text');
  };

  const DisclaimerOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-lg mx-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-2 border-green-500/50 rounded-xl shadow-[0_0_60px_rgba(0,255,0,0.4)] p-8 text-center transform hover:scale-[1.02] transition-all duration-300">
        <Shield className="mx-auto mb-6 text-green-400 animate-pulse" size={64} />
        <h2 className="text-green-400 text-3xl font-black mb-6 tracking-wider animate-pulse">
          SECURITY NOTICE
        </h2>
        <div className="space-y-4">
          <p className="text-green-300/90 text-lg leading-relaxed font-medium">
            [!] ATTENTION [!]
          </p>
          <p className="text-white/90 text-lg leading-relaxed">
            This is a controlled simulation by <span className="text-green-400 font-bold">Hackerz</span>.
          </p>
          <p className="text-white/90 text-lg leading-relaxed mb-6">
            All systems remain secure with no unauthorized access.
          </p>
          <p className="text-green-400 text-xl font-bold animate-pulse">
            Proceed to explore the breach... if you dare.
          </p>
        </div>
        <button 
          onClick={handleAcknowledge}
          className="mt-8 px-8 py-3 bg-green-500/20 border-2 border-green-500/50 text-green-400 rounded-lg 
                   hover:bg-green-500/30 hover:text-green-300 hover:border-green-400 
                   transition-all duration-300 text-lg font-bold tracking-wide
                   shadow-[0_0_20px_rgba(0,255,0,0.2)] hover:shadow-[0_0_30px_rgba(0,255,0,0.4)]"
        >
          ACKNOWLEDGE & PROCEED
        </button>
      </div>
    </div>
  );

  const baseLayout = (content) => (
    <div className="min-h-screen font-grotesk bg-black text-white flex items-center justify-center overflow-hidden relative">
      <MatrixNumberRain
        numColumns={typeof window !== 'undefined' ? Math.min(50, Math.floor(window.innerWidth / 20)) : 50}
        speed={30}
        density={0.8}
      />

      <audio ref={audioRef} src="/instruction.mp3" preload="auto" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-[200px] h-[200px] object-contain mx-auto mt-4 relative z-10"
        />
        <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge z-0" />
      </div>

      {content}
      {stage === 'disclaimer' && <DisclaimerOverlay />}
    </div>
  );

  if (stage === 'disclaimer') {
    return baseLayout(null);
  }

  if (stage === 'initial-text') {
    return baseLayout(
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
    );
  }

  if (stage === 'start-text') {
    return baseLayout(
      <div className="w-full mt-[150px] max-w-xl mx-4 bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-10">
        <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
          <div className="flex items-center text-sm sm:text-base">
            <Code className="mr-2 text-red-500" size={16} />
            SYSTEM BREACH DETECTED
          </div>
        </div>

        <div className="p-4 sm:p-8 text-center">
          <div className="text-3xl sm:text-6xl font-bold mb-6 text-red-500 uppercase tracking-widest animate-glitch-text flex items-center justify-center flex-wrap gap-2">
            <ShieldAlert className="animate-pulse" size={typeof window !== 'undefined' && window.innerWidth < 640 ? 32 : 48} />
            <span>Start</span>
            <Skull className="text-white animate-bounce" size={typeof window !== 'undefined' && window.innerWidth < 640 ? 32 : 48} />
            <AlertTriangle className="animate-pulse" size={typeof window !== 'undefined' && window.innerWidth < 640 ? 32 : 48} />
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