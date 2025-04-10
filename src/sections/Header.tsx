import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { RandomizedTextEffect } from '../ui/text-randomized';

const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Enhanced scroll effect tracking
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress as percentage (0-100)
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / 100, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Control menu state and body scroll
  const toggleMenu = () => {
    const nextMenuState = !isMenuOpen;
    setIsMenuOpen(nextMenuState);
    
    // Toggle body scroll lock but preserve smooth scroll behavior
    if (nextMenuState) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  };

  // Dynamic styles based on scroll position
  const headerBackground = scrollProgress > 0
    ? `bg-white/80 backdrop-blur-md`
    : 'bg-transparent';
  
  const headerShadow = scrollProgress > 0
    ? 'shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border-b border-white/20'
    : '';
  
  const logoColor = isMenuOpen
    ? 'text-white'
    : scrollProgress > 0 ? 'text-gray-800' : 'text-gray-900';

  // Menu items with their text content
  const menuItems = [
    { id: 'home', text: 'Home', href: '#' },
    { id: 'about', text: 'About', href: '#' },
    { id: 'explanation', text: 'Explanation', href: '#' },
    { id: 'blog', text: 'Blog', href: '#' },
    { id: 'faq', text: 'FAQ', href: '#' }
  ];

  return (
    <>
      {/* Fixed Header - Always visible */}
      <section 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBackground} ${headerShadow}`}
        style={{
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
          transform: scrollProgress > 0 ? 'translateY(0)' : 'translateY(0)',
          boxShadow: scrollProgress > 0 
            ? `0 10px 30px -10px rgba(31, 38, 135, ${0.2 + (scrollProgress * 0.3)})`
            : 'none',
        }}
      >
        <div className='container mx-auto'>
          <div className='flex items-center justify-between py-4 mx-3 md:mx-6 relative'>
            <h1 className={`text-4xl font-semibold transition-all duration-300 ${logoColor} font-departure`}>
              <RandomizedTextEffect text='Aetheron' />
            </h1>
            
            {/* Hamburger Menu Button */}
            <div className='relative z-50'>
              <button 
                onClick={toggleMenu}
                className={`flex flex-col justify-center items-center w-12 h-12 rounded-full transition-all duration-300 ${
                  isMenuOpen 
                    ? 'bg-white' 
                    : scrollProgress > 0 
                      ? 'bg-black/5 border-2 border-black/20 hover:bg-black/10' 
                      : 'border-2 border-black hover:bg-black/5'
                }`}
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'bg-black rotate-45 translate-y-1.5' : 'bg-black'}`}></span>
                <span className={`block w-6 h-0.5 my-1 transition-all duration-300 ${isMenuOpen ? 'bg-black opacity-0' : 'bg-black'}`}></span>
                <span className={`block w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'bg-black -rotate-45 -translate-y-1.5' : 'bg-black'}`}></span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Separate Menu Container */}
      <div className={`fixed inset-0 z-40 ${isMenuOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={toggleMenu}
        ></div>
        
        {/* Menu Panel */}
        <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-black text-white transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
          <div className="h-full flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
            <nav className="mb-8">
              <ul className='space-y-6'>
                {menuItems.map(item => (
                  <li 
                    key={item.id} 
                    className="transform transition-all duration-300 hover:translate-x-2"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <a 
                      href={item.href} 
                      className="text-3xl font-medium block py-2 border-b border-white/10 hover:border-white/50 transition-colors"
                    >
                      {hoveredItem === item.id ? (
                        <RandomizedTextEffect text={item.text} />
                      ) : (
                        item.text
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-auto">
              <Button></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;