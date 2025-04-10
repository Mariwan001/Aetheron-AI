import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import image1 from '../../public/assets/images/image-1.png';
import { CustomTextGenerateEffect } from '../ui/Text-Generate-Effect';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const sectionRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const headingContainerRef = useRef(null);
  const descriptionContainerRef = useRef(null);

  // Reserve space for the h1 before animation starts
  // Pre-render the text with zero opacity to establish height
  const headingText = "Aetheron merges human intuition with machine precision, intelligence, redefined.";

  // Track section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setIsVisible(true);
          // Start the animation sequence
          setShowHeading(true);
          // Description will be shown when heading animation completes
          setShowDescription(false);
        } else {
          // When section leaves viewport, reset everything
          setIsVisible(false);
          setShowHeading(false);
          setShowDescription(false);
        }
      },
      {
        root: null,
        rootMargin: "-50px 0px",
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const animateShine = (element) => {
      if (!element) return;
      let position = 0;
      const intervalId = setInterval(() => {
        position += 2;
        if (position > 200) position = 0;
        element.style.backgroundPosition = `${position}% 50%`;
      }, 50);
      return () => clearInterval(intervalId);
    };

    const cleanup1 = animateShine(textRef1.current);
    const cleanup2 = animateShine(textRef2.current);

    return () => {
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
    };
  }, []);

  // Function to handle when heading animation completes
  const onHeadingComplete = () => {
    if (isVisible) {
      setShowDescription(true);
    }
  };

  // Capture the dimensions of the heading container for consistent layout
  useEffect(() => {
    // Set minimum height for heading container as soon as possible
    if (headingContainerRef.current) {
      // Set initial height based on content
      const setContainerHeight = () => {
        const container = headingContainerRef.current;
        if (!container) return;
        
        // Get the computed line height and font size
        const computedStyle = window.getComputedStyle(container);
        const fontSize = parseFloat(computedStyle.fontSize);
        const lineHeight = parseFloat(computedStyle.lineHeight) || fontSize * 1.2;
        
        // Calculate approximate height based on text length and container width
        const words = headingText.split(' ').length;
        const containerWidth = container.offsetWidth;
        const averageCharsPerLine = containerWidth / (fontSize * 0.6);
        const estimatedLines = Math.ceil((headingText.length / averageCharsPerLine) * 1.2);
        
        // Set minimum height with extra padding for safety
        const minHeight = Math.max(estimatedLines * lineHeight, fontSize * 3);
        container.style.minHeight = `${minHeight}px`;
      };
      
      // Initial setup
      setContainerHeight();
      
      // Update on resize
      window.addEventListener('resize', setContainerHeight);
      return () => window.removeEventListener('resize', setContainerHeight);
    }
  }, [headingText]);

  // Handle description container height management
  useEffect(() => {
    if (descriptionContainerRef.current) {
      // Set a fixed height for mobile view
      const handleResize = () => {
        const container = descriptionContainerRef.current;
        if (!container) return;
        
        // Specific handling for mobile and tablet
        if (window.innerWidth < 768) {
          container.style.minHeight = '4rem';
        }
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const fadeIn = (delay) => ({
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: delay
      }
    }
  });

  // Create the description text component once to be reused
  const DescriptionTextContent = () => (
    <span className="inline-flex items-baseline space-x-1">
      <span
        ref={textRef2}
        className="relative inline-block px-1 py-0 rounded-md bg-gradient-to-r from-gray-900 via-zinc-500 to-gray-800 border border-zinc-400 transition-all duration-300"
        style={{
          backgroundSize: "200% 100%",
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.5), 0 0 12px rgba(150, 150, 150, 0.3)",
        }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-zinc-100 to-gray-300 font-semibold">
          Aetheron
        </span>
      </span>
      <CustomTextGenerateEffect
        words="Bridges the human mind and artificial intelligence, creating seamless, intuitive interaction that feels natural, responsive, and deeply connected."
        className="inline"
        pauseAnimation={!showDescription}
      />
    </span>
  );

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex justify-center items-center px-4 py-12 pt-32 sm:pt-24 md:pt-20"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 max-w-6xl w-full">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-1">
          <div 
            ref={headingContainerRef} 
            className="mb-2 sm:mb-4 md:mb-6 relative min-h-[12rem] sm:min-h-[14rem] md:min-h-0"
          >
            {/* Invisible placeholder text to reserve space */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight opacity-0 select-none">
              {headingText}
            </h1>
            
            {/* Actual animated text with absolute positioning */}
            {showHeading && (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight absolute top-0 left-0 right-0">
                <CustomTextGenerateEffect
                  ref={textRef1}
                  words={headingText}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight"
                  onComplete={onHeadingComplete}
                  pauseAnimation={!isVisible}
                />
              </h1>
            )}
          </div>
          
          {/* Description text with increased spacing on desktop/laptop */}
          <div 
            ref={descriptionContainerRef}
            className="mt-0 md:mt-12 hidden md:block min-h-[4rem]"
          > 
            {/* Hidden on mobile, shown on desktop */}
            {showDescription && (
              <motion.div 
                className="text-lg sm:text-xl mt-4 leading-relaxed"
                initial="hidden"
                animate="visible"
                variants={fadeIn(0.2)}
              >
                <DescriptionTextContent />
              </motion.div>
            )}
          </div>
        </div>

        {/* Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center border-2 rounded-md shadow-md border-neutral-400/35 order-2 mt-4 sm:mt-6 md:mt-0"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn(0.3)}
        >
          <img
            src={image1}
            alt="Aetheron Visualization"
            className="object-contain max-h-[280px] sm:max-h-[320px] md:max-h-[400px] w-full md:w-auto"
          />
        </motion.div>

        
        <motion.div
          className="w-full block md:hidden order-3 text-center mt-2 sm:mt-3 min-h-[4rem]"
          initial="hidden"
          animate={showDescription ? "visible" : "hidden"}
          variants={fadeIn(0.4)}
        >
          {showDescription && (
            <div className="text-lg sm:text-xl leading-relaxed">
              <DescriptionTextContent />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default About;