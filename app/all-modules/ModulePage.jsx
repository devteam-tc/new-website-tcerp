"use client"; // 👈 This makes the component run on the client

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { modulesdata } from "../utils/constant";
import "./ModulePage.scss";
import Image from "next/image";
import Link from "next/link";


const ModulePage = () => {
    
  return (
    <>
      <Container className="container">
        <h1 className="section-title text-center mb-5 
        ">All ERP Modules in One Cloud-Based Platform</h1>
        <Row className="g-4">
          {modulesdata.map((module, index) => (
            <Col key={index} sm={12} md={6} lg={4}>
                   <Link href={`/all-modules/${module.slug}`} passHref>
              <div className="styledCard" style={{ cursor: 'pointer' }}>
                <div className="imageWrapper">
                  <Image
                    src={module.image || '/images/products/default_pdt.png'}
                    alt={module.imageAlt}
                    width={400}
                    height={350}
                    className="moduleImage"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = '/images/products/default_pdt.png';
                    }}
                  />
                </div>
                <div className="cardBody">
                  <h5>{module.title}</h5>
                  <p>{module.description}</p>
                </div>
              </div>
        </Link>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <a href="/features" className="view-all-btn" target="_blank" rel="noopener noreferrer">
            View All Features
            <span className="arrow-icon">→</span>
          </a>
        </div>
      </Container>
    </>
  );
};

export default ModulePage;