"use client";

import { Container, Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import industriesData from "../../../data/industriesData.json";

export default function IndustryList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("manufacturing");

  const handleArrowClick = (link) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(link);
  };

  const categories = [
    { id: "manufacturing", name: "Manufacturing Industries", shortName: "Manufacturing" },
    { id: "retail", name: "Retail & Service Industries", shortName: "Retail & Service" },
    { id: "trading", name: "Trading Industries", shortName: "Trading" },
    
  ];

  const currentCategory = industriesData.categories[activeTab];

  return (
    <Container className="industry-section mb-5">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="header">Industries We Serve</h1>
        </Col>
      </Row>
      
      {/* Tabs Navigation */}
      <Row className="mb-4">
        <Col>
          <div className="industry-tabs d-flex flex-wrap justify-content-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`industry-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="full-name">{category.name}</span>
                <span className="short-name">{category.shortName}</span>
              </button>
            ))}
          </div>
        </Col>
      </Row>

      {/* Industry Count */}
      {/* <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <span className="industry-count">
            {currentCategory.industries.length} Industries
          </span>
        </Col>
      </Row> */}

      {/* Industry Cards */}
      <Row>
        {currentCategory.industries.map((industry) => (
          <Col xs={6} sm={6} md={4} key={industry.id} className="mb-4">
            <div className="industry-card" onClick={() => handleArrowClick(industry.link)}
              >
              <div className="icon-wrapper">
                <Image
                  src={industry.icon}
                  width={40}
                  height={40}
                  alt={`${industry.title} icon`}
                  className="icon"
                />
              </div>
              <div className="card-content">
                <h3 className="title">{industry.title}</h3>
                <p className="mb-1">{industry.description}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
