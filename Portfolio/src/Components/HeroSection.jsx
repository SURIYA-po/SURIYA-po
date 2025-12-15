import React from 'react';
import './Herosection.css'; // Create a CSS file for styling
import { useEffect } from 'react';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="content-wrapper">
        <h2  className='headings2'>I'm Surya</h2>
        <h1 className='headings1'><span>Front</span><span className='span2'>End</span>&amp;</h1> <br></br><h1  className='headings1'><span>Back</span>End Developer</h1>
        <p className='paragraphs'> 
          With expertise in multiple programming languages and a passion for elegant design, I specialize in
          building sleek, user-centric solutions that address complex digital challenges. My approach combines
          technical precision with creative innovation to deliver outstanding results.
        </p>
     <a
  href="https://www.upwork.com/freelancers/~01a58c5d929441a2dc"
  class="cta-button"
  target="_blank"
  rel="noopener noreferrer"
>
  <img src="/assets/upwork.svg" alt="Upwork" style={{verticalAlign: 'middle', marginRight: '8px'}} />
  Contact me on Upwork
</a>
      
     
      <div className="footer-icons">
        <a href="https://www.linkedin.com/in/pokhrelsurya-z/"><img src="/assets/linkedin.svg" alt="Upwork" /> </a>
        <a href="https://www.upwork.com/freelancers/~01a58c5d929441a2dc">        <img src="/assets/upwork.svg" alt="LinkedIn" />
        </a>
       <a href="https://github.com/Suriya-po"> <img src="/assets/github.svg" alt="GitHub" /></a>
      </div>

      </div>

      <div className='photo_surya' >

        <div className="circle"> 

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
