'use client';

import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './demopage.scss';

const DemoPage = () => {
  useEffect(() => {
    // Only load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col>
        <h1 className="demo-page-heading text-center  ">Get a free demo to help your business grow.</h1>
       
          <div
            className="calendly-inline-widget demo-calendly-widget"
            data-url="https://calendly.com/padmini-techclouderp/demo"
            data-hide-gdpr-banner="true"
            data-hide-landing-page-details="true"
          ></div>
        </Col>
      </Row>
    </Container>
  );
};

export default DemoPage;
