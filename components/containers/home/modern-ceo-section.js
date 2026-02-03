"use client"

import React from 'react';
import './_ceo_section.scss';
// import CeoImg from '../../../public/images/about-us/ceo.png'; 
import Image from 'next/image';

const ModernCeoSection = () => {
  return (
    <section className="ceo-section pt-60 ">
      <div className="ceo-bg"></div>
      <div className="container ceo-content">
        <div className="row align-items-center justify-content-center flex-row-reverse-mobile ">
          {/* <div className="col-lg-5 text-center text-lg-start">
            <div className="ceo-image-wrapper">
              <Image src={CeoImg} alt="Mr. Raja Shanmugam" className="ceo-image" />
            </div>
          </div> */}
          <div className="col-lg-8">
            <div className="ceo-card">
              <h2 className="ceo-name">Mr. Raja Shanmugam</h2>
              <h4 className="ceo-title">Founder &amp; CEO</h4>
              <p className="ceo-description">
                Mr. Raj, a Mechanical Engineer and certified SAP Production Planning Consultant, brings over 30 years of expertise across sectors like Design, Chemical Processing, Manufacturing, FMCG and IT. Renowned for his dynamic personality and sharp problem-solving skills, he has guided countless professionals and businesses to success. As the Founder and CEO of Tech Cloud ERP, Mr. Raj drives strategic planning, operations and growth, leading the company with vision, dedication and unwavering commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCeoSection;
