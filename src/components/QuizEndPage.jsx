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
  const router = useRouter();
  const videoRef = useRef(null);    

  const fullInstructionText = "You have successfully bypassed all the three firewalls. You can now access the Hackerz system";

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
      const typingInterval = setInterval(() => {
        if (index < fullInstructionText.length) {
          setInstructionText(fullInstructionText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          setShowButton(true);
        }
      }, 10);
  
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
        <MatrixNumberRain
          numColumns={50}
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
        
        <div className="w-full max-w-xl bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-10">
          <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
            <div className="flex items-center">
              <Code className="mr-2 text-red-500" size={16} />
              SYSTEM BREACH DETECTED
            </div>
          </div>
          
          <div className="p-8 text-center">
            <div className="text-2xl text-red-500 mb-6 animate-pulse">
              Finishing Breach Protocol...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'start-text') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
        <MatrixNumberRain
          numColumns={50}
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
        
        <div className="w-full mt-[150px] max-w-xl bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-10">
          <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
            <div className="flex items-center">
              <Code className="mr-2 text-red-500" size={16} />
              SYSTEM BREACH DETECTED
            </div>
          </div>
          
          <div className="p-8 text-center">
            <div className="text-6xl font-bold mb-6 text-red-500 uppercase tracking-widest animate-glitch-text flex items-center justify-center">
              <ShieldAlert className="mr-4 animate-pulse" size={48} />
              BREACHED
              <Skull className="ml-4 text-white animate-bounce" size={48} />
              <AlertTriangle className="ml-4 animate-pulse" size={48} />
            </div>
            
            <div className="text-2xl text-white font-grotesk opacity-70 mb-6 animate-subtle-glitch">
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
        <video
          ref={videoRef}
          src="/ending.mp4"
          autoPlay
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
    );
  }
}