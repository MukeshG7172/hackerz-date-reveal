'use client';
import { useState, useEffect, useRef } from 'react'
import { ShieldAlert, Code, Skull, AlertTriangle, Zap } from 'lucide-react';
import MatrixNumberRain from './MatrixNumberRain';

export default function Level1({ onVideoEnd }) {
  const [showCongratulations, setShowCongratulations] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCongratulations(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showCongratulations) {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.play();

        const handleVideoEnd = () => {
          console.log('Level 1 video explicitly ended');
          if (onVideoEnd) {
            onVideoEnd();
          }
        };

        videoElement.addEventListener('ended', handleVideoEnd);

        return () => {
          videoElement.removeEventListener('ended', handleVideoEnd);
        };
      }
    }
  }, [showCongratulations, onVideoEnd]);

  return (
    <div className="
      min-h-screen 
      bg-black 
      text-white 
      flex 
      items-center 
      justify-center 
      overflow-hidden 
      relative
    ">
      {/* Matrix Number Rain Background */}
      <MatrixNumberRain 
        numColumns={50}  
        speed={30}       
        density={0.8}     
      />

      {/* Cyber grid and glitch background */}
      <div className="
        absolute 
        inset-0 
        pointer-events-none 
        bg-grid-white/[0.05] 
        opacity-20
        overflow-hidden
      ">
        {/* Animated glitch overlay */}
        <div className="
          absolute 
          inset-0 
          bg-red-500/10 
          animate-glitch-overlay 
          mix-blend-color-dodge
        "></div>
      </div>

      {/* Terminal-like container */}
      <div className="
        w-full 
        max-w-xl 
        bg-[#0a0a0a] 
        border-2 
        border-red-600/50 
        rounded-xl 
        shadow-[0_0_40px_rgba(255,0,0,0.5)]
        overflow-hidden
        relative
        animate-terminal-flicker
        z-10
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
        ">
          <div className="flex items-center">
            <Code className="mr-2 text-red-500" size={16} />
            BREACH PROTOCOL: LEVEL 1
          </div>
          <div className="text-grey-300 animate-pulse">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-8 text-center">
          {showCongratulations ? (
            <div className="
              flex 
              flex-col 
              items-center 
              justify-center 
              space-y-6
            ">
              <div className="
                text-4xl 
                font-bold 
                text-red-500 
                uppercase 
                tracking-widest
                animate-glitch-text
                flex 
                items-center
              ">
                <Zap className="mr-4 text-yellow-500 animate-pulse" size={48} />
                Level 1 
                <Skull className="ml-4 text-white animate-bounce" size={48} />
              </div>
              
              <div className="
                text-xl 
                text-white 
                opacity-70 
                mb-6
                animate-subtle-glitch
                flex 
                items-center
              ">
                <ShieldAlert className="mr-4 text-red-500" size={32} />
                Breach Successful
                <AlertTriangle className="ml-4 text-red-500" size={32} />
              </div>
              
              <div className="
                text-sm 
                text-red-500 
                animate-flicker
              ">
                Accessing next security layer...
              </div>
            </div>
          ) : (
            <div className="w-full h-[500px] flex items-center justify-center">
              <video
                ref={videoRef}
                src="/lvl1.mp4"
                className="max-w-full max-h-full object-contain"
                playsInline
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}