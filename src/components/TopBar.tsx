import React from 'react';
import './TopBar.css';

const TopBar: React.FC = () => (
  <nav className="topbar">
    <div className="topbar-content">
      <ul className="nav-links left">
        <li><a href="#home">Home</a></li>
      </ul>
      <ul className="nav-links right">
        <li><a href="#projects">Projects</a></li>
        <li><a href="#publications">Publications</a></li>
        <li><a href="/mchodhary-cv.pdf"rel="noopener noreferrer">CV</a></li>
        <li><a href="mailto:mukulchodhary1@gmail.com">Contact</a></li>
      </ul>
    </div>
  </nav>
);

export default TopBar;