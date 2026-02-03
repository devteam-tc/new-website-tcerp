"use client"

import counterImg from '../../../public/images/counter/counter-img.webp';
import OdometerCounter from '../Odometer';
import Image from 'next/image';

const Counter = () => {
  return (
    <section className="ep-counter-section pt-60 pb-60">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="counter-text">
              <h2 className="heading-style1 title-anim mb-20">
                A Proven ERP Partner Businesses Trust
              </h2>
              <p>
              With decades of experience in ERP implementation and business process
              consulting, Tech Cloud ERP has supported organisations in managing complex
              operations, multi-location setups, and project-driven workflows. Our approach is
              built on system stability, domain understanding, and long-term client success.              
              </p>
              <div className="counter-wrapper">
                <div className="row g-4">
                  <div data-aos-duration="800" data-aos="fade-up" className="col-6">
                    <div className="counter-item text-center rounded-20 h-100">
                      <div className="number">
                        <OdometerCounter value={25} /> +
                      </div>
                      <span className="short-info">Years of ERP Expertise</span>
                    </div>
                  </div>
                  <div data-aos-duration="800" data-aos="fade-up" data-aos-delay="200" className="col-6">
                    <div className="counter-item text-center rounded-20 h-100">
                      <div className="number">
                        <OdometerCounter value={2000} /> +
                      </div>
                      <span className="short-info">Implementations Delivered</span>
                    </div>
                  </div>
                  <div data-aos-duration="800" data-aos="fade-up" data-aos-delay="300" className="col-6">
                    <div className="counter-item text-center rounded-20 h-100">
                      <div className="number">
                        <OdometerCounter value={10000} /> +
                      </div>
                      <span className="short-info">Active ERP Users</span>
                    </div>
                  </div>
                  <div data-aos-duration="800" data-aos="fade-up" data-aos-delay="500" className="col-6">
                    <div className="counter-item text-center rounded-20 h-100">
                      <div className="number">
                        <OdometerCounter value={10} /> +
                      </div>
                      <span className="short-info">Customers Across Countries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="counter-image rounded-20 overflow-hidden ms-lg-auto" style={{ height: '100%' }}>
              <div className="reveal left" style={{ height: '100%' }}>
                <Image 
                  src={counterImg} 
                  alt="business handshake with urban city background" 
                  className="img-fluid w-100"
                  style={{
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px'
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Counter;
