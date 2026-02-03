import Header from "../../components/layout/header/Header";
import PageHeader from "../../components/layout/PageHeader";
import Footer from "../../components/layout/footer/Footer";
import CustomCursor from "../../components/layout/CustomCursor";
import ServiceCard from "../../components/containers/services/ServiceCard";
import DownloadSection from "../../components/containers/services/DownloadSection";
import Howitworks from "../../components/containers/services/Howitworks";
import { FaHome } from "react-icons/fa";

export const metadata = {
  title: "Reliable Business Services for Every Industry | Tech Cloud ERP",
  description:
    "Experience top-notch services designed to accelerate your business growth. Customized, efficient and results-driven solutions for every need.",
};

const Page = () => {
  const breadcrumbs = [
    { label: "Home", link: "/", icon: FaHome },
    { label: "All Services", link: null },
  ];

  /* =========================
     FAQ Schema
  ========================== */
  const faqSchema = {
   "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does TechCloud ERP offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TechCloud ERP offers a wide range of IT and digital services to your business including digital marketing, web development, ERP solutions, mobile app development, and cloud-based business solutions."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide digital marketing services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide complete digital marketing services such as SEO, PPC advertising, social media marketing, content marketing, email marketing, and local SEO solutions."
      }
    },
    {
      "@type": "Question",
      "name": "Are your services suitable for small and large businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our services are designed to support startups, small businesses, and large enterprises with scalable and customized solutions."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer customized IT solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We analyze your business requirements and provide customized IT and digital solutions tailored to your goals."
      }
    },
    {
      "@type": "Question",
      "name": "How can I get started with TechCloud ERP services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can get started by visiting our Services page and contacting us through the inquiry form or by calling our support team."
      }
    }
  ]
};

  /* =========================
     Breadcrumb Schema
  ========================== */
  const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://techclouderp.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://techclouderp.com/services/"
    }
  ]
};

  return (
    <>
      {/* ✅ Schemas injected before Header (SEO-safe) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <PageHeader title="Services" breadcrumbs={breadcrumbs} />
      <ServiceCard />
      <Howitworks />
      <DownloadSection />
      <Footer />
      <CustomCursor />
    </>
  );
};

export default Page;
