import React, { useState, useRef, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import './headerComponent.css';
import SearchButton from './SearchButton';
import { Link } from 'react-router-dom';

function HeaderComponent() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  const sidebarRef = useRef(null);

  const navLinksRef = useRef(null);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setShow(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShow(false);
    }
    setLastScrollY(currentScrollY);
  };





  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [lastScrollY]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleMessage = (msg) => {
    console.log(msg);
    setSearchVisible(msg);
  }

  return (
    <div className={`Nav_bar ${show ? 'visible' : 'hidden'}`}>
      <div className='nav-item'>
        <a href="#"></a>
      </div>

      <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`} ref={sidebarRef} >
        <ul>
          <li>
            <SearchButton onMessage={handleMessage} />
          </li>
         
           <li><Link to="/">Services</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
          <li><a href="#about">About me</a></li>
          <li> <a href="https://wa.me/9779800000000" target="_blank" rel="noopener noreferrer">Contact</a></li>
        </ul>
      </div>

      <div className={`nav-item_2 ${searchVisible ? 'hidden' : ''}`}>
        <ul ref={navLinksRef}>
          <li><Link to="/">Services</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
                              <li><Link to="/blog">Blog</Link></li>

          <li><a href="#about">About me</a></li>
          <li><a href="https://wa.me/9779826110703" target="_blank" rel="noopener noreferrer">Contact</a></li>
        </ul>
      </div>

      <div className="inquiry-button">
        <SearchButton className="pair" onMessage={handleMessage} />
        <button className='question' onClick={(e) => { e.preventDefault(); alert("Plz Click Contact"); }}> Any Questions?</button>
      </div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
    </div>
  );
}

export default HeaderComponent;
