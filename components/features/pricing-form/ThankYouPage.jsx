import React from 'react';
import {  FaEnvelope, FaHome, FaPhoneAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import './ThankYouPage.scss';
import { FaRegCircleCheck } from "react-icons/fa6";

const ThankYouPage = () => {
  const router = useRouter();

  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <div className="icon-container">
          <FaRegCircleCheck   className="thank-you-icon" />
        </div>
        
        <h1>Thank You for Choosing Tech Cloud ERP!</h1>
        <h2>We've received your request and will be sending a detailed quotation to your email shortly.</h2>

        <div className="contact-info">
          <p>Feel free to reach out to our team:</p>
          <div className="contact-links">
            <a href="mailto:sales@techclouderp.com" className="contact-link">
              <FaEnvelope className="contact-icon" />
              sales@techclouderp.com
            </a>
            <div className="phone-numbers">
              <a href="tel:+918919439603" className="contact-link">
                <FaPhoneAlt className="contact-icon" />
                +91 8919439603 , +91 7032803200
              </a>
              {/* <a href="tel:+917032803200" className="contact-link">
                <FaPhoneAlt className="contact-icon" />
                +91 7032803200
              </a> */}
            </div>
          </div>
        </div>

        <button 
          className="home-button"
          onClick={() => router.push('/')}
        >
          <FaHome className="home-icon" />
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage; 