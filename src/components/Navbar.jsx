import React, { useState } from 'react';
import img1 from '../assets/image1.jpeg';
import img2 from '../assets/image2.jpeg';

const Navbar = () => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-bg/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsToggled(!isToggled)}
          className="w-10 h-10 rounded-full overflow-hidden border border-border hover:opacity-90 transition-opacity"
        >
          <img 
            src={isToggled ? img2 : img1} 
            alt="Logo" 
            className="w-full h-full object-cover" 
          />
        </button>
        <div className="text-[15px] font-bold tracking-wider uppercase text-text">
          anish<span className="text-text-muted font-normal">.portfolio</span>
        </div>
      </div>
      <div className="hidden md:flex gap-8">
        <a href="#about" className="text-[13px] font-medium text-text-muted hover:text-text transition-colors tracking-wide">
          About
        </a>
        <a href="#projects" className="text-[13px] font-medium text-text-muted hover:text-text transition-colors tracking-wide">
          Projects
        </a>
        <a href="#contact" className="text-[13px] font-medium text-text-muted hover:text-text transition-colors tracking-wide">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;