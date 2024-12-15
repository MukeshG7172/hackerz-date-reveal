'use client';
import React, { useState, useEffect, useCallback } from 'react';

const MatrixNumberRain = ({ 
  numColumns = 50,  // Number of columns of falling numbers
  speed = 30,       // Speed of falling numbers (lower is faster)
  density = 0.8     // Density of number generation
}) => {
  const [columns, setColumns] = useState([]);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10).toString();
  };

  const generateColumn = useCallback(() => {
    return {
      numbers: [],
      startY: -50,
      speed: Math.random() * speed + 10
    };
  }, [speed]);

  useEffect(() => {
    // Initialize columns
    const initialColumns = Array(numColumns).fill().map(() => generateColumn());
    setColumns(initialColumns);

    // Animation loop
    const animationLoop = requestAnimationFrame(updateColumns);

    return () => cancelAnimationFrame(animationLoop);
  }, [numColumns, generateColumn]);

  const updateColumns = useCallback(() => {
    setColumns(prevColumns => 
      prevColumns.map(column => {
        // Move column down
        column.startY += column.speed;

        // Randomly add new numbers
        if (Math.random() < density) {
          column.numbers.push({
            value: generateRandomNumber(),
            opacity: 1,
            fallDistance: 0
          });
        }

        // Update existing numbers
        column.numbers = column.numbers
          .map(num => ({
            ...num,
            fallDistance: num.fallDistance + column.speed,
            opacity: Math.max(0, 1 - (num.fallDistance / window.innerHeight))
          }))
          .filter(num => num.opacity > 0);

        // Reset column if it's completely fallen
        if (column.startY > window.innerHeight) {
          column = generateColumn();
        }

        return column;
      })
    );

    // Continue animation
    requestAnimationFrame(updateColumns);
  }, [density, generateColumn]);

  return (
    <div 
      className="
        fixed 
        inset-0 
        pointer-events-none 
        overflow-hidden 
        z-0
        bg-black
      "
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className="
            absolute 
            top-0 
            text-center 
            select-none
            font-mono
            text-xs
          "
          style={{
            left: `${(index / numColumns) * 100}%`,
            transform: 'translateX(-50%)'
          }}
        >
          {column.numbers.map((num, numIndex) => (
            <div
              key={numIndex}
              className="absolute"
              style={{
                top: `${column.startY + num.fallDistance}px`,
                opacity: num.opacity,
                color: `rgba(255, 51, 51, ${num.opacity})`,  // Hacker red with opacity
                textShadow: `0 0 5px rgba(255, 51, 51, ${num.opacity * 0.5})`
              }}
            >
              {num.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixNumberRain;