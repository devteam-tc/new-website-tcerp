'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import servicesData from '../../../data/services.json';
import SectionTitle2 from '../SectionTitle2';
const ServiceCard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const accordionItems = document.querySelectorAll(".accordionItem");

      accordionItems.forEach(item => {
        item.addEventListener("click", () => {
          accordionItems.forEach(i => i.classList.remove("active"));
          item.classList.add("active");
        });
      });

      return () => {
        accordionItems.forEach(item => {
          item.replaceWith(item.cloneNode(true));
        });
      };
    }
  }, [isMobile]);

  const ServiceBox = ({ icon, title, description, thumb, link }) => (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="service-box mb-4 bg-white rounded-3 overflow-hidden">
        <div className="single-service-box p-4">
          <div className="service-icon mb-3">
            <Image 
              src={icon} 
              alt={title} 
              width={50} 
              height={50} 
              className="img-fluid"
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="service-box-content">
            <h4 className="service-title h5 mb-3">
              <Link href={link} className="text-decoration-none text-dark">{title}</Link>
            </h4>
            <p className="service-desc mb-0  ">{description}</p>
          </div>
        </div>
        {!isMobile && (
          <div className="service-thumb">
            <Image 
              src={thumb} 
              alt={title} 
              width={400} 
              height={250} 
              className="img-fluid w-100"
              style={{ 
                objectFit: 'cover',
                height: '200px'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="pt-60 pb-60 feature-studio-section fix space-bottom">
      <div className="container">
        <div className="row mb-xl-5 mb-4 text-center justify-content-center">
          <div className="col-lg-7">
             <div className="feature-text">
              <SectionTitle2 subTitle="WHAT WE OFFER" title="Advanced Digital Services" />
            </div>
           </div>
        </div>

        {isMobile ? (
          <div className="row g-4 justify-content-center">
            {servicesData.services.map((service) => (
              <ServiceBox
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                thumb={service.thumb}
                link={service.link}
              />
            ))}
          </div>
        ) : (
          <div className="customImagesWrapper">
            <div className="accordion">
              {servicesData.services.map((service) => (
                <div key={service.id} className={`accordionItem ${service.id === 1 ? 'active' : ''}`}>
                  <Image src={service.thumb} alt={service.title} width={50} height={50}/>
                  <div className="conteBox">
                    <div className="box">
                      <div className="serialInner">
                        <span className="serial">{service.serial}</span>
                        <h4 className="serialblack">
                          <Link href={service.link} className="serialblack">{service.title}</Link>
                        </h4>
                      </div>
                      <p className="pra fs-seven ">
                        {service.description}
                      </p>
                      <Link href={service.link} className="fs-seven fw-semibold p1-clr">Explore More</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceCard;