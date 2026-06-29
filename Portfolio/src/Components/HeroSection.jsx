import React from 'react';
import './Herosection.css'; // Create a CSS file for styling
import { useEffect } from 'react';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="content-wrapper">
        <h2  className='headings2'>I'm Surya</h2>
        <h1 className='headings1'><span>AI</span><span className='span2'>Engineer</span>&amp;</h1> <br></br><h1  className='headings1'><span>Re</span>searcher</h1>
        <p className='paragraphs'> 
         JJust look at the power of AI. Nothing can match its potential. From farmers to lawmakers, from students to teachers, from doctors to engineers ,AI is transforming the way everyone works and learns. Those who understand and harness the power of AI will help shape the future.

I believe I chose the right path. With AI, ideas can become reality, and what once seemed impossible becomes possible. Every business will evolve with intelligent systems, and I want to be part of building that future.

I need a big playground to create, experiment, and innovate. I love building AI agents. LLMs are my friends, and machine learning algorithms are my eyes.

Keep learning. Keep building. Keep inspiring.

Attention is all you need.
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
