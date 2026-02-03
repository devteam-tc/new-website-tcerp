'use client';
import { Container } from 'react-bootstrap';
import './TermsPage.scss';
import { FaCheckCircle } from 'react-icons/fa';
import termsData from '../../../data/terms/termsData.json'; 

const TermsPage = () => {
  return (
    <Container>
      <div className="terms-container">
        <div className="terms-content">
          {termsData.sections.map((section, index) => (
            <section className="section" key={index}>
              <h1 className="section-title">{section.title}</h1>

              {section.content && <p className="paragraph">{section.content}</p>}

              {section.list && (
                <ul className="list">
                  {section.list.map((item, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="list-icon" /> {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TermsPage;
