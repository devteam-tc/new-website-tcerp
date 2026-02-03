"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import "./DownloadButtonSection.scss";

const DownloadButtonSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = '/brochure.pdf';
    link.download = 'brochure.pdf'; // This will be the filename when downloaded
    
    // Append to body, trigger click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Track the download event
    console.log('Brochure download started');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check if window is defined (for server-side rendering)
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div 
      className={`download-button ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleDownload}
    >
      <div className="icon-container">
        <FaDownload className="download-icon" />
      </div>
      <span className="download-text">Download Brochure</span>
    </div>
  );
};

export default DownloadButtonSection;