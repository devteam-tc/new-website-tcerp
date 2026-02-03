import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const FAQSection = ({ data }) => {
  return (
    <section className="faq-section pt-100 pb-70 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="section-title text-center mb-5">
              <h2>Frequently Asked Questions</h2>
              <p>Find answers to common questions about our {data.title} solutions</p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Accordion>
              {data.faqData?.map((faq, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>
                    <p>{faq.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FAQSection; 