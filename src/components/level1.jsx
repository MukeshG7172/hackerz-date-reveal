// src/components/Level1.jsx
'use client';
import { useState, useEffect, useRef } from 'react'

export default function Level1({ onVideoEnd }) {
  const [showCongratulations, setShowCongratulations] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Set a timeout to hide congratulations message after 3 seconds
    const timer = setTimeout(() => {
      setShowCongratulations(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only attempt to play video when congratulations message is hidden
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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-green-100">
      {showCongratulations ? (
        <h1 className="text-4xl mb-4 text-center px-4">
          Congratulations for finishing Level 1!
        </h1>
      ) : (
        <video
          ref={videoRef}
          src="/lvl1.mp4"
          className="max-w-full h-full object-contain"
          playsInline
        />
      )}
    </div>
  )
}