import React, { useState } from 'react';
import { ShieldAlert, Skull } from 'lucide-react';

const BreachButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        relative
        px-8
        py-4
        text-white
        font-bold
        uppercase
        tracking-wider
        rounded-xl
        overflow-hidden
        group
        transition-all
        duration-300
        ease-in-out
        transform
        hover:scale-105
        focus:outline-none
        border-2
        border-red-600
        bg-transparent
      "
    >
      {/* Animated Glow Background */}
      <div 
        className="
          absolute
          inset-0
          bg-red-600
          opacity-0
          group-hover:opacity-20
          transition-opacity
          duration-300
          ease-in-out
          animate-pulse
        "
      />

      {/* Button Content */}
      <div className="relative z-10 flex font-grotesk items-center justify-center">
        <ShieldAlert 
          className={`
            mr-3
            transition-transform
            duration-300
            ${isHovered ? 'rotate-12 text-red-400' : 'text-white'}
          `} 
          size={24} 
        />
        Reveal Date
        <Skull 
          className={`
            ml-3
            transition-transform
            duration-300
            ${isHovered ? '-rotate-12 text-red-400' : 'text-white'}
          `} 
          size={24} 
        />
      </div>

      {/* Glitch Effect Border */}
      <div 
        className="
          absolute
          inset-0
          border-2
          border-red-600
          opacity-0
          group-hover:opacity-100
          pointer-events-none
          animate-glitch-border
          transition-opacity
          duration-300
          rounded-xl
        "
      />
    </button>
  );
};

export default BreachButton;