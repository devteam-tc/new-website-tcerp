
"use client";

import React from 'react';
import { FaPhp } from 'react-icons/fa';
import { SiMysql } from 'react-icons/si';
import { RiOpenSourceLine } from 'react-icons/ri';
import './OurPartnerSection.scss';

const technologies = [
  { 
    id: 1, 
    name: 'PHP', 
    icon: <FaPhp size={60} color="#777BB4" />,
    color: '#777BB4'
  },
  { 
    id: 2, 
    name: 'MySQL DB', 
    icon: <SiMysql size={60} color="#4479A1" />,
    color: '#4479A1'
  },
  { 
    id: 3, 
    name: 'Open Source', 
    icon: <RiOpenSourceLine size={60} color="#28a745" />,
    color: '#28a745'
  },
];

const OurPartnerSection = () => {
  return (
    <section className="technologies-section">
      <div className="container">
        <div className="section-header">
          <h3 className=' text-center mb-4' style={{ color :'#ef5226'}}>Technologies We Use</h3>
           <p className='text-center'>At Tech Cloud ERP, we rely on trusted, powerful, and future-ready 
            technologies to build a robust ERP software that delivers scalability and flexibility. These technologies
             ensure seamless integration, strong database management, and adaptability for evolving business needs.
              By using open-source and widely adopted platforms, we provide businesses with cost-effective and reliable 
              solutions.

          </p>
        </div>
        
        <div className="technologies-grid">
          {technologies.map((tech) => (
            <div key={tech.id} className="tech-item">
              <div className="tech-logo" style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <h3 className="tech-name">{tech.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartnerSection;