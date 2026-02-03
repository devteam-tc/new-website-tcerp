'use client';

import React, { useState } from "react";
import faqData from "../../../data/pricing/faqSection.json";
import SectionTitle from "../../../components/containers/SectionTitle";

const FaqSection = ({ extraClassName = '' }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqData || faqData.length === 0) {
    return <p>No FAQ data available.</p>;
  }

  return (
    <section className="faq-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SectionTitle subTitle="Frequently Asked Questions" extraClass="mb-30" />
            <div className="faq-body">
              <div className="accordion">
                {faqData.map((item, index) => (
                  <div className="accordion-item" key={index} 
                  style={{
                    border: activeIndex === index ? '2px solid var(--bs-primary-color)' : '1px solid #dee2e6',
                    boxShadow: activeIndex === index ? '0 0 10px rgba(0, 123, 255, 0.2)' : 'none',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    ':hover': {
                      border: '2px solid var(--bs-primary-color)',
                      boxShadow: '0 0 10px rgba(0, 123, 255, 0.2)'
                    }
                  }}
                  onMouseEnter={(e) => {
                    if (activeIndex !== index) {
                      e.currentTarget.style.border = '2px solid var(--bs-primary-color)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeIndex !== index) {
                      e.currentTarget.style.border = 'none';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                  >
                    <div className="accordion-header">
                      <button
                        className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`}
                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                      >
                        {index + 1}. {item.question}
                      </button>
                    </div>
                    <div className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}>
                      <div className="accordion-body">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
