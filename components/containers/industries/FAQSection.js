import { useState } from 'react';

export default function FAQSection({ faqData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section pt-30 pb-30">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-body">
        <div className="accordion">
          {faqData?.map((item, index) => (
            <div 
              className={`accordion-item ${activeIndex === index ? 'active' : ''}`} 
              key={item.id}
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
  );
}
