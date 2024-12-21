'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import MatrixNumberRain from '@/components/MatrixNumberRain';

export default function CommentsPage() {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [numColumns, setNumColumns] = useState(50);

  useEffect(() => {
    const updateColumnCount = () => {
      setNumColumns(window.innerWidth < 768 ? 20 : 50);
    };

    updateColumnCount();

    window.addEventListener('resize', updateColumnCount);

    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

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

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <MatrixNumberRain
          numColumns={numColumns}
          speed={30}
          density={0.8}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {isSubmitted ? (
          <div className="w-full max-w-xl text-center space-y-6 animate-fade-in">
            <ShieldCheck className="w-24 h-24 text-green-500 mx-auto animate-bounce" />
            <h1 className="text-4xl font-bold text-green-500">Thank You!</h1>
            <p className="text-xl text-gray-300">
              Your feedback has been successfully submitted.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-xl bg-[#0a0a0a]/90 backdrop-blur-sm border-2 border-red-600/50 rounded-xl shadow-[0_0_40px_rgba(255,0,0,0.5)] p-8">
            <h1 className="text-3xl font-grotesk text-red-500 mb-6 text-center">
              Help us debug and optimize future editions by sharing your insights.
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full h-32 bg-gray-900 border border-red-600/30 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-grotesk py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}