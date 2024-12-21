'use client';
import { useState } from 'react';
import { ShieldAlert, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';
import MatrixNumberRain from './MatrixNumberRain';

export default function FeedbackForm() {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative">
        <MatrixNumberRain
          numColumns={30}
          speed={30}
          density={0.8}
        />
        <div className="absolute inset-0 pointer-events-none bg-grid-white/[0.05] opacity-20">
          <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge"></div>
        </div>
        <div className="w-full max-w-xl text-center space-y-6 bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] p-8 animate-terminal-flicker">
          <CheckCircle className="w-16 h-16 md:w-24 md:h-24 text-red-500 mx-auto animate-bounce" />
          <div className="text-2xl md:text-4xl font-bold text-red-500 uppercase tracking-widest animate-glitch-text">
            Transmission Complete
          </div>
          <div className="text-base md:text-xl text-white/70 flex items-center justify-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            Feedback successfully encrypted and transmitted
            <AlertTriangle className="text-red-500" size={20} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative">
      <div className="fixed top-4 left-0 right-0 flex justify-center z-150 px-4 font-grotesk">
        <div className="bg-red-900/80 text-white px-4 py-2 rounded-full text-sm sm:text-base md:text-xl uppercase tracking-wider animate-pulse flex items-center">
          <ShieldAlert className="mr-2 flex-shrink-0 h-4 w-4 md:h-5 md:w-5" />
          <span className="whitespace-nowrap">Secure Feedback Protocol Initiated</span>
        </div>
      </div>

      <MatrixNumberRain
        numColumns={30}
        speed={30}
        density={0.8}
      />
      
      <div className="absolute inset-0 pointer-events-none bg-grid-white/[0.05] opacity-20">
        <div className="absolute inset-0 bg-red-500/10 animate-glitch-overlay mix-blend-color-dodge"></div>
      </div>

      <div className="w-full max-w-xl bg-[#0a0a0a] border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] overflow-hidden relative animate-terminal-flicker z-150">
        <div className="bg-red-900/30 text-white p-2 flex items-center justify-between border-b border-red-600/30">
          <div className="flex items-center">
            <MessageSquare className="mr-2 text-red-500 h-4 w-4 md:h-5 md:w-5" />
            FEEDBACK PROTOCOL v1.0
          </div>
          <div className="text-grey-300 animate-pulse">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <div className="p-4 md:p-8">
          <h1 className="text-xl md:text-3xl font-bold text-red-500 mb-6 text-center uppercase tracking-wider animate-subtle-glitch">
            Submit Intelligence Report
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your encrypted message..."
                className="w-full h-32 bg-black/50 border border-red-600/30 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600/80 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
                  Encrypting...
                </>
              ) : (
                <>
                  <ShieldAlert className="h-5 w-5" />
                  Transmit Feedback
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}