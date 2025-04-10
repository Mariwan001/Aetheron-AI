"use client";

import React from 'react';
import { TextReveal } from "../ui/TextRevealUi";
import image2 from '../../public/assets/images/image-2.png';

const Explanation = ({
  title = "Explanation",
  content = "Aetheron is a groundbreaking AI agent born from the fusion of biological intelligence and computational power. Designed to think, adapt, and respond with human-like depth, it reimagines the relationship between technology and consciousness. With every interaction, Aetheron evolves, seamlessly merging machine precision with intuitive understanding."
}) => {
  return (
    <div className="w-full min-h-screen">
      {/* Title with added bottom spacing */}
      <div className="text-center py-6 mb-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black tracking-tight">
          {title}
        </h1>
      </div>
      
      {/* Content container */}
      <div className="relative">
        {/* Responsive layout with better handling at different breakpoints */}
        <div className="flex flex-col md:flex-row">
          {/* Text section - improved responsive behavior */}
          <div className="w-full md:w-1/2 md:pr-4 lg:pr-8 order-2 md:order-1 -mt-32 md:mt-0 md:pt-8 lg:pt-0">
            <div className="md:max-w-full">
              <TextReveal 
                className="[&_.text-black]:!text-black [&_span]:!text-black dark:[&_.text-white]:!text-black text-base md:text-sm lg:text-base"
              >
                {content}
              </TextReveal>
            </div>
          </div>
          
          {/* Image section - better positioning for different screen sizes */}
          <div className="w-full md:w-1/2 md:pl-2 lg:pl-4 order-1 md:order-2">
            <div className="md:sticky md:top-24 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square border-2 border-neutral-600/15 shadow-md rounded-md 
                after:content-[''] after:absolute after:inset-0 after:bg-transparent after:pb-64 after:block md:after:hidden">
                <img
                  src={image2}
                  alt="Explanation visual"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation;