import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

const AboutSection = ({ data }) => {
  return (
    <section className="about-section pt-100 pb-70">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="about-image">
              <Image
                src={data.banner}
                alt={data.title}
                width={600}
                height={400}
                className="img-fluid rounded"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="about-content">
              <h2>{data.title}</h2>
              <p className="mb-4">{data.description}</p>
              <div className="key-points">
                <h4>Key Features</h4>
                <ul className="list-unstyled">
                  {data.keyPoints?.map((point, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection; 