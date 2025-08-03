import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const now = new Date();
  const monthYear = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <footer className="footer">
      <div>
        &copy; {now.getFullYear()} Mukul Chodhary. All rights reserved.
      </div>
      <div>
        Last updated: {monthYear}
      </div>
    </footer>
  );
};

export default Footer;