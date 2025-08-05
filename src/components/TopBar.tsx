// TopBar.tsx
import React from 'react';
import './TopBar.css';

const TopBar: React.FC = () => {
// TopBar.tsx
const handleContactClick = (e: React.MouseEvent) => {
  e.preventDefault();

  // Scroll to section where the button lives
  const section = document.querySelector('#home');
  section?.scrollIntoView({ behavior: 'smooth' });

  // Slight delay to wait for scroll/render
  setTimeout(() => {
    const button = document.querySelector('#contact-button') as HTMLElement;
    if (button) {
      button.classList.add('youtube-flash');

      // Remove animation class after it ends
      setTimeout(() => {
        button.classList.remove('youtube-flash');
      }, 1000); // Match animation duration
    }
  }, 300);
};


  return (
    <nav className="topbar">
      <div className="topbar-content">
        <ul className="nav-links left">
          <li><a href="#home">Home</a></li>
        </ul>
        <ul className="nav-links right">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#publications">Publications</a></li>
          <li><a href="/mchodhary-cv.pdf" rel="noopener noreferrer">CV</a></li>
          <li><a href="#home" onClick={handleContactClick}>Contact</a></li> 
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
