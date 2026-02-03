"use client";
import Image from "next/image";
import SectionTitle from "../SectionTitle";

const features = [
  {
    icon: "/images/about-us/user-friendly.png",
    title: "User Friendly",
    alt: "UserFriendly icon"
  },
  {
    icon: "/images/about-us/web-technologies.png",
    title: "Web Technologies",
    alt: "WebTechnologies icon"
  },
  {
    icon: "/images/about-us/Customization.png",
    title: "Customisation",
    alt: "customisation icon"
  },
  {
    icon: "/images/about-us/Accessibility.png",
    title: "Accessibility",
    alt: "accessibility icon"
  },
  {
    icon: "/images/about-us/Amazing Support.png",
    title: "Amazing Support",
    alt: "Amazing Support icon"
  },
  {
    icon: "/images/about-us/versatility.png",
    title: "Versatility",
    alt: "Versatility icon"
  },
  {
    icon: "/images/about-us/Flexible Pricing.png",
    title: "Flexible Pricing",
    alt: "Flexible Pricing icon"
  },
  {
    icon: "/images/about-us/Mobile Versions.png",
    title: "Mobile Versions",
    alt: "Mobile Versions icon"
  },
  {
    icon: "/images/about-us/Cloud Servers.png",
    title: "Cloud Servers",
    alt: "Cloud Servers icon"
  },
  {
    icon: "/images/about-us/plugin marketplace.png",
    title: "Plugin Marketplace",
    alt: "Plugin Marketplace icon"
  },
  {
    icon: "/images/about-us/Secure & Reliable.png",
    title: "Secure & Reliable",
    alt: "Secure & Reliable icon"
  },
  {
    icon: "/images/about-us/speed.png",
    title: "Language Versatility",
    alt: "Language versatility icon"
  },
  
];

const UniqueFeatures = () => {
  return (
    <section className="quiety-features pb-60 pt-60">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
             <div className="text-center">
               <SectionTitle subTitle="Our Features" title="Essential Features Designed for Real Needs" extraClass="mb-30" />
             </div>
          </div>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-6">
              <div className="feature-card bg-white rounded-3 p-4 h-100">
                <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                  <div className="feature-icon flex-shrink-0 text-center">
                    <Image
                      src={feature.icon}
                      alt={feature.alt}
                      width={40}
                      height={40}
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="mb-0 text-center text-md-start">{feature.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniqueFeatures; 