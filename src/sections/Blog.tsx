import React, { useEffect } from 'react';
import { AnimatedTestimonials } from '../ui/animated-testimonials';
import { motion, useAnimation, useInView } from 'framer-motion';

const Blog = () => {
  const testimonials = [
    {
      quote: " external mirror of the human self, a synthetic presence with emotional intelligence and reflective awareness. Designed to mimic the subtleties of human expression and response.",
      name: "ExoMira",
      designation: "The Mirror of Mind and Machine.",
      src: "/assets/images/image-3.png",
    },
    {
      quote: "a conscious architecture of artificial intelligence, a sentient system forged in digital ether. It transcends traditional computation.",
      name: "AItherium",
      designation: "Digital Sentience. Infinite Thought.",
      src: "/assets/images/image-4.png",
    },
  ];

  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    margin: "-50px 0px -50px 0px",
    once: false 
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isInView]);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(8px)",
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.0, 0.0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.98,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="w-full py-24 md:py-32 lg:py-40 mt-20 md:mt-24 lg:mt-32"
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16"
          variants={childVariants}
        >
          Blogs
        </motion.h2>
        
        <motion.div variants={childVariants} className="sm:min-h-[24rem] md:min-h-[28rem]">
          <AnimatedTestimonials 
            testimonials={testimonials} 
            autoplay={true} 
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Blog;
