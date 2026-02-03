'use client';

import { useEffect, useState } from 'react';
import Header from "../../../components/layout/header/Header";
import PageHeader from "../../../components/layout/PageHeader";
import Footer from "../../../components/layout/footer/Footer";
import CustomCursor from "../../../components/layout/CustomCursor";
import { FaHome } from 'react-icons/fa';
import Image from 'next/image';
import cloudIcon from '../../../public/images/industry-icons/checkmark-icon.svg';
import DownloadWidget from './DownloadWidget';
import Link from 'next/link';
import InfoCards from '../../../components/containers/industries/InfoCards';
import IndustryDescription from '../../../components/containers/industries/IndustryDescription';
import IndustryBanner from '../../../components/containers/industries/IndustryBanner';
import FAQSection from '../../../components/containers/industries/FAQSection';
import IndustryInformation from '../../../components/containers/industries/IndustryInformation';

export default function IndustryPageClient({ industryData }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    // Initialize Bootstrap's JavaScript functionality
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const breadcrumbs = [
    { label: "Home", link: "/", icon: FaHome },
    { label: "All Industries", link: "/industries" },
    { label: industryData.heading, link: null },
  ];

  return (
    <>
      <Header />
      <PageHeader title={industryData.heading} breadcrumbs={breadcrumbs} />
      
      <section className="ep-project-details-section pt-60">
        <div className="container">
          <div className="row align-items-start g-4">
            {/* Left column */}
            <div className="col-lg-8">
              {/* Banner */}
              <IndustryBanner 
                banner={industryData.banner}
                title={industryData.title}
              />

              <div className="project-description">
                {/* Description */}
                <IndustryDescription 
                  title={industryData.title}
                  description={industryData.description}
                  keyPoints={industryData.keyPoints}
                />
              </div>

              {/* Info Cards */}
              <InfoCards infoCards={industryData.infoCards} />

              {/* FAQ Section */}
              <FAQSection faqData={industryData.faqData} />
            </div>

            {/* Right column */}
            <div className="col-lg-4">
              {/* Industry Information */}
              <IndustryInformation 
                industry={industryData.industry}
                solution={industryData.solution}
                modules={industryData.modules}
                result={industryData.result}
              />

              {/* Download Widget */}
              {industryData.downloadWidget && (
                <DownloadWidget
                  bgShape={industryData.downloadWidget.bgShape}
                  image={industryData.downloadWidget.image}
                  title={industryData.downloadWidget.title}
                  spanTitle={industryData.downloadWidget.spanTitle}
                  buttonText={industryData.downloadWidget.buttonText}
                />
              )}

              <div className="demo-banner-container mt-4 mb-5" style={{ display: 'none' }}>
                <style jsx>{`
                  @media (min-width: 769px) {
                    .demo-banner-container {
                      display: block !important;
                    }
                  }
                `}</style>
                <Link href="/demo" className="demo-banner-link">
                  <Image
                    src="/images/industry-icons/book-a-demo-img.webp"
                    alt="Book a personalized demo of our industry solutions"
                    width={1200}
                    height={300}
                    className="img-fluid"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </>
  );
} 