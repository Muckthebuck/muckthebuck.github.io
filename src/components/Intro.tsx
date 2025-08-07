import React from 'react';
import { FaGithub, FaLinkedin, FaFileAlt, FaEnvelopeOpen, FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Intro.css';
const GitHubIcon =  FaGithub as React.ElementType;
const LinkedInIcon = FaLinkedin as React.ElementType;
const CVIcon = FaFileAlt as React.ElementType;
const MailIcon = FaEnvelopeOpen as React.ElementType;
const CopyIcon = FaCopy as React.ElementType;
const interests = [
    { label: 'Computer Vision', icon: '📷' },
    { label: '3D Asset generation', icon: '🖼️' },
    { label: 'Graphics & 3D Reconstruction', icon: '🖼️' },
    { label: 'Stochastic Optimisation', icon: '📈' },
    { label: 'Reinforcement Learning', icon: '🧠' },
    { label: 'Autonomous Systems (Perception, Planning and Control)', icon: '🤖' },
    { label: 'Sensor Fusion & SLAM', icon: '📡' },
    { label: 'Cooperative Multi-Agent Systems', icon: '🤝' },
    { label: 'Signal Processing', icon: '📊' },
    {label: 'System Identification ', icon: '🔍' }
];
const firstname="mukul"
const lastname="chodhary"
const number_n = "1"
const Intro: React.FC = () => {
    const [copied, setCopied] = React.useState(false);

    const handleCopyEmail = () => {
    navigator.clipboard.writeText('mukulchodhary1@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

  return (
    <section id="home" className="home-intro">
      <div className="blurred-bg" />

      <div className="intro-content">
        <div className="intro-image">
          <img src="/me.jpg" alt="Mukul Chodhary" />
        </div>

        <div className="intro-text">

        <h1>Hi, I’m Mukul Chodhary</h1>


          <div className="intro-links">
            <a href="/mchodhary-cv.pdf" target="_blank" rel="noopener noreferrer">
              <CVIcon /> CV
            </a>
            <a href="https://github.com/muckthebuck" target="_blank" rel="noopener noreferrer">
              <GitHubIcon /> GitHub
            </a>
            <a href="https://linkedin.com/in/mukulchodhary" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
            {/* <a href="mailto:mukulchodhary1@gmail.com" target="_blank" rel="noopener noreferrer">
                    <MailIcon /> Email
            </a> */}
             <button id="contact-button" onClick={handleCopyEmail} title="Copy email"> 
                    <CopyIcon /> Copy Email
                    {copied && <span className="copied-tooltip">Copied!</span>}
            </button>

          </div>

        <p>
          I'm a researcher and engineer passionate about building robust, intelligent systems that bridge 
          <span className="highlight"> machine learning, system identificaiton, and robotics</span>. Currently completing a 
          <span className="highlight"> Master’s in Electrical Engineering (Autonomous Systems) </span>  
          at the 
          <span className="highlight"> University of Melbourne</span> (expected <span className="highlight">December 2025</span>).
          During my exchange semester at <span className="highlight"> KAIST</span>, 
          I deepened my focus in <span className="highlight"> mobile robotics</span>, 
          <span className="highlight"> optimal control</span>, and 
          <span className="highlight"> learning-based planning for autonomy</span>. 
          I also hold a Bachelor of Science in Computer Science and Electrical and Electronics Engineering 
          from the University of Melbourne, graduating with First Class Honours.
        </p>


        <p>
        My academic foundation spans <span className="highlight">deep learning</span>, 
        <span className="highlight"> signal processing</span>, 
        <span className="highlight"> control systems</span>, and 
        <span className="highlight"> optimisation</span>, complemented by hands-on work across 
        <span className="highlight"> embedded systems</span>, 
        <span className="highlight"> perception pipelines</span>, and 
        <span className="highlight"> real-time autonomy</span>.
        I’ve contributed to research and engineering projects in 
        <span className="highlight"> deep learning</span>, 
        <span className="highlight"> asset localisation (RF)</span>, 
        <span className="highlight"> BCI integration</span>, and 
        <span className="highlight"> multi-agent reinforcement learning</span>. 
        My technical stack includes <span className="highlight">Python</span>, 
        <span className="highlight"> C</span>, and <span className="highlight">C++</span> for low-level control, 
        and frameworks like 
        <span className="highlight"> ROS</span>, <span className="highlight">JAX</span>,  
        <span className="highlight"> PyTorch</span>, and <span className="highlight">TensorFlow </span> 
        for experimentation and integration.
        </p>
        <p>
        From building perception systems using physics-informed networks to designing RL agents with episodic memory, 
        I enjoy challenges that bridge theoretical depth with practical implementation. I thrive on creating robust, 
        scalable tools that blend innovation with purpose — whether it’s prototyping hardware/software for defense 
        systems, deploying embedded algorithms in real-time robotics, or integrating multimodal sensor data for adaptive 
        control and learning.
        </p>

        <div className="collab-note">
         <strong>Currently open to opportunities and collaborations</strong> in research or applied projects at the intersection of AI, robotics, computer vision, graphics, and real-world system design.
        </div>
        
        <h3>Key Interests</h3>
          <div className="interests-tags">
            {interests.map((item, idx) => (
              <motion.div
                className="tag"
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="emoji">{item.icon}</span> {item.label}
              </motion.div>
            ))}
          </div>


          
        </div>
      </div>
    </section>
  );
};

export default Intro;
