"use client";
import React from "react";
import { Container } from "react-bootstrap";
import Pricing from "../../components/containers/home-two/Pricing";
import CustomCursor from "../../components/layout/CustomCursor";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import PageHeader from "../../components/layout/PageHeader";
import { FaHome } from "react-icons/fa";
import StepWise from "../../components/containers/pricing/StepWise";
import ComparePlans from "../../components/containers/pricing/ComparePlans";
import FaqSection from "../../components/containers/pricing/FaqSection";

const PricingPage = () => {
  const breadcrumbs = [
    { label: "Home", link: "/", icon: FaHome },
    { label: "Pricing", link: null },
  ];

  /* =========================
     FAQ Schema
  ========================== */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "url": "https://techclouderp.com/pricing",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much do TechCloud ERP services cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "The cost of TechCloud ERP services depends on the service type, project requirements, and business goals. We offer flexible and customized pricing solutions."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer customized pricing plans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, we provide customized pricing plans tailored to your specific business needs and project scope."
        }
      }
    ]
  };

  return (
    <>
      {/* ✅ FAQ Schema (before Header) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <PageHeader title="Pricing" breadcrumbs={breadcrumbs} />

      <Container className="py-5">
        <h1 className="text-center mb-4">Pricing Plans</h1>
        <Pricing />
        <StepWise />
        <ComparePlans />
        <FaqSection />
      </Container>

      <Footer />
      <CustomCursor />
    </>
  );
};

export default PricingPage;
