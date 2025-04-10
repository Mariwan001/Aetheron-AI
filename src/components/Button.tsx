import React, { useState } from 'react';

const Button = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="relative">
      {/* Button Container with Shadow Effects */}
      <button
        className={`relative overflow-hidden px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 transform ${
          isPressed ? 'scale-95' : isHovered ? 'scale-105' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {/* Shadow Effect */}
        <div className={`absolute inset-0 rounded-lg bg-orange-700 shadow-lg transform ${
          isPressed ? 'translate-y-1' : 'translate-y-2'
        } transition-transform duration-200`}></div>

        {/* Button Background with Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg transform transition-all duration-300 ${
          isPressed ? 'translate-y-1' : 'translate-y-0'
        }`}>
          {/* Shimmer Effect */}
          <div className={`absolute -inset-full top-0 h-full w-1/2 z-5 block transform ${
            isHovered ? 'translate-x-full' : '-translate-x-full'
          } transition-all duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent`}></div>
        </div>

        {/* Button Text */}
        <div className={`relative z-10 text-white flex items-center justify-center gap-2 transform transition-transform duration-200 ${
          isPressed ? 'translate-y-1' : 'translate-y-0'
        }`}>
          <span>Explore Further!</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Button;