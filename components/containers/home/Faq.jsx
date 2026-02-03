"use client";
import { useState } from "react";
import faqImg1 from "../../../public/images/faq/faq-img-1.webp";
import faqImg2 from "../../../public/images/faq/faq-img-2.webp";
import groupIcon from "../../../public/images/icons/group-person-icon.svg";
import groupIcon2 from "../../../public/images/icons/group-person-icon-2.svg";
import { faq } from "../../../data/faq";
import Image from "next/image";
import OdometerCounter from "../Odometer";
import SectionTitle from "../SectionTitle";


const Faq = ({ extraClassName = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  // Conditionally select the icon
  const currentIcon = extraClassName.includes('style2') ? groupIcon2 : groupIcon;

  return (
    <section className="faq-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
          <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-body">
              <div className="accordion">
                {faq.map((item, index) => (
                  <div className="accordion-item" key={item.id} 
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
                        type="button"
                        onClick={() => toggleAccordion(index)}
                      >
                        {item.id}. {item.question}
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
          <div className="col-lg-6">
            <div className="faq-images pt-120 pb-120">
              <div className="row g-4">
                <div
                  data-aos-duration="800"
                  data-aos="fade-up"
                  className="col-lg-12">
                  <div className="single-img rounded-20 overflow-hidden">
                  <Image src={faqImg1} alt="Business team analyzing financial data, Business intelligence dashboard on laptop" className="img-fluid w-100" />                  </div>
                </div>
                <div
                  data-aos-duration="800"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="col-lg-6 col-sm-6">
                  <div className="single-img rounded-20 overflow-hidden">
                    <Image src={faqImg2} alt="faq-img" className="img-fluid w-100" />
                  </div>
                </div>
                <div
                  data-aos-duration="800"
                  data-aos="fade-up"
                  data-aos-delay="400"
                  className="col-lg-6 col-sm-6">
                  <div className="clients rounded-20 text-center d-flex align-items-center justify-content-center flex-column h-100" style={{ backgroundColor: 'var(--bs-secondary-50)' }}>
                    <Image src={currentIcon} alt="group-person-icon" />
                    <div className="client-number d-flex align-items-center justify-content-center">
                      <OdometerCounter value={2} /> k+
                    </div>
                    <h5 className="trust">Trusted Clients</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;