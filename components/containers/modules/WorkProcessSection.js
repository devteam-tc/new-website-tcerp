'use client';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';
import './WorkProcessSection.scss';
import { useRouter } from 'next/navigation';

const Title = ({ children, className }) => (
  <h2 className={`title ${className}`}>{children}</h2>
);

const StyledButton = ({ children, onClick }) => (
  <button className="styledButton" onClick={onClick}>{children}</button>
);

const renderTextWithLineBreaks = (text) => {
  if (!text) return null;
  const textString = String(text);
  return textString.split('\n').map((line, i) => (
    <span key={i} style={{ display: 'block', marginBottom: '8px' }}>
      {line}
    </span>
  ));
};

const WorkProcessSection = ({ moduleData }) => {
  if (!moduleData) return null;

  const { featureSections, mainHeaderSection } = moduleData;
  const router = useRouter();

  const renderStep = (sectionData, reverse = false, index) => (
    <Row className="align-items-center mb-2" key={index}>
      <Col md={6} className={reverse ? 'order-md-2' : ''}>
        <Image
          src={sectionData.dashboardImage}
          alt={sectionData.imageAlt || sectionData.featuretitle}
          className="image"
          width={700}
          height={450}
          quality={100}
          style={{ width: '100%', height: 'auto' }}
        />
      </Col>
      <Col md={6} className={reverse ? 'order-md-1' : ''}>
        <h3 className="stepTitle">
          <span className="stepNumber">{`0${index + 1}`}</span>
          {renderTextWithLineBreaks(sectionData.featuretitle)}
        </h3>
        <div className="stepDescription">
          {renderTextWithLineBreaks(sectionData.featuredesc)}
        </div>
      </Col>
    </Row>
  );

  return (
    <section className="section">
      <Container className=" ">
        <div className="header">
          <h1 className="title">
            {renderTextWithLineBreaks(mainHeaderSection.maintitle)}
          </h1>
          <div className="subtitle">
            {renderTextWithLineBreaks(mainHeaderSection.description)}
          </div>
        </div>

        {featureSections.map((sectionData, index) => (
          renderStep(sectionData, index % 2 !== 0, index)
        ))}

        {/* <div className="text-center my-5">
          <StyledButton onClick={() => router.push('/all-modules')}>Get Started</StyledButton>
        </div> */}
      </Container>
    </section>
  );
};

export default WorkProcessSection; 