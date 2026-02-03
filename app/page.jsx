import Pricing from "../components/containers/home-two/Pricing";
import ServicesTwo from "../components/containers/home/ServicesTwo";
import Banner from "../components/containers/home/Banner";
import Counter from "../components/containers/home/Counter";
// import Features from "../components/containers/home/Features";
import Services from "../components/containers/home/Services";
import Testimonial from "../components/containers/home/Testimonial";
import CustomCursor from "../components/layout/CustomCursor";
import Footer from "../components/layout/footer/Footer";
import Header from "../components/layout/header/Header";
import CreativeSection from "../components/layout/footer/CreativeSection";
import WhatsappSection from "../components/containers/home/WhatsappSection";
import DownloadButtonSection from "../components/containers/home/DownloadButtonSection";
import { testimonials } from "../data/testmonial";

export default function Home() {
  const baseUrl = "https://www.techclouderp.com";
  const canonicalUrl = baseUrl + "/";

  const organizationSchema = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "Tech Cloud ERP Software Pvt Ltd",
    url: `${baseUrl}`,
    logo: `${baseUrl}/images/logo/logo.webp`,
    sameAs: [
      "https://www.facebook.com/TechCloudERPSoftwareSolutions",
      "https://twitter.com/techclouderp",
      "https://www.linkedin.com/company/13619340/",
    ],
     "description": "Tech Cloud ERP is a leading provider of cloud-based ERP software solutions in India. Streamline your business operations, boost productivity, and drive growth with our scalable, secure, and customizable ERP platform.",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91 8919439603",
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91 7032803200",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Telugu"],
        "areaServed": "IN",
      },
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress":
        "Plot No. 241, 4th Floor, VVG Elite Developers, Kavuri Hills, Phase - 2, Madhapur, Hyderabad, Telangana - 500081",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500081",
      "addressCountry": "IN",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "100",
      "bestRating": "5",
    },
  };

  const productSchema = {
    "@type": "Product",
    "@id": `${baseUrl}/#product`,
    "name": "Tech Cloud ERP Software",
    "description":
      "Tech Cloud ERP is an integrated cloud-based software suite for managing business operations, including accounting, inventory, HRMS and manufacturing.",
    "image": `${baseUrl}/logo.webp`,
    "brand": {
      "@type": "Brand",
      "name": "Tech Cloud ERP",
    },
    "manufacturer": {
      "@id": `${baseUrl}/#organization`,
    },
    "isRelatedTo": {
      "@id": `${baseUrl}/#software`,
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}`,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1506",
    },
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": `${baseUrl}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, productSchema, websiteSchema],
  };

 const schemaScript = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [organizationSchema, productSchema, websiteSchema]
  });

  return (
    <>
      <script
     
id="structured-data"
type="application/ld+json"
   dangerouslySetInnerHTML={{ __html: schemaScript }}    />

      <Header />
      <Banner />
      {/* <Features/> */}
      <Services />
      <Counter />
      <ServicesTwo />
      <Testimonial />
      <Pricing />
      <WhatsappSection />
      <DownloadButtonSection />
      <CreativeSection />
      <Footer />
      <CustomCursor />
    </>
  );
}
