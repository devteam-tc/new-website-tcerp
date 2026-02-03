import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';

const Specifications = ({ data }) => {
  return (
    <section className="specifications-section pt-100 pb-70">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="section-title text-center mb-5">
              <h2>Industry Solutions</h2>
              <p>Comprehensive ERP solutions tailored for {data.title}</p>
            </div>
          </Col>
        </Row>
        <Row>
          {data.infoCards?.map((card, index) => (
            <Col lg={6} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper me-3">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={48}
                        height={48}
                      />
                    </div>
                    <h4 className="mb-0">{card.title}</h4>
                  </div>
                  <p className="mb-3">{card.description}</p>
                  <ul className="list-unstyled mb-0">
                    {card.list?.map((item, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="fas fa-check text-primary me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Specifications; 