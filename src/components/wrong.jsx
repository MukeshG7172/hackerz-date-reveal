'use client';
import React, { useState, useEffect } from 'react';
import { Skull, AlertTriangle, RefreshCw } from 'lucide-react';
import MatrixNumberRain from './MatrixNumberRain';

export default function Wrong({ onRetry }) {
  const [stage, setStage] = useState('message');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (stage === 'message') {
      const loadingTimeout = setTimeout(() => {
        setStage('loading');
      });

      return () => clearTimeout(loadingTimeout);
    }

    if (stage === 'loading') {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            setStage('activated');
            return 100;
          }
          return prevProgress + 3;
        });
      }, 2);

      return () => clearInterval(timer);
    }
  }, [stage]);

  return (
    <div className="
      fixed 
      inset-0 
      flex 
      flex-col 
      items-center 
      justify-center 
      bg-black 
      text-white 
      font-grotesk
      overflow-hidden 
      relative
      p-4
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
          <div className="flex items-center text-red-500">
            <AlertTriangle className="mr-2" size={16} />
            BREACH FAILURE
          </div>
          <div className="text-grey-300 animate-pulse">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-8 text-center">
          <div className="
            flex 
            flex-col 
            items-center 
            justify-center 
            space-y-6
          ">
            {(stage === 'message' || stage === 'loading') && (
              <div className="
                text-2xl 
                sm:text-4xl 
                font-bold 
                text-red-500 
                uppercase 
                tracking-widest
                animate-glitch-text
                flex 
                items-center
                flex-wrap
                justify-center
                gap-4
              ">
                <Skull className="text-white animate-bounce" size={window.innerWidth < 640 ? 32 : 48} />
                You have Failed to Breach the Firewall by providing a wrong answer. The Firewall Defense will be Activated Soon...
                <AlertTriangle className="text-red-500" size={window.innerWidth < 640 ? 32 : 48}  />
              </div>
            )}

            {stage === 'loading' && (
              <div className="w-full px-6">
                <div className="
                  w-full 
                  h-2 
                  bg-red-900/30 
                  rounded-full 
                  overflow-hidden
                ">
                  <div 
                    className="
                      h-full 
                      bg-red-600 
                      transition-all 
                      duration-100 
                      ease-linear
                    "
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="
                  text-base 
                  sm:text-xl 
                  text-white 
                  opacity-70 
                ">
                  Firewall Defense Loading...
                </div>
              </div>
            )}

            {stage === 'activated' && (
              <>
                <div className="
                  text-base 
                  sm:text-xl 
                  text-white 
                  opacity-70 
                  animate-subtle-glitch
                ">
                  Firewall Defense Activated
                </div>
                
                <button 
                  onClick={onRetry}
                  className="
                    flex 
                    items-center 
                    gap-1
                    bg-red-600 
                    text-white 
                    px-6 
                    py-3 
                    rounded-lg 
                    hover:bg-red-500
                    transition-all
                    duration-300
                    animate-pulse
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500
                    focus:ring-opacity-50
                  "
                >
                  <RefreshCw className="mr-2" size={window.innerWidth < 640 ? 16 : 24}  />
                  Breach Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}