"use client";

import { useState } from "react";
import { indiaPricingPlans, usPricingPlans } from "../../../data/pricing";
import SectionTitle from "../SectionTitle";
import Link from "next/link";
import Image from "next/image";
import { FaAnglesRight } from "react-icons/fa6";
import { PricingFormProvider, usePricingForm } from "../../features/PricingFormContext";



export const metadata = {
  title: "Tech Cloud ERP | Flexible Plans & Pricing Options",
  description: "Find the perfect Tech Cloud ERP pricing plan: tailored tiers, transparent costs, modular features & scalable support to match your business size and needs.",
  keywords: "what is business intelligence, business intelligence, top business intelligence software, ERP and Business Intelligence",
};


const PricingContent = ({ extraClassName = '' }) => {
  const [selectedCountry, setSelectedCountry] = useState("india");
  const { showPopup } = usePricingForm();
  const pricingPlans = selectedCountry === "india" ? indiaPricingPlans : usPricingPlans;

  // If the popup is showing, don't render the pricing content
  if (showPopup) {
    return null;
  }

  return (
    <section className={`ep-pricing-section pt-60 pb-60 ${extraClassName}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <SectionTitle
              subTitle="Pricing Plans"
              title="Choose the Perfect Plan for Your Business Needs"
              extraClass="text-center" />
          </div>
        </div>
        <div className="d-flex justify-content-center pt-30">
          <div className="toggle-switch">
            <span className="me-2">₹ INR</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={selectedCountry === "us"}
                onChange={(e) => setSelectedCountry(e.target.checked ? "us" : "india")} />
              <span className="slider round"></span>
            </label>
            <span className="ms-2">$ USD</span>
          </div>
        </div>

        <div className="row mt-4">
          {pricingPlans.map((plan) => (
            <div
              data-aos-duration="600"
              data-aos="fade-up"
              key={plan.id}
              className="col-lg-4 col-md-6 mx-auto mx-lg-0"
            >
              <div className="pricing-item rounded-30 d-flex flex-column" style={{ minHeight: '500px' }}>
                <div className="price-header d-flex justify-content-between align-items-center">
                  <div className="price-box">
                    <h5 className="title">{plan.title}</h5>
                    <h3 className="price">{plan.price}</h3>
                    <p className="price-desc mt-2">{plan.description}</p>
                  </div>
                </div>
                <ul className="list-unstyled mt-30 options flex-grow-1">
                  {plan.features.map((feature, i) => (
                    <li key={`${plan.id}-${i}`} className="d-flex">
                      <FaAnglesRight className="me-2 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className="theme-btn mt-30 w-100 theme-btn-border position-relative d-inline-flex justify-content-center align-items-center"
                >
                  Get Now
                  <span className="arrow">
                    <svg
                      width="7"
                      height="11"
                      viewBox="0 0 7 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.25 11C1.00391 11 0.785156 10.918 0.621094 10.7539C0.265625 10.4258 0.265625 9.85156 0.621094 9.52344L4.36719 5.75L0.621094 2.00391C0.265625 1.67578 0.265625 1.10156 0.621094 0.773437C0.949219 0.417969 1.52344 0.417969 1.85156 0.773437L6.22656 5.14844C6.58203 5.47656 6.58203 6.05078 6.22656 6.37891L1.85156 10.7539C1.6875 10.918 1.46875 11 1.25 11Z"
                        fill="#020842" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center mt-4" style={{ fontSize: '12px' }}>
       *Taxes (GST/VAT) may apply based on region
      </p>
    </section>
  );
};

const Pricing = (props) => {
  return (
    <PricingFormProvider>
      <PricingContent {...props} />
    </PricingFormProvider>
  );
};

export default Pricing;
