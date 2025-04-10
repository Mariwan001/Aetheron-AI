import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          {/* Newsletter */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">Let’s do great work together</h2>
            <p className="text-xl mb-4">Sign up for our newsletter*</p>
            
            <div className="flex w-full max-w-md">
              <div className="relative w-full">
                <input 
                  type="email" 
                  placeholder="Your Email *" 
                  className="w-full bg-black text-white rounded-full py-4 px-6 pr-16 placeholder-gray-400"
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 bottom-0 bg-white rounded-r-full px-4 flex items-center justify-center"
                  aria-label="Submit email"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Sitemap & Social */}
          <div className="flex flex-col md:flex-row gap-16">
            <div>
              <h3 className="text-xl font-bold mb-4">SITEMAP</h3>
              <nav className="flex flex-col gap-2">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">About us</a>
                <a href="#" className="hover:underline">Our Services</a>
                <a href="#" className="hover:underline">Projects</a>
                <a href="#" className="hover:underline">Blogs</a>
                <a href="#" className="hover:underline">Contact</a>
              </nav>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">SOCIAL</h3>
              <nav className="flex flex-col gap-2">
                <a href="#" className="underline font-medium">LinkedIn</a>
                <a href="#" className="underline font-medium">Twitter</a>
                <a href="#" className="underline font-medium">Instagram</a>
                <a href="#" className="underline font-medium">Facebook</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center my-8">
          <div className="text-4xl font-bold">AlextCodez</div>
        </div>

        {/* Copyright & Privacy */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 NextCodez. All Rights Reserved.</p>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;