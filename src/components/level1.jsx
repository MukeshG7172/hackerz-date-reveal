'use client';
import { useState, useEffect, useRef, ReactElement } from 'react'
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
        videoElement.play().catch(error => {
          console.error('Video play error:', error);
        });

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
    <>
      <div className="
          mt-[30px]
          fixed 
          top-4 
          left-0 
          right-0 
          flex 
          justify-center 
          z-50
          px-4 
          font-grotesk
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
            Firewall 1 has been breached
          </span>
        </div>
      </div>
      <div className="
      min-h-screen 
      font-grotesk
      bg-black 
      text-white 
      flex 
      items-center 
      justify-center 
      overflow-hidden 
      relative
      p-4
    ">
        <MatrixNumberRain
          numColumns={50}
          speed={30}
          density={0.8}
        />

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
              <Code className="mr-2 text-red-500" size={window.innerWidth < 640 ? 16 : 22} />
              BREACH PROTOCOL: LEVEL 1
            </div>
            <div className="text-grey-300 animate-pulse">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="p-4 sm:p-8 text-center">
            {showCongratulations ? (
              <div className="
              flex 
              flex-col 
              items-center 
              justify-center 
              space-y-6
            ">
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
                  <Zap className="text-yellow-500 animate-pulse" size={window.innerWidth < 640 ? 32 : 34} />
                  Level 1
                  <Skull className="text-white animate-bounce" size={window.innerWidth < 640 ? 32 : 34} />
                </div>

                <div className="
                text-base 
                sm:text-xl 
                text-white 
                opacity-70 
                mb-6
                animate-subtle-glitch
                flex 
                items-center
                flex-wrap
                justify-center
                gap-4
              ">
                  <ShieldAlert className="text-red-500" size={24} />
                  Breach Successful
                  <AlertTriangle className="text-red-500" size={24} />
                </div>

                <div className="
                text-xs 
                sm:text-sm 
                text-red-500 
                animate-flicker
              ">
                  Accessing next security layer...
                </div>
              </div>
            ) : (
              <div className="
              w-full 
              h-[200px] 
              sm:h-[300px] 
              flex 
              items-center 
              justify-center
            ">
                <video
                  ref={videoRef}
                  src="/lvl1.mp4"
                  className="
                  max-w-full 
                  max-h-full 
                  object-contain 
                  rounded-lg 
                  shadow-lg
                "
                  playsInline
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="
          mt-[30px]
          font-grotesk
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
        mt-[550px]
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
            Firewall 2 is loading...
          </span>
        </div>
      </div>
    </>
  )
}