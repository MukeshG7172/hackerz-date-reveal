'use client';
import React, { useState } from 'react';
import { Download, Share2 } from 'lucide-react';

const BadgePage = () => {
  const [name, setName] = useState('');
  const [badgeGenerated, setBadgeGenerated] = useState(false);

  const generateBadge = () => {
    if (name.trim()) {
      setBadgeGenerated(true);
      setTimeout(() => {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 600;

        // Create a new image object for the logo
        const logo = new Image();
        logo.src = '/logo1.png';
        
        logo.onload = () => {
          // Set background
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Add red glow effect
          ctx.shadowColor = '#ff0000';
          ctx.shadowBlur = 20;

          // Add border
          ctx.strokeStyle = '#ff0000';
          ctx.lineWidth = 4;
          ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

          // Draw logo at the top center
          const logoSize = 150;
          ctx.drawImage(
            logo,
            (canvas.width - logoSize) / 2,
            40,
            logoSize,
            logoSize
          );

          // Reset shadow for text
          ctx.shadowBlur = 10;

          // Add title - moved down to accommodate logo
          ctx.font = 'bold 48px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText('SYSTEM BREACHED', canvas.width / 2, 240);

          // Add congratulatory text
          ctx.font = '32px sans-serif';
          ctx.fillText('This certifies that', canvas.width / 2, 320);

          // Add name
          ctx.font = 'bold 64px sans-serif';
          ctx.fillStyle = '#ff0000';
          ctx.fillText(name, canvas.width / 2, 420);

          // Add completion text
          ctx.font = '32px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText('has successfully breached the system', canvas.width / 2, 520);
        };
      }, 0);
    }
  };

  const handleShare = async () => {
    try {
      const canvas = document.querySelector('canvas');
      const blob = await new Promise(resolve => canvas.toBlob(resolve));
      const data = {
        files: [
          new File([blob], 'hacker-badge.png', {
            type: blob.type,
          }),
        ],
        title: 'Hacker Badge',
        text: `${name}'s Hacker Badge`,
      };

      if (navigator.canShare && navigator.canShare(data)) {
        await navigator.share(data);
      } else {
        alert('Sharing is not supported on this device/browser');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      alert('Failed to share the badge');
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'hacker-badge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-900 border-2 border-red-600 rounded-lg p-6">
        <h1 className="text-center text-3xl text-red-500 mb-6">Generate Your Hacker Badge</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-red-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button 
              onClick={generateBadge}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name.trim()}
            >
              Generate Badge
            </button>
          </div>

          {badgeGenerated && (
            <div className="space-y-4">
              <canvas className="w-full h-auto border-2 border-red-600 rounded-lg" />
              
              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <Download className="mr-2" size={20} />
                  Download
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <Share2 className="mr-2" size={20} />
                  Share
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgePage;