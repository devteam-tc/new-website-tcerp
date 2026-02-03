"use client";
import { useState, useCallback } from "react";
import faqData from "./FAQSection.json";

// FAQ Item Component
const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="accordion-item">
    <h3 className="accordion-header">
      <button
        className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
        type="button"
        onClick={() => onToggle(faq.id)}
        aria-expanded={isOpen}
      >
        {faq.question}
      </button>
    </h3>
    <div className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}>
      <div className="accordion-body">
        <p>{faq.answer}</p>
      </div>
    </div>
  </div>
);

// Section Header Component
const SectionHeader = ({ title, subtitle }) => (
  <div className="col-lg-6 text-center">
    <div className="section-title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  </div>
);

// Main FAQ Section Component
const FAQSection = ({ customData }) => {
  const [openFaqs, setOpenFaqs] = useState({});
  const data = customData || faqData;

  const toggleFaq = useCallback((id) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  return (
    <section className="faq-section ">
      <div className="container">
        <div className="row justify-content-center">
          <SectionHeader title={data.title} subtitle={data.subtitle} />
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="faq-accordion">
              {data.faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaqs[faq.id]}
                  onToggle={toggleFaq}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FAQSection.defaultProps = {
  customData: null,
};

export default FAQSection; 