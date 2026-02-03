import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
  

const WhyTechCloud = () => {
  return (
    <div className="why-tech-cloud"  >
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center">
          {/* Left: Image */}
          <div className="col-12 col-lg-6">
            <div style={{
              padding: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <img
                src="/images/about-us/why_tech_cloud_erp_img.webp"
                alt="Why Tech Cloud ERP"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  background: '#f8f8f8',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          
          {/* Right: Text */}
          <div className="col-12 col-lg-6">
            <div style={{
              padding: '20px',
              paddingLeft: 'clamp(20px, 5vw, 40px)'
            }}>
              <h2 style={{
                color: '#ff5722',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 700,
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                Why Tech Cloud ERP?
              </h2>
              
              <p style={{
                color: '#333',
                fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                lineHeight: 1.7,
                marginBottom: '28px',
                maxWidth: '600px'
              }}>
                The complete solution by Tech Cloud ERP will meet all your business requirements and is designed to ease your process and increase efficiency. Our system has scalability built into it, so you can expand your business without pains of migrating into a new platform.
              </p>
          
              {/* List of 5 points with check icons */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '32px 0 0 0',
                display: 'grid',
                gap: '12px',
                maxWidth: '600px'
              }}>
                {[
                  'Real-time analytics and reporting',
                  'Scalable and flexible platform',
                  'Easy integration with existing systems',
                  'User-friendly interface for quick adoption',
                  'Enhanced workflow and productivity'
                ].map((item, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    <FaCheckCircle style={{
                      color: '#05afcc',
                      marginRight: '12px',
                      fontSize: '1.2em',
                      marginTop: '2px',
                      flexShrink: 0
                    }} />
                    <span style={{ fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyTechCloud;
