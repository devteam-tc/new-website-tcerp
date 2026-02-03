"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../layout/header/Header";
import PageHeader from "../../layout/PageHeader";
import Footer from "../../layout/footer/Footer";
import CustomCursor from "../../layout/CustomCursor";
import { FaHome } from 'react-icons/fa';
import { getIndustryData, getIndustryBreadcrumbs } from '../../../app/utils/industryUtils';

const IndustryClientPage = () => {
  const { slug } = useParams();
  const [industryData, setIndustryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadIndustryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First try to get data from the new structure
        const data = getIndustryData(slug);
        if (data) {
          setIndustryData(data);
          return;
        }

        // Fallback to loading from individual JSON file
        const module = await import(`../../../data/industries/${slug}.json`);
        setIndustryData(module.default);
      } catch (err) {
        console.error('Error loading industry data:', err);
        setError('Failed to load industry data');
      } finally {
        setLoading(false);
      }
    };

    loadIndustryData();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !industryData) {
    return <div>Error: {error || 'Industry not found'}</div>;
  }

  const breadcrumbs = [
    { label: "Home", link: "/", icon: FaHome },
    { label: "All Industries", link: "/industries" },
    { label: industryData.title, link: null },
  ];

  return (
    <>
      <Header />
      <PageHeader title={industryData.title} breadcrumbs={breadcrumbs} />
      <main>
        <section className="industry-banner">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img 
                  src={industryData.banner} 
                  alt={industryData.title} 
                  className="img-fluid w-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* <section className="industry-description py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>{industryData.title}</h2>
                <p>{industryData.description}</p>
              </div>
            </div>
          </div>
        </section> */}

<div>
    <h3 className="title split-text right">{title}</h3>
    <p>{description}</p>
    <div className="inner-options">
      <ul className="list-unstyled">
        {keyPoints.map((point, index) => (
          <div style={{display: "flex", gap: "10px", alignItems: "start", justifyContent: "left"}}>
          <div>
          <Image 
          src={cloudIcon} 
          alt={`Bullet point arrow for ${point}`}
          width={20}
          height={20}
        />
          </div>
          <li key={index}>
            {point}
          </li></div>
        ))}
      </ul>
    </div>
  </div>

        <section className="key-points py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3>Key Features</h3>
                <ul className="list-unstyled">
                  {industryData.keyPoints?.map((point, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="info-cards py-5">
          <div className="container">
            <div className="row">
              {industryData.infoCards?.map((card, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <img 
                          src={card.image} 
                          alt={card.title} 
                          className="me-3"
                          style={{ width: '48px', height: '48px' }}
                        />
                        <h4 className="mb-0">{card.title}</h4>
                      </div>
                      <p>{card.description}</p>
                      <ul className="list-unstyled">
                        {card.list?.map((item, idx) => (
                          <li key={idx} className="mb-2">
                            <i className="fas fa-check text-primary me-2"></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="faq py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center mb-4">Frequently Asked Questions</h3>
                <div className="accordion" id="faqAccordion">
                  {industryData.faqData?.map((faq, index) => (
                    <div key={index} className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq${index}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`faq${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="industry-info py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center mb-4">Industry Information</h3>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>Industry:</strong> {industryData.industry}</p>
                        <p><strong>Solution:</strong> {industryData.solution}</p>
                      </div>
                      <div className="col-md-6">
                        <p><strong>Modules:</strong> {industryData.modules?.join(", ")}</p>
                        <p><strong>Results:</strong> {industryData.result?.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
};

export default IndustryClientPage;
