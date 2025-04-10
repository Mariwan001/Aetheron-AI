import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Stunning animated FAQ item with advanced transitions and shimmering text
const FAQItem = ({ question, answer, index, activeIndex, setActiveIndex }) => {
  const isOpen = index === activeIndex;
  
  const toggleAccordion = () => {
    setActiveIndex(isOpen ? null : index);
  };

  // Text animation variants for word-by-word animation
  const textVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      }
    }
  };

  // Split answer into words for staggered animation
  const words = answer.split(' ');

  // Word animation variants
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      filter: "blur(3px)",
      transition: {
        duration: 0.6,
        ease: "easeIn",
      }
    }
  };

  return (
    <div 
      className="overflow-hidden backdrop-blur-sm"
      style={{
        borderRadius: '0.75rem',
        marginBottom: '0.75rem',
        background: 'linear-gradient(145deg, #111111, #1c1c1c)',
        boxShadow: isOpen 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)' 
          : '0 4px 15px -3px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <button
        className="w-full py-6 px-6 flex justify-between items-center text-left group"
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 
          className="text-xl font-medium group-hover:text-blue-400 transition-all duration-300 ease-in-out"
          style={{ 
            color: isOpen ? '#60a5fa' : '#f1f5f9',
            textShadow: isOpen ? '0 0 8px rgba(96, 165, 250, 0.3)' : 'none'
          }}
        >
          {question}
        </h3>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-shrink-0 ml-4 rounded-full p-1 ${isOpen ? 'bg-blue-500 bg-opacity-20' : 'bg-opacity-10'}`}
          style={{
            background: isOpen ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'
          }}
        >
          <ChevronDown 
            className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-blue-400' : 'text-gray-400'}`} 
          />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { height: 0, opacity: 0 },
              visible: { 
                height: 'auto', 
                opacity: 1,
                transition: { 
                  height: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
              },
              exit: { 
                height: 0, 
                opacity: 0,
                transition: { 
                  height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 leading-relaxed">
              <motion.div
                variants={textVariants}
                className="space-x-1"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.25rem'
                }}
              >
                {words.map((word, i) => (
                  <motion.span
                    key={`${index}-word-${i}`}
                    variants={wordVariants}
                    style={{ 
                      display: 'inline-block',
                      animation: 'shimmering-text 8s infinite linear',
                      animationDelay: `${i * 0.03}s`,
                      background: 'linear-gradient(270deg, #000000, #27272a, #71717a, #e4e4e7, #ffffff, #e4e4e7, #71717a, #27272a, #000000)',
                      backgroundSize: '1000% 100%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      textShadow: '0 1px 0 rgba(0,0,0,0.1)',
                      fontWeight: i % 3 === 0 ? '600' : '400', // Random bold words for emphasis
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main FAQ component with stunning design
const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const [isVisible, setIsVisible] = useState(false);
  
  // Advanced visibility handling with smooth transitions
  useEffect(() => {
    let timer;
    if (isInView) {
      timer = setTimeout(() => setIsVisible(true), 100);
    } else {
      const exitTimer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(exitTimer);
    }
    return () => clearTimeout(timer);
  }, [isInView]);

  // Add the keyframe animation for the shimmering text effect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmering-text {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Enhanced animation variants
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      filter: "blur(20px)",
      y: 50 
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)",
      y: -50,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8,
      rotateX: -45 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.8,
      rotateX: 45,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  // Four questions and answers
  const faqItems = [
    {
      question: "What is Aetheron?",
      answer: "Aetheron is a next-generation AI agent designed to mirror human intelligence. It blends neural-inspired systems with adaptive algorithms to create natural, intuitive interactions. Unlike basic assistants, Aetheron engages with context, emotion, and awareness."
    },
    {
      question: "Why is Aetheron different?",
      answer: "Aetheron stands apart by combining the depth of cognitive science with the precision of machine learning. It doesn't just follow instructions, it understands intention. With its evolving intelligence, Aetheron adapts to your behavior, language, and preferences."
    },
    {
      question: "Can it really learn?",
      answer: "Yes. Aetheron learns continuously through real-time interactions. It refines its knowledge, adapts to new patterns, and evolves its responses without needing to be reprogrammed. This allows it to grow more personalized and intelligent over time."
    },
    {
      question: "Is it secure?",
      answer: "Security is foundational to Aetheron. All data is encrypted, anonymized, and stored with zero-trust protocols. Aetheron respects user privacy at every level, ensuring your information stays protected, confidential."
    }
  ];

  return (
    <div className="min-h-screen flex justify-center items-center py-40">
      <AnimatePresence>
        {(
          <motion.section
            ref={sectionRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sectionVariants}
            className="inline-block rounded-xl relative"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
              backgroundSize: '400% 400%',
              padding: '4rem 4rem 2rem', // Reduced bottom padding
              marginTop: '8rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 5px 20px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -4px 0 rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              width: '800px',
              position: 'relative',
              zIndex: 10
            }}
          >
            <motion.div 
              variants={titleVariants}
              className="absolute w-full text-center"
              style={{
                top: '-9rem',
                left: 0,
                transform: 'translateY(-50%)',
              }}
            >
              <h2 
                className="text-5xl font-bold inline-block px-8 py-2 rounded-full"
                style={{
                  background: 'none',
                  color: '#111827',
                  boxShadow: 'none',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                FAQs
              </h2>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <div className="text-center mb-8"> {/* Reduced margin bottom */}
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  }}
                  className="inline-block px-4 py-1 rounded-full mb-4 font-medium text-sm" // Reduced margin
                  style={{
                    background: 'linear-gradient(145deg, #0f0f0f, #1a1a1a)',
                    color: '#60a5fa',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.06)'
                  }}
                >
                  Knowledge Base
                </motion.div>
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  }}
                  className="text-5xl font-bold mb-4" // Reduced margin
                  style={{
                    color: '#111827',
                    textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  Frequently Asked Questions
                </motion.h1>
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  }}
                  className="text-xl"
                  style={{
                    color: '#4b5563',
                    lineHeight: 1.6
                  }}
                >
                  Find answers to the most common questions about Aetheron
                </motion.p>
              </div>
              
              <div 
                className="space-y-3"
                style={{
                  perspective: '1000px',
                  maxWidth: '700px',
                }}
              >
                <div className="relative" style={{ minHeight: '520px' }}>
                  <div style={{ maxHeight: '520px', overflowY: 'auto', paddingRight: '10px' }}>
                    {faqItems.map((item, index) => (
                      <motion.div
                        key={`faq-item-${index}`}
                        initial="hidden"
                        animate={isVisible ? "visible" : "exit"}
                        exit="exit"
                        variants={{
                          hidden: { 
                            opacity: 0, 
                            y: 40, 
                            rotateX: -15,
                            filter: "blur(12px)" 
                          },
                          visible: { 
                            opacity: 1, 
                            y: 0, 
                            rotateX: 0,
                            filter: "blur(0px)",
                            transition: { 
                              type: "spring",
                              stiffness: 120,
                              damping: 12,
                              delay: 0.5 + (index * 0.15)
                            }
                          },
                          exit: {
                            opacity: 0,
                            y: -40,
                            rotateX: 15,
                            filter: "blur(12px)",
                            transition: {
                              type: "spring",
                              stiffness: 150,
                              damping: 15
                            }
                          }
                        }}
                      >
                        <FAQItem 
                          index={index}
                          question={item.question} 
                          answer={item.answer}
                          activeIndex={activeIndex}
                          setActiveIndex={setActiveIndex}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Bottom spacing reduced from 2rem to 0 */}
              <div style={{ height: 0 }}></div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Faqs;