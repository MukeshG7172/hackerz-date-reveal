'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizPage from './QuizPage';

export default function QuizStartPage({ initialQuestions }) {
  const [showStart, setShowStart] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStart(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showStart) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
        <div className="text-4xl font-bold mb-6">Start Breaching</div>
        <video 
          src="/opening.mp4" 
          autoPlay 
          muted 
          playsInline 
          className="w-full max-w-4xl"
          onEnded={() => setShowStart(false)}
        />
      </div>
    );
  }

  return <QuizPage initialQuestions={initialQuestions} />;
}