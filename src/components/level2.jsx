'use client';
import { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Code, Skull, AlertTriangle, Zap, SkipForward } from 'lucide-react';
import MatrixNumberRain from './MatrixNumberRain';

export default function Level2({ onVideoEnd }) {
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
          console.log('Level 2 video explicitly ended');
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

  const handleSkip = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="mt-[30px] fixed top-4 left-0 right-0 flex justify-center z-40 px-4 font-grotesk">
        <div className="bg-red-900/80 text-white px-4 py-2 rounded-full text-sm sm:text-base md:text-xl uppercase tracking-wider animate-pulse flex items-center max-w-full overflow-hidden text-ellipsis">
          <ShieldAlert className="mr-2 flex-shrink-0" size={16} />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            Firewall 2 has been breached
          </span>
        </div>
      </div>

      {!showCongratulations && (
        <div className="fixed bottom-4 right-4 z-[100]">
          <div className="flex flex-col items-end gap-2">
            <div className="text-white text-xs sm:text-sm md:text-base bg-red-900/60 px-3 py-1 rounded-full">
              Click here to Instantly Advance to the Next Firewall
            </div>
            <button
              onClick={handleSkip}
              className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg text-sm sm:text-base uppercase tracking-wider flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50 cursor-pointer border-2 border-red-600 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-red-600/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10 font-bold">Skip</span>
              <SkipForward size={16} className="relative z-10" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen font-grotesk bg-black text-white flex items-center justify-center overflow-hidden relative p-4">
        <MatrixNumberRain
          numColumns={50}
          speed={30}
          density={0.8}
        />

        <div className="absolute inset-0 bg-grid-white/[0.05] opacity-20 overflow-hidden">
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge"></div>
        </div>

        <div className="w-full max-w-xl bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-10">
          <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
            <div className="flex items-center">
              <Code className="mr-2 text-red-500" size={window.innerWidth < 640 ? 16 : 22} />
              BREACH PROTOCOL: LEVEL 2
            </div>
            <div className="text-grey-300 animate-pulse">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="p-4 sm:p-8 text-center relative">
            {showCongratulations ? (
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="text-2xl sm:text-4xl font-bold text-red-500 uppercase tracking-widest animate-glitch-text flex items-center flex-wrap justify-center gap-4">
                  <Zap className="text-yellow-500 animate-pulse" size={window.innerWidth < 640 ? 32 : 34} />
                  Level 2
                  <Skull className="text-white animate-bounce" size={window.innerWidth < 640 ? 32 : 34} />
                </div>

                <div className="text-base sm:text-xl text-white opacity-70 mb-6 animate-subtle-glitch flex items-center flex-wrap justify-center gap-4">
                  <ShieldAlert className="text-red-500" size={24} />
                  Breach Successful
                  <AlertTriangle className="text-red-500" size={24} />
                </div>

                <div className="text-xs sm:text-sm text-red-500 animate-flicker">
                  Accessing next security layer...
                </div>
              </div>
            ) : (
              <div className="w-full h-[200px] sm:h-[300px] flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/lvl1.mp4"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  playsInline
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-[30px] font-grotesk fixed top-4 left-0 right-0 flex justify-center z-40 px-4">
        <div className="mt-[570px] bg-red-900/80 text-white px-4 py-2 rounded-full text-sm sm:text-base md:text-xl uppercase tracking-wider animate-pulse flex items-center max-w-full overflow-hidden text-ellipsis">
          <ShieldAlert className="mr-2 flex-shrink-0" size={16} />
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            Firewall 3 is loading...
          </span>
        </div>
      </div>
    </div>
  );
}