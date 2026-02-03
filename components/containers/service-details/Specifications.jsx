'use client';

import Image from 'next/image';
import { useState } from 'react';
import appDevelopmentData from '../../../data/services/app-development.json';
import webDevelopmentData from '../../../data/services/web-development.json';
import digitalMarketingData from '../../../data/services/digital-marketing.json';
import eCommerceDevelopmentData from '../../../data/services/e-commerce-development.json';

const Specifications = ({ slug }) => {
  const getDataBySlug = () => {
    switch (slug) {
      case 'app-development':
        return appDevelopmentData;
      case 'web-development':
        return webDevelopmentData;
      case 'digital-marketing':
        return digitalMarketingData;
      case 'e-commerce-development':
        return eCommerceDevelopmentData;
      default:
        return { services: [], features: [] };
    }
  };

  const data = getDataBySlug();
  // Handle both data structures (services and features)
  const items = data.features || data.services || [];

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="sservice-area pt_120 pb_120">
        <div className="container">
          <div className="row align-items-center">
           

            {items.map((item, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
                <HoverCard service={item} />
              </div>
            ))}

            <div className="service-shape2">
              <Image
                src="/images/services/service7.png"
                alt="shape"
                width={100}
                height={100}
              />
            </div>
            <div className="service-shape3 bounce-animate4">
              <Image
                src="/images/services/service8.png"
                alt="shape"
                width={341}
                height={351}
                style={{ aspectRatio: '341 / 351' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HoverCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="service-single-box"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff',
        marginBottom: '20px',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="service-icon"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80px',
        }}
      >
        <Image
          src={
            isHovered && service.hoverImg
              ? service.hoverImg
              : service.img || '/images/industries/default-card-image.png'
          }
          alt={service.title}
          width={50}
          height={50}
          style={{ objectFit: 'contain' }}
          onError={(e) => {
            e.currentTarget.src = '/images/industries/default-card-image.png';
          }}
        />
      </div>
      <div
        className="service-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 120px)',
        }}
      >
        <h3
          className="service-title"
          style={{
            marginBottom: '10px',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          {service.title}
        </h3>
        <p
          className="service-text"
        >
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default Specifications;
