"use client";
import Image from "next/image";
import React, { useState } from "react";

const CategorySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const categories = [
    {
      title: "ERP",
      desc: "Integrates finance, HR and inventory into one system, automating processes and boosting efficiency for better decision-making.",
      color: "light_blue",
      icon: "/images/products/white/ERP_white.png",
      orangeicon: "/images/products/ERP.png",
    },
    {
      title: "CRM",
      desc: "Manages customer interactions and data, enhancing sales, service and relationships for stronger customer connections.",
      color: "blue",
      icon: "/images/products/white/CRM_white.png",
      orangeicon: "/images/products/CRM.png",
    },
    {
      title: "POS",
      desc: "Ensures secure sales transactions, integrates with inventory and customer data and provides real-time updates for efficiency.",
      color: "green",
      icon: "/images/products/white/POS_white.png",
      orangeicon: "/images/products/POS.png",
    },
    {
      title: "Trading Software",
      desc: "It helps optimize procurement, inventory and order management with real-time tracking, thus enhancing workflows automatically.",
      color: "gray",
      icon: "/images/products/white/Trading_white.png",
      orangeicon: "/images/products/Trading.png",
    },
    {
      title: "E - commerce",
      desc: "Online stores management with product catalogs, payment systems and real-time updates to improve customer experience.",
      color: "orange",
      icon: "/images/products/white/E_Commerce_white.png",
      orangeicon: "/images/products/E_Commerce.png",
    },
    {
      title: "HRM",
      desc: "It automates payroll, attendance, recruitment and performance management for an efficient workforce while keeping track of compliance.",
      color: "red",
      icon: "/images/products/white/HRM_white.png",
      orangeicon: "/images/products/HRM.png",
    },
    {
      title: "Finance & Accounting Software",
      desc: "Automates bookkeeping, invoicing, tax calculations and legal compliance, providing real-time financial insights and streamlined management.",
      color: "teal",
      icon: "/images/products/white/Finance_white.png",
      orangeicon: "/images/products/Finance.png",
    },
  ];
  

  return (
    <section className="tf__categories mt_95">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-8 col-lg-6 m-auto wow fadeInUp">
            <div className="tf__heading_area mb_15">
              <h2>Explore Our Business Solutions</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {categories.map((item, index) => (
            <div
              key={index}
              className="col-xl-4 col-md-6 wow fadeInUp"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`tf__single_category ${item.color}`}>
                <div className="tf__single_category_icon">
                  <Image
                    className="icon-default"
                    src={hoveredIndex === index ? item.orangeicon : item.icon}
                    alt={`${item.title} icon`}
                    width={40}
                    height={40}
                    style={{ width: "40px", height: "40px" }}
                    
                  />
                </div>

                <div className="tf__single_category_text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;