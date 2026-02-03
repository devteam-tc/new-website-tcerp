import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/layout/header/Header';
import PageHeader from '../../components/layout/PageHeader';
import { FaHome } from 'react-icons/fa';
import Integrations from "../../components/containers/locations/Integrations"
import Footer from '../../components/layout/footer/Footer';
import LocationsGrid from '../../components/containers/locations/LocationsGrid';
import Head from 'next/head';
import CustomCursor from '../../components/layout/CustomCursor';

export const metadata = {
  title: 'Explore Our Locations | Best ERP Software Provider Across the World',
  description: 'Explore Our Branches | Best ERP Software in India | Connect with Tech Cloud ERP Experts Across the World for Tailored Business Solutions',
  keywords: 'ERP Chennai, ERP Hyderabad, ERP Coimbatore, ERP software locations, Tech Cloud ERP',
  openGraph: {
    title: 'Tech Cloud ERP Locations | ERP Software in Chennai, Hyderabad, Coimbatore',
    description: 'Find Tech Cloud ERP software solutions in Chennai, Hyderabad, and Coimbatore. Discover how our ERP can transform your business operations in key Indian cities.',
    images: [
      {
        url: '/images/locations/og-locations.jpg',
        width: 1200,
        height: 630,
        alt: 'Tech Cloud ERP Locations',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Cloud ERP Locations | ERP Software in Chennai, Hyderabad, Coimbatore',
    description: 'Find Tech Cloud ERP software solutions in Chennai, Hyderabad, and Coimbatore. Discover how our ERP can transform your business operations in key Indian cities.',
    images: ['/images/locations/og-locations.jpg']
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where does Tech Cloud ERP provide ERP software solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tech Cloud ERP provides ERP software solutions in Chennai, Hyderabad, Coimbatore, and other major cities across India."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Tech Cloud ERP serve in these locations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve manufacturing, retail, distribution, and service industries with tailored ERP solutions in each location."
      }
    }
  ]
};

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
      "name": "Locations",
      "item": "https://techclouderp.com/locations/"
    }
  ]
};

export default function LocationsPage() {
  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'Locations', link: null }
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header/>
      <PageHeader title="Locations" breadcrumbs={breadcrumbs}/>
      <div className="locations-page">
        <Integrations/>
        <LocationsGrid/>
        <Footer/>
        <CustomCursor />
      </div>
    </main>
  );
}