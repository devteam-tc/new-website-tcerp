"use client";

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { uniquefeaturesdata } from '../utils/constant';
import './FeaturePage.scss';

const FeaturePage = () => {
  return (
      <Container className="feature-container">
        <div className="section-header text-center mb-5">
          <h1  className="section-title">Advanced ERP Features Built for Every Industry</h1>
          {/* <p className="section-subtitle">Discover what makes our solution stand out</p> */}
        </div>
        <Row className="g-4">
          {uniquefeaturesdata.map((feature, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <div className="feature-card">
                <div className="card-image">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={300}
                     style={{ objectFit: 'cover' }}
                    className="feature-img"
                    onError={(e) => {
                      e.currentTarget.src = "/images/products/default_pdt.png";
                    }}
                  />
                </div>
                <div className="card-body">
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
  );
};

export default FeaturePage;
