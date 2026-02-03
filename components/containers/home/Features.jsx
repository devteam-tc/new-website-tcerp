import React from 'react';
import featureImg1 from '../../../public/images/features/feature-img-1.webp';
 const featureImg2 = "https://res.cloudinary.com/techclouderp/image/upload/v1769163357/25_Yrs_Final_23-01-2026_fpmiqz.gif";

import SectionTitle from '../SectionTitle'; 
import Image from 'next/image';

const Features = () => {
  return (
    <section className="ep-features-section overflow-hidden pt-60 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 order-2 order-md-1 d-none d-lg-block">
            <div className="feature-image position-relative">
              <div className="img-one overflow-hidden rounded-20 reveal left position-relative">
                <Image src={featureImg1} alt="ERP dashboard with analytics for business performance"
                  className="img-fluid w-100 rounded-20" />
              </div>
              <div className="img-two overflow-hidden position-absolute">
                 <Image src={featureImg2} alt="25 years business software experience"
                  className="img-fluid w-100 rounded-20"  width={500}  
                   height={300}/>
              </div>
             
            </div>
            </div>
        
          <div className="col-lg-6 order-1 order-md-2">
            <div className="feature-text">
              <SectionTitle subTitle="About Tech Cloud ERP" title="Empowering Business Growth with Smart, Industry-Focused ERP" />
              <p className='mt-3 mb-3 ' style={{ textAlign: 'justify' }}>  Tech Cloud ERP is a powerful cloud-based enterprise solution designed to streamline operations for <b style={{ color: '#000000' }}>Manufacturing, Trading, Retail and Project-Driven Businesses</b>. It brings all critical business functions onto a single platform, enabling better control, visibility, and decision-making. </p>
              <p className='mt-3 mb-3' style={{ textAlign: 'justify' }}>Backed by <b  style={{ color: '#000000' }}>25+ Years of Industry Expertise</b>, the platform simplifies complex workflows, supports business growth, and enables organizations to scale with confidence.
              </p>
              <ul className="feature-list">
                <li>Industry-focused ERP for Manufacturing</li>
                <li>End-to-End Process Automation</li>
                <li>Real-Time Reports & Dashboards</li>
                <li>Scalable Cloud Architecture</li>
              </ul>
            </div>
          </div>
        </div>   
      </div>        
       
    </section>
    
  )
}

export default Features